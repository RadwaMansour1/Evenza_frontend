export interface Profile {
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