import { configs } from '../../configs/env.configs';

const cookieOptions = {
  // production_only
  // sameSite: 'none' as const,
  secure: configs.env === 'production',
  httpOnly: true,
};

export { cookieOptions };
