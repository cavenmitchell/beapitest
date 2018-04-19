const assert = require('assert');
const test = require('unit.js');
const should = require('should');

const users = require('../../api/controllers/users');

describe('CONTROLLER - USERS - HOOKS', function() {
  before('BEFORE', function() {
    // runs before all tests in this block
    console.log('Open DB Connetion and start tests Controller');
  });

  after('AFTER', function() {
    // runs after all tests in this block
    console.log('After All Controller');
  });

  beforeEach('BEFORE EACH', function() {
    // runs before each test in this block
    console.log('Before Each Controller');
  });

  afterEach('AFTER EACH', function() {
    // runs after each test in this block.
    console.log('After Each Controller');
  })

  describe('USERS BASE', function() {
    describe('GET - all users', function() {
      it('Should return a list of all users.', function() {
        // let test = users.get();
        let req = {
          params: {}
        };

        let res = {
          status: (status) => {
            assert.equal(200, status);
          },
          json: (user) => {
            assert.equal(user.length, 3);
          }
        };

        users.get(req, res);
      });
    });

    describe('GET - one user', function() {
      it('should return -1 when the value is not present', function() {
        assert.equal([1, 2, 3].indexOf(4), -1);
      });
    });

    describe('PUT - one user', function() {
      it('should return -1 when the value is not present', function() {
        assert.equal([1, 2, 3].indexOf(4), -1);
      });
    });

    describe('DELETE - one user', function() {
      it('should return -1 when the value is not present', function() {
        assert.equal([1, 2, 3].indexOf(4), -1);
      });
    });
  });
});
