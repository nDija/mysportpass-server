import mongoose from 'mongoose';

class UserSchema extends mongoose.Schema{
    constructor() {
        super({
            name: {
                type: String,
                required: true
            },
            firstName: {
                type: String
            },
            dateOfBirth: {
                type: Date
            },
            zipCode: {
                type: Number
            },
            email: {
                type: String,
                index: true,
                unique: true
            }})
    }}
class User extends mongoose.Model {}
export default mongoose.model(User, new UserSchema(), 'users');