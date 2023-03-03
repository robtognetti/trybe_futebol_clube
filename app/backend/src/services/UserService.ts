import * as bcrypt from 'bcryptjs';
import { ModelStatic } from 'sequelize';
import User from '../database/models/UserModel';
import ILogin from '../interfaces/ILogin';
import IToken from '../interfaces/IToken';
import Jwt from '../utils/token';

class UserService {
  protected model : ModelStatic<User> = User;

  public async login({ email, password }: ILogin): Promise<IToken | undefined> {
    const user = await this.model.findOne({ where: { email } });
    if (!user) return undefined;

    const pass = bcrypt.compareSync(password, user.password);
    if (!pass) return undefined;

    const token = Jwt.generateToken(email);
    return { token };
  }

  async getRole(email: string): Promise<string | undefined> {
    const user = await this.model.findOne({ where: { email } });
    if (!user) return undefined;

    return user.role;
  }
}

export default UserService;
