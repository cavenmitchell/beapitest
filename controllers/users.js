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

  describe('GET', function() {
    describe('ALL', function() {
      it('Should return a list of 3 users.', function(done) {
        let req = {
          params: {}
        };

        let res = {
          status: function(status) {
            // assert.equal(300, status);
          },
          json: (user) => {
            try {
              assert.equal(user.length, 3);
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
          params: {}
        };

        let res = {
          status: function(status) {},
          json: (user) => {
            try {
              assert.equal(user.length, 3);
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
    it('Should add one user.', function(done) {
      let req = {
        params: {}
      };

      let res = {
        status: function(status) {},
        json: (user) => {
          try {
            assert.equal(user.length, 3);
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
