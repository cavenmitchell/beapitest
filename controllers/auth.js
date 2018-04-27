'use strict';

const assert = require('assert');
const test = require('unit.js');
const crypto = require('crypto');
const argon2 = require('argon2');
const config = require('../../config'); // Require shared configuration variables, eg. Google  Project ID
const settings = config.get();
const auth = require('../../api/controllers/auth');
const users = require('../../api/controllers/users');

const options = settings.HASH_OPTIONS;

let id = null;
let password = '12345678';

describe('AUTH', function() {
  describe('SIGN UP', function() {
    it('should store hash and salt in database', function(done) {
      //switch beatemotoin to email
      let salt = `beatemotion${crypto.randomBytes(256).toString('hex')}`;

      // take a hashed password from the front, and rehash it before signing up a user.
      argon2.hash(`${salt}${password}`, options).then(function(hash) {
        let req = {
          body: {
            email: 'caven@gmail.com',
            salt: salt,
            password: hash,
          }
        };

        let res = {
          status: function(status) {
            assert.deepEqual('201', status);
          },
          json: function(user) {
            try {
              assert.ok(user._id);
              done();
            } catch(err) {
              done(err);
            }
          }
        };

        users.post(req, res, done);
      }).catch(function(err) {
        done(err);
      });
    });
  });

  describe('LOG IN', function() {
    it('should send a login request without error', function(done) {
      let req = {
        body: {
          email: 'caven@gmail.com',
        }
      };

      let res = {
        status: function(status) {
          assert.deepEqual('200', status);
        },
        json: function(user) {
          try {
            let salt = user.salt;
            let hash = user.password;

            // take a hashed password from the front, and rehash it before signing up a user.
            argon2.verify(hash, `${salt}${password}`).then(function(match) {
              assert.ok(match);
              done();
            }).catch(function(err) {
              done(err);
            });
          } catch(err) {
            done(err);
          }
        }
      };

      auth.post(req, res, done);
    });
  });
});
