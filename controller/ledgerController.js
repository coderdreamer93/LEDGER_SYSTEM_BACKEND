const Ledger = require("../models/ledgerModal");

// ✅ Add Ledger Entry
exports.addLedger = async (req, res) => {
    try {
        console.log("Incoming Data:", req.body);

        const { sales, purchase, chequeNumber, itemDescription, personName, amount, paymentType } = req.body;

        // ✅ Calculate updated purchase after sales deduction
        const updatedPurchase = Number(purchase) - Number(sales || 0);

        // ✅ Create a new ledger entry
        const newLedger = new Ledger({
            sales: Number(sales) || 0,
            purchase: updatedPurchase,
            chequeNumber,
            itemDescription,
            personName,
            amount,
            paymentType,
            userId: req.user.id
        });

        await newLedger.save();

       
        if (updatedPurchase <= 2) {
            return res.redirect(`/api/ledger/low-purchase/${req.user.id}`); // Redirect to the function
        }

        res.status(201).json({ message: "Ledger entry added successfully", ledger: newLedger });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ✅ Get All Ledgers
exports.getAllLedgers = async (req, res) => {
    try {
        const userId = req.user.id; // Extract userId from authenticated request

        if (!userId) {
            return res.status(400).json({ message: "User ID is required" });
        }

        const ledgers = await Ledger.find({ userId }); // Fetch only user's ledger entries
        res.json({ ledgers });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ✅ Update Sales & Automatically Subtract from Purchase
// exports.updateSales = async (req, res) => {
//     try {
//         const { sales } = req.body;
//         const ledger = await Ledger.findById(req.params.id);

//         if (!ledger) return res.status(404).json({ message: "Ledger not found" });

//         // ✅ Automatically update purchase (purchase - sales)
//         let newPurchase = ledger.purchase - (sales - ledger.sales);

//         if (newPurchase < 0) {
//             return res.status(400).json({ message: "Not enough stock in purchase to reduce sales" });
//         }

//         // ✅ Update sales & purchase
//         ledger.sales = sales;
//         ledger.purchase = newPurchase;

//         await ledger.save();

//         res.json({ message: "Sales updated successfully", ledger });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

// ✅ API: Get Ledgers where `totalAmount` <= 2
exports.getLowAmountLedgers = async (req, res) => {
    try {
        const ledgers = await Ledger.find({ totalAmount: { $lte: 2 } });
        res.json({ ledgers });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ✅ Get Ledger by ID
exports.getLedgerById = async (req, res) => {
    try {
        const ledger = await Ledger.findById(req.params.id);
        if (!ledger) return res.status(404).json({ message: "Ledger not found" });
        res.json(ledger);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ✅ Update Ledger
exports.updateLedger = async (req, res) => {
    try {
        const { sales, purchase, chequeNumber, itemDescription, personName, amount, paymentType } = req.body;

        const updatedPurchase = purchase - sales;

        const updatedLedger = await Ledger.findByIdAndUpdate(
            req.params.id,
            { sales, purchase: updatedPurchase, chequeNumber, itemDescription, personName, amount, paymentType },
            { new: true }
        );
        res.json(updatedLedger);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ✅ Delete Ledger
exports.deleteLedger = async (req, res) => {
    try {
        const ledger = await Ledger.findById(req.params.id);
        if (!ledger) return res.status(404).json({ message: "Ledger not found" });

        await Ledger.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Ledger deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// ✅ Get Ledger by ID Where Purchase ≤ 2
// exports.getLowPurchaseLedgersByUserId = async (req, res) => {
//     try {
//         const { userId } = req.params; // userId route parameters se lo

//         const ledgers = await Ledger.find({ userId: userId, purchase: { $lte: 2 } });

//         if (ledgers.length === 0) {
//             return res.status(404).json({ message: "No ledgers found or purchase is not less than 2" });
//         }

//         res.json({ ledgers });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };
exports.getLowPurchaseLedgersByUserId = async (req, res) => {
    try {
        const { userId } = req.params; // userId route parameters se lo

        // ✅ Find all ledgers where purchase is <= 2
        const ledgers = await Ledger.find({ userId: userId, purchase: { $lte: 2 } });

        if (ledgers.length === 0) {
            return res.status(404).json({ message: "No ledgers found or purchase is not less than 2" });
        }

        res.json({ ledgers });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
