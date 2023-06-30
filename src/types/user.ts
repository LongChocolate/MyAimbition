export interface IAuth {
    phone: string | undefined;
    name: string | undefined;
    email: string | undefined;
    gender: string | undefined;
    image: string | undefined;

    token?: string | undefined;
    login?: boolean;
}


