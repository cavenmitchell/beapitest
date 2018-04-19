const assert = require('assert');
const test = require('unit.js');
const should = require('should');
const mongoose = require('mongoose');
const Users = require('../../api/models/Users').Users;

let options = {
  dbName: 'test',
  autoReconnect: false,
  autoIndex: false
};

process.on('unhandledRejection', (reason, promise) => {
  console.log('Unhandled Rejection at:', reason.stack || reason);
  // Recommended: send the information to sentry.io
  // or whatever crash reporting service you use
});

mongoose.connect('mongodb://localhost:27017/test', options, function(error) {
  console.log('Connect Error: ', error);
});

const db = mongoose.connection;

db.on('error', err => {
  console.error(`Error while connecting to Test DB: ${err.message}`);
});

db.on('disconnected', () => {
  console.log('Test DB connection disconnected.');
});

db.once('open', () => {
  console.log('Test DB connected successfully!');
});

describe('hooks', function() {
  before('Setup', function() {
    // runs before all tests in this block
    console.log('Open DB Connetion and start tests');
  });

  after('Base after hook', function() {
    // runs after all tests in this block
    console.log('After All');
    db.dropDatabase(function(err, result) {
      if (err) console.log('err: ', err);
      if (result) console.log('result: ', result);
      db.close();
    });

  });

  beforeEach(function() {
    // runs before each test in this block
    console.log('Before Each');
  });

  afterEach('After clean up', function() {
    // runs after each test in this block.
    console.log('After Each');
  })

  describe('Array', function() {
    describe('#indexOf()', function() {
      it('should return -1 when the value is not present', function() {
        assert.equal([1, 2, 3].indexOf(4), -1);
      });
    });
  });

  describe('User', function() {
    describe('#save()', function() {
      // this.timeout(5000);

      it('should save without error', function(done) {
        let user1 = new Users({
          'email': 'cavenC',
          'password': '12345678'
        });

        let user2 = new Users({
          'email': 'cavenC',
          'password': '12345678'
        });

        let user3 = new Users({
          'email': 'cavenCadsfadf',
          'password': '12345678'
        });

        user1.save();
        user2.save();
        user3.save(done);
      });
    });

    describe('#find()', function() {
      it('Responds with matching records', function(done) {
        Users.find({}, function(err, res) {
          if (err) return done(err);
          res.should.have.length(3);
          done();
        }).should.eventually.have.length(3);
      });
    });

  });
});
