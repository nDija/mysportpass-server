import mongoose from "mongoose";

class CoachSchema extends mongoose.Schema{
    constructor() {
        super({
            email: {
                type: String,
                required: true,
                index: true,
                unique: true
            },
            name: {
                type: String
            }
        })
    }}
class Coach extends mongoose.Model {}
export default mongoose.model(Coach, new CoachSchema(), 'coaches');
