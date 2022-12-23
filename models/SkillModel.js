import mongoose from "mongoose";

const SkillSchema = mongoose.Schema({
    userEmail: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true,
    },
    percentage: {
        type: Number,
        required: true,
    },

}, {
    versionKey: false,
    timestamps: true
})

const SkillModel = mongoose.model('Skill', SkillSchema)

export default SkillModel