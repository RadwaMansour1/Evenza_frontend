// export interface Profile {
//     profileImage?: File;
//     firstName: string;
//     lastName: string;
//     phone1: string;
//     phone2?: string;
//     gender: string;
//     country: string;
//     address: string;
//     city: string;
//     state?: string;
//     zipCode?: string;
//     dateOfBirth: string;
//     role: string;
// }
export interface Profile {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone1: string;
  phone2?: string;
  gender: string;
  country: string;
  streetAddress: string;
  city: string;
  state: string;
  zipCode?: string;
  provider?: string;
  isVerified?: boolean;
  createdAt?: string;
  verificationCode?: string;
  verificationCodeExpiration?: string;
  role?: string;
  profileImage?: string;
  __v?: number;
  postalCode?:string;
}

export interface ProfileResponse {
  timestamp: string;
  data: Profile;
}



