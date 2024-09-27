import { randomBytes } from 'crypto';

type UserCredentials = {
  name: string;
  password: string;
}

const generateRandomCredentials = (): UserCredentials => {
  const randomString = randomBytes(8).toString('hex');
  const timestamp = Date.now();
  return {
    name: `user_${randomString}_${timestamp}`,
    password: `pass_${randomString}`,
  };
};

export const config = {
  baseUrl: 'https://www.demoblaze.com',
  existingUser: {
    name: 'giuliano18',
    password: 'giuliano2024',
  },
  getNewUser: generateRandomCredentials,
};