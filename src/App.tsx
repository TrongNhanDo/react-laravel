import { useCallback, useEffect, useState } from 'react';
import './App.css';
import { callApi } from './api/callApi';

type UserProps = {
    id: number;
    email: string;
    name: string;
    phone?: string;
    address?: string;
    email_verified_at?: string;
    created_at: string;
    updated_at: string;
};

type ResponseProps = {
    returnCnt: string;
    users: UserProps[];
    bizResult: string;
};

function App() {
    const [users, setUsers] = useState<UserProps[]>([]);

    const fetchApi = useCallback(async () => {
        const response: ResponseProps = await callApi
            .get('/users/')
            .then((res) => {
                console.log(res);
                return res.data;
            });

        if (response.bizResult === '0') {
            setUsers(response.users);
        }
    }, []);

    useEffect(() => {
        fetchApi();
    }, [fetchApi]);

    return (
        <>
            {users.map((value: UserProps, index: number) => {
                return (
                    <div key={index}>
                        <ul>
                            <li>{value.id}</li>
                            <li>{value.email}</li>
                            <li>{value.name}</li>
                            <li>{value.phone}</li>
                            <li>{value.address}</li>
                            <li>{value.created_at}</li>
                            <li>{value.updated_at}</li>
                        </ul>
                    </div>
                );
            })}
        </>
    );
}

export default App;
