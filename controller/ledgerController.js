const Ledger = require("../models/ledgerModal");

// ✅ Add Ledger Entry
exports.addLedger = async (req, res) => {
    try {
        const { modelName, quantity, sales, purchase, paymentType } = req.body;
        const newLedger = new Ledger({ modelName, quantity, sales, purchase, paymentType, userId: req.user.id });
        await newLedger.save();
        res.status(201).json({ message: "Ledger entry added successfully", ledger: newLedger });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ✅ Get All Ledgers
exports.getAllLedgers = async (req, res) => {
    try {
        const ledgers = await Ledger.find();
        res.json(ledgers);
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
        const { modelName, quantity, sales, purchase, paymentType } = req.body;
        const updatedLedger = await Ledger.findByIdAndUpdate(
            req.params.id,
            { modelName, quantity, sales, purchase, paymentType },
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
