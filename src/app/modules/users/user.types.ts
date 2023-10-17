// import { UserRole } from '@prisma/client';

import { User } from '@prisma/client';

// export type TEmailLogin = {
//   email: string;
//   password: string;
// };
// export type TAccessToken = {
//   accessToken: string;
// };

export type TUserUpdate = User & {
  profileImg?: string;
  address?: string;
  contactNo?: string;
};

type TPermission = 'all' | 'content_manager' | 'user_manager' | 'service_manager';

type TManager = Exclude<TPermission, 'all'>;

type TManagerPermissions = {
  adminPermissions: TManager[];
};

type TAdminAll = {
  adminPermissions: ['all'];
};

type TAdminPermissions = TManagerPermissions | TAdminAll;

export type TMakeAdmin = User & {
  email: string;
  adminPermissions: TAdminPermissions;
};
