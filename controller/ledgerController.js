const Ledger = require("../models/ledgerModal");

// ✅ Add Ledger (Auto-generates itemCode)
exports.addLedger = async (req, res) => {
    try {
        const { modelName, quantity, sales, purchase, paymentType } = req.body;

        const newLedger = new Ledger({
            modelName,
            quantity,
            sales,
            purchase,
            paymentType,
            userId: req.user.userId, // Associate ledger with logged-in user
        });

        await newLedger.save();
        res.status(201).json({ message: "Ledger Added", ledger: newLedger });
    } catch (error) {
        res.status(500).json({ message: "Error adding ledger", error: error.message });
    }
};

// ✅ Fetch Ledgers (Logged-in User)
exports.getLedger = async (req, res) => {
    try {
        const ledgers = await Ledger.find({ userId: req.user.userId }).populate("userId", "name email");
        res.status(200).json(ledgers);
    } catch (error) {
        res.status(500).json({ message: "Error fetching ledgers", error: error.message });
    }
};

// ✅ Get Single Ledger by ID
exports.getLedgerById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id.match(/^[0-9a-fA-F]{24}$/)) return res.status(400).json({ error: "Invalid Ledger ID format" });

        const ledger = await Ledger.findById(id).populate("userId", "name email");
        if (!ledger) return res.status(404).json({ error: "Ledger not found" });

        res.status(200).json(ledger);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// ✅ Update Ledger (Only Owner Can Update, Prevents itemCode Update)
exports.updateLedger = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id.match(/^[0-9a-fA-F]{24}$/)) return res.status(400).json({ error: "Invalid Ledger ID format" });

        const ledger = await Ledger.findById(id);
        if (!ledger) return res.status(404).json({ error: "Ledger not found" });

        if (ledger.userId.toString() !== req.user.userId) return res.status(403).json({ error: "Unauthorized" });

        const { itemCode, ...updateData } = req.body; // Prevent itemCode update
        const updatedLedger = await Ledger.findByIdAndUpdate(id, updateData, { new: true });

        res.status(200).json({ message: "Ledger Updated Successfully", updatedLedger });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// ✅ Delete Ledger (Only Owner Can Delete)
exports.deleteLedger = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id.match(/^[0-9a-fA-F]{24}$/)) return res.status(400).json({ error: "Invalid Ledger ID format" });

        const ledger = await Ledger.findById(id);
        if (!ledger) return res.status(404).json({ error: "Ledger not found" });

        if (ledger.userId.toString() !== req.user.userId) return res.status(403).json({ error: "Unauthorized" });

        await Ledger.findByIdAndDelete(id);
        res.status(200).json({ message: "Ledger deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
