const mongoose = require('mongoose');
const { Schema } = mongoose;

const overlaySchema = new Schema({
    position: {
        x: {
            type: Number,
            required: true,
        },
        y: {
            type: Number,
            required: true,
        },
    },
    size: {
        width: {
            type: Number,
            required: true,
        },
        height: {
            type: Number,
            required: true,
        },
    },
    content: {
        type: Schema.Types.Mixed,
        required: true,
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model('Overlay', overlaySchema);
