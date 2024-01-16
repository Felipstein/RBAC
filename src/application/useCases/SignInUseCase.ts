import { compare } from 'bcryptjs';
import { prismaClient } from '../libs/prismaClient';
import { InvalidCredentials } from '../errors/InvalidCredentials';
import { sign } from 'jsonwebtoken';
import { env } from '../config/env';

interface IInput {
  email: string
  password: string
}

interface IOutput {
  accessToken: string
}

export class SignInUseCase {

  async execute({ email, password }: IInput): Promise<IOutput> {
    const account = await prismaClient.account.findUnique({
      where: { email },
      select: { id: true, password: true, role: true }
    });

    if(!account) {
      throw new InvalidCredentials();
    }

    const isPasswordValid = await compare(password, account.password);

    if(!isPasswordValid) {
      throw new InvalidCredentials();
    }

    const accessToken = sign(
      {
        sub: account.id,
        role: account.role,
      },
      env.jwtSecret,
      { expiresIn: '1d' },
    );

    return { accessToken };
  }

}
