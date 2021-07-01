type Account = {
  name: string;
  lastName: string;
  email: string;
  avatarPath: string;
  rolesId: [];
  createdAt: Date;
  modifiedAt: Date;
  id?: number;
  date?:string
};

export default Account;