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
  provider: string;
  isVerified: boolean;
  createdAt: string;
  verificationCode: string;
  verificationCodeExpiration: string;
  role: string;
  imageURL?: string;
  __v?: number;
}

export interface ProfileResponse {
  timestamp: string;
  data: Profile;
}



    profileImage?: File;
    firstName: string;
    lastName: string;
    phone1: string;
    phone2?: string;
    email?: string;
    gender: string;
    country: string;
    address: string;
    city: string;
    state?: string;
    zipCode?: string;
}