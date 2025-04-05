const mongoose = require("mongoose");

const ledgerSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    itemCode: { type: Number, unique: true }, // Auto-generated
    chequeNumber: { type: Number, unique: true },
    itemDescription:{ type: String, required: true },
    personName: { type: String, required: true },
    amount:{ type: Number, required: true },
    // modelName: { type: String, required: true },
    // quantity: { type: Number, required: true },
    sales: { type: Number, required: true },
    purchase: { type: Number, required: true },
    paymentType: { type: String, required: true },
    // userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
}, { timestamps: true });

// Auto-generate sequential itemCode
ledgerSchema.pre("save", async function (next) {
    if (!this.itemCode) {
        const lastLedger = await this.constructor.findOne().sort({ itemCode: -1 });
        this.itemCode = lastLedger ? lastLedger.itemCode + 1 : 100001;
    }
    next();
});

module.exports = mongoose.model("Ledger", ledgerSchema);
