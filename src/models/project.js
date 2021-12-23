const mongoose = require("mongoose");

const projectSchema = mongoose.Schema(
    {
        name1: {
            type: String,
            required: 'Name 1 is required'
        },
        name2: {
            type: String,
            required: 'Name 2 is required'
        },
        description: {
            type: String,
            required: 'Description is required'
        },
        supervisor: {
            type: mongoose.Types.ObjectId,
            ref: 'Users',
            required: 'Supervisor is required'
        },
        status: {
            type: String,
            enum: ['active', 'finished'],
            default: 'active'
        },
        showed: {
            type: Boolean,
            default: false,
        },
        mainTask: {
            type: Boolean,
            default: false,
        },
        deleted: {
            type: Boolean,
            default: false
        },
        tasks: {
            type: [
                {
                    task: { type: String },
                    checked: { type: Boolean, default: false },
                    _id: false
                }
            ]
        }
    }
)

module.exports = mongoose.model("Projects", projectSchema);