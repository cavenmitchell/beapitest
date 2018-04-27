const assert = require('assert');
const test = require('unit.js');
const should = require('should');

const users = require('../../api/controllers/users');

describe('CONTROLLER: USERS', function() {
  before('BEFORE', function() {
    // runs before all tests in this block
  });

  after('AFTER', function() {
    // runs after all tests in this block
  });

  beforeEach('BEFORE EACH', function() {
    // runs before each test in this block
  });

  afterEach('AFTER EACH', function() {
    // runs after each test in this block.
  })

  let id = null;

  describe('POST', function() {
    it('should sign up a new user without error', function(done) {
      let req = {
        body: {
          email: 'caven',
          password: '12345678',
          salt: '12345678',
        }
      };

      let res = {
        status: function(status) {
          // console.log(`Status: ${status}`);
        },
        json: function(user) {
          try {
            id = user._id;
            done();
          }
          catch(error) {
            done(error);
          }
        }
      };

      users.post(req, res, done);
    });
  });

  describe('GET', function() {
    describe('ALL', function() {
      it('Should return a list of 5 users.', function(done) {
        let req = {
          params: {}
        };

        let res = {
          status: function(status) {
            // assert.equal(300, status);
          },
          json: (user) => {
            try {
              assert.equal(user.length, 5);
              done();
            }
            catch(error) {
              done(error);
            }
          }
        };

        users.get(req, res, done);
      });
    });

    describe('ONE', function() {
      it('Should return a specific user.', function(done) {
        let req = {
          params: {
            _id: id,
          }
        };

        let res = {
          status: function(status) {},
          json: function(user) {
            try {
              assert.deepEqual(user._id, req.params._id);
              done();
            }
            catch(error) {
              done(error);
            }
          }
        };

        users.get(req, res, done);
      });
    });
  });

  describe('PUT', function() {
    it('Should update one user.', function(done) {
      let req = {
        params: {
          _id: id,
        },
        body: {
          name: 'Caven',
          email: 'cavennew@gmail.com',
        },
        options: {
          new: true,
        }
      };
      let res = {
        status: function(status) {},
        json: (user) => {
          try {
            assert.deepEqual(user.email, req.body.email);
            done();
          }
          catch(error) {
            done(error);
          }
        }
      };

      users.put(req, res, done);
    });
  });
});
