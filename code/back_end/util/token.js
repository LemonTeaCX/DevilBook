const jwt = require('jsonwebtoken');

const TOKEN_KEY = 'token_key';
const NO_TOKEN_URL = [
  '/',
  '/index',
  '/api/login',
  '/api/register'
];
class Token {
  constructor(options) {}

  signToken(content, key = TOKEN_KEY, timeout = 60*60*3) {
    return jwt.sign(content, key, {
      expiresIn: timeout
    });
  }

  verifyToken(token, key = TOKEN_KEY) {
    try {
      return Object.assign({result: true}, jwt.verify(token, key));
    } catch(err) {
      return Object.assign({result: false}, err);
    }
  }

  needToken(url) {
    return NO_TOKEN_URL.indexOf(url) === -1;
  }
}

let token = new Token();
module.exports = token;
