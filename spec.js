var request = require('supertest');
var users = require('./data/test/users.json');
describe('loading express', function () {
    var app;
    beforeEach(function () {
        app = require('./app');
        server = app.listen(8080, () => {
            //console.log('JSON Server is running');
            /*db.dropCollection('users');
            db.collection('users').insertMany(users, (err, result) => {
                if (err) return console.log(err);

                console.log('saved to database: ' + result);
            });*/
        });

    });
    afterEach(function () {
        server.close();
    });
    it('responds to /', function testSlash(done) {
        request(app)
            .get('/')
            .expect(200, done);
    });
    it('responds to /users', function testSlash(done) {
        request(app)
            .get('/users')
            .expect(200, done);
    });
    it('404 everything else', function testPath(done) {
        request(app)
            .get('/foo/bar')
            .expect(404, done);
    });
});