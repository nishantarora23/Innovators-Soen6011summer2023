export type User = {
  fullName: string;
  email: string;
  password: string;
  userRole: RoleType;
  dob: string;
  cName: string;
  username: string;
  collegeName: string;
};

export enum RoleType {
  STUDENT = 'Student',
  EMPLOYER = 'Employer',
  ADMIN = 'Admin'
}

export type Auth = {
  email: string;
  password: string;
};


