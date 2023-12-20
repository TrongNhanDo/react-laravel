export type UserProps = {
    id: number;
    email: string;
    name: string;
    phone?: string;
    address?: string;
    email_verified_at?: string;
    created_at: string;
    updated_at: string;
};

export type ResponseProps = {
    returnCnt: string;
    users: UserProps[];
    errors: never[];
    bizResult: string;
};

export type PusherProps = {
    users: UserProps[];
};

export type FormikProps = {
    email: string;
    name: string;
    password: string;
    phone: string;
    address: string;
};

export const initFormikValues = {
    email: '',
    name: '',
    password: '',
    phone: '',
    address: '',
};
