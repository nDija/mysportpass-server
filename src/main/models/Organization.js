import mongoose from "mongoose";

class OrganizationSchema extends mongoose.Schema{
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
	}}
class Organization extends mongoose.Model {}
export default mongoose.model(Organization, new OrganizationSchema(), 'organizations');
