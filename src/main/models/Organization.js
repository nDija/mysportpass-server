import mongoose from 'mongoose';
let Schema   = mongoose.Schema;

let OrganizationSchema = new Schema({
	'name' : String
});

export default mongoose.model('Organization', OrganizationSchema);
