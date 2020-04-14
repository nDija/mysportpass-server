import Subscription from '../Subscription';

class SubscriptionRepository {

    constructor(model) {
        this.model = model;
    }

    create(ubscription) {
        return this.model.create(ubscription);
    }

    find() {
        return this.model.find();
    }
}

export default new SubscriptionRepository(Subscription);