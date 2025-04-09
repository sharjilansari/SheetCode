import mongoose, {Schema} from "mongoose"

const statusSchema = new Schema({
    status: {
        type: String
    }
});

export const Status = mongoose.model("Status", statusSchema);