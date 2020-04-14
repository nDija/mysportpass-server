import Organization from '../Organization';

class OrganizationRepository {

    constructor(model) {
        this.model = model;
    }

    create(organization) {
        return this.model.create(organization);
    }

    find() {
        return this.model.find();
    }
}

export default new OrganizationRepository(Organization);