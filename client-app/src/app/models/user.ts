export interface User{
    username: string;
    dispplayName: string;
    token: string;
    image?: string;
}

export interface UserFormValues{
    email: string;
    password: string;
    displayName?: string;
    username?: string;
}