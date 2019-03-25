const jwt = require('jsonwebtoken');

const TOKEN_KEY = 'token_key';
// 添加不需要验证的接口地址
const NO_TOKEN_URL = [
  '/',
  '/favicon.ico',
  '/index',
  '/api/login',
  '/api/register',
  '/api/getDescText'
];
class Token {
  constructor(options) {}

  // 生成token
  signToken(content, key = TOKEN_KEY, timeout = 60*60*3) {
    return jwt.sign(content, key, {
      expiresIn: timeout
    });
  }

  // 验证token
  verifyToken(token, key = TOKEN_KEY) {
    try {
      return Object.assign({result: true}, jwt.verify(token, key));
    } catch(err) {
      return Object.assign({result: false}, err);
    }
  }

  // 验证接口是否需要token
  needToken(url) {
    return NO_TOKEN_URL.indexOf(url) === -1;
  }
}

let token = new Token();
module.exports = token;
