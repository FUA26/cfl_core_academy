import * as bcrypt from 'bcryptjs';

const hash = (password: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const saltRounds = 10;
    bcrypt.hash(password, saltRounds, (err, hash) => {
      if (err) {
        reject(err);
      } else {
        resolve(hash);
      }
    });
  });
};

const verify = (password: string, hash: string): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, hash, (err, result) => {
      if (err) {
        console.error('Verification error:', err);
        reject(err);
      } else {
        console.log('Verification result:', result);
        resolve(result);
      }
    });
  });
};

export const AuthHelpers = {
  hash,
  verify,
};
