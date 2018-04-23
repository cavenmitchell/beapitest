const assert = require('assert');
const test = require('unit.js');
const should = require('should');
const mongoose = require('mongoose');
const Users = require('../../api/models/users');

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
  if (error) {
    console.log('Connect Error: ', error);
  }
});

const db = mongoose.connection;

db.on('error', err => {
  console.error(`Error while connecting to Test DB: ${err.message}`);
});

db.on('disconnected', () => {
  console.log('Test DB connection disconnected.');
});

describe('MODELS: USERS', function() {
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

  describe('SAVE', function() {
    // this.timeout(5000);

    it('should save without error', function(done) {
      db.dropDatabase(function(err, result) {
        if (err) console.log(`Drop Database Error: ${err}`);
        // db.close();
      });

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

  describe('FIND', function() {
    it('Responds with matching records', function(done) {
      Users.find({}, function(err, res) {
        if (err) return done(err);
        res.should.have.length(3);
        done();
      }).should.eventually.have.length(3);
    });
  });
});
