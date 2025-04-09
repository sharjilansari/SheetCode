import mongoose, {Schema} from "mongoose"

const languageSchema = new Schema({
    languageId: {
        type: Number,
    },
    languageName: {
        name: String
    }
});

export const Languages = mongoose.model("Languages", languageSchema);