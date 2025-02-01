export interface UserAttributes {
    Id: number;
    Name: string;
    Email: string;
    Password: string;
    PhotoUrl?: string;
    Gender?: 'Male' | 'Female';
    followers?: number;
}