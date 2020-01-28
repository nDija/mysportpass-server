const { MongoClient } = require('mongodb');
let _envFile = require('../environments.json');
let _env = eval('_envFile.' + process.env.NODE_ENV);
const url = 'mongodb://' + _env.dburl + ':' + _env.dbport + '/' + _env.db;

console.log('mongo url: ' + url);

class Mongo {

    constructor () {
        this.client = new MongoClient(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        this.client.connect();
        this.db = this.client.db();
        console.log('connected to mongo')
    }

    getDb () {
        return this.db;
    }
}

module.exports = new Mongo();
