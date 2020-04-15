import mongoose from "mongoose";

class CourseSchema extends mongoose.Schema{
    constructor() {
        super({
            name: {
                type: String,
                required: true,
                index: true,
                unique: true
            },
            zipCode: {
                type: Number
            }
        })
    }
}
class Course extends mongoose.Model {}
export default mongoose.model(Course, new CourseSchema(), 'courses');