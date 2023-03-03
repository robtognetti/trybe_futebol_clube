import * as jwt from 'jsonwebtoken';
import process = require('process');

export default class Jwt {
  static generateToken(email :string) {
    return jwt.sign({ email }, `${process.env.JWT_SECRET}`);
  }

  static verifyToken(token: string) {
    return jwt.verify(token, `${process.env.JWT_SECRET}`);
  }
}
