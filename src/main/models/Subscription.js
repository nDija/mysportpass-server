import mongoose from "mongoose";

class SubscriptionSchema extends mongoose.Schema{
    constructor() {
        super({
            name: {
                type: String
            }
        })
    }
}
class Subscription extends mongoose.Model {}
export default mongoose.model(Subscription, new SubscriptionSchema(), 'subscriptions');
