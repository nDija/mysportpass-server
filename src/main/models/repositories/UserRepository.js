import User from '../User';

class UserRepository {

    constructor(model) {
        this.model = model;
    }

    create(user) {
        return this.model.create(user);
    }

    findOneAndUpdate(user) {
        return this.model.findOneAndUpdate(
            {email: user.email},
            user,
            {new: true}
            );
    }

    findByEmail(email) {
        return this.model.findOne({"email": email});
    }

    findAll() {
        return this.model.find();
    }
}

export default new UserRepository(User);