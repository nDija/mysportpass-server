import Coach from '../Coach';

class CoachRepository {

    constructor(model) {
        this.model = model;
    }

    create(coach) {
        return this.model.create(coach);
    }

    find() {
        return this.model.find();
    }
}

export default new CoachRepository(Coach);