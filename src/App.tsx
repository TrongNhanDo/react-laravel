import { useCallback, useEffect, useState } from 'react';
import Pusher from 'pusher-js';
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

type PusherProps = {
    users: UserProps[];
};

function App() {
    const [users, setUsers] = useState<UserProps[]>([]);
    const [userDetail, setUserDetail] = useState<UserProps>();

    const fetchApi = useCallback(async () => {
        const response: ResponseProps = await callApi
            .get('/users/')
            .then((res) => {
                return res.data;
            });

        if (response.bizResult === '0') {
            setUsers(response.users);
        }
    }, []);

    useEffect(() => {
        fetchApi();
    }, [fetchApi]);

    useEffect(() => {
        const pusherAppKey = import.meta.env.VITE_PUSHER_APP_KEY || '';
        const pusherAppCluster = import.meta.env.VITE_PUSHER_APP_CLUSTER || '';
        if (pusherAppKey && pusherAppCluster) {
            const pusher = new Pusher(pusherAppKey, {
                cluster: pusherAppCluster,
            });
            const channel = pusher.subscribe('my-channel');
            channel.bind('my-event', (responsePusher: PusherProps) => {
                setUsers(responsePusher.users);
            });
        }
    }, []);

    const handleDelete = useCallback(async (id: number) => {
        try {
            if (confirm('Do you really want to delete this user?')) {
                const response: ResponseProps = await callApi
                    .delete('/users/', {
                        data: { id },
                    })
                    .then((res) => {
                        return res.data;
                    });

                if (response.bizResult === '0') {
                    alert('Delete successfully');
                } else {
                    alert('Delete fail');
                }
            }
        } catch (error) {
            console.log({ error });
        }
    }, []);

    const handleDetail = useCallback((value: UserProps) => {
        try {
            setUserDetail(value);
        } catch (error) {
            console.log({ error });
        }
    }, []);

    console.log(userDetail);

    return (
        <div className="container">
            <div className="header">LIST OF USERS</div>
            <table id="customers">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Email</th>
                        <th>Display name</th>
                        <th>Phone</th>
                        <th>Address</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((value: UserProps, index: number) => {
                        return (
                            <tr key={index}>
                                <td className="txt-center">{index + 1}</td>
                                <td>{value.email}</td>
                                <td>{value.name}</td>
                                <td>{value.phone}</td>
                                <td>{value.address}</td>
                                <td className="td-button">
                                    <button
                                        className="btn-detail"
                                        onClick={() => handleDetail(value)}
                                    >
                                        Detail
                                    </button>
                                    <button
                                        className="btn-delete"
                                        onClick={() => handleDelete(value.id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default App;
