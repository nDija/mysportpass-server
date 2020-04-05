const User = require('../User.js');

class UserRepository {

    constructor(model) {
        this.model = model.User;
    }

    create(object) {
        return this.model.create(object);
    }

    findByEmail(email) {
        return this.model.findOne({"email": email});
    }

    findAll() {
        return this.model.find();
    }
}

module.exports = new UserRepository(User);