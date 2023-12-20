import Pusher from 'pusher-js';
import { useFormik } from 'formik';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useCallback, useEffect, useState } from 'react';
import './App.css';
import { callApi } from './api/callApi';
import {
    FormikProps,
    PusherProps,
    ResponseProps,
    UserProps,
    initFormikValues,
} from './components/user/types';
import { validationSchema } from './components/user/validations';
import { showToast } from './components/common/utils';
import { ToastTypeOptions } from './components/common/types';

function App() {
    const [users, setUsers] = useState<UserProps[]>([]);
    const [userDetail, setUserDetail] = useState<UserProps>();
    const [errors, setErrors] = useState([]);

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
                    .then((res) => res.data);

                if (response.bizResult === '0') {
                    showToast(
                        'Delete user successfully',
                        ToastTypeOptions.Info
                    );
                } else {
                    showToast('Delete user fail', ToastTypeOptions.Error);
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

    const onSubmitForm = useCallback(async (value: FormikProps) => {
        try {
            const response: ResponseProps = await callApi
                .post('/users/', { ...value })
                .then((res) => res.data);
            if (response.bizResult === '0') {
                setErrors([]);
                showToast('Add user successfully', ToastTypeOptions.Success);
            } else {
                setErrors(Object.values(response.errors));
                showToast('Add user fail', ToastTypeOptions.Error);
            }
        } catch (error) {
            console.log({ error });
        }
    }, []);

    const formikBag = useFormik({
        initialValues: initFormikValues,
        validationSchema,
        onSubmit: onSubmitForm,
    });

    const handleSubmit = useCallback(() => {
        try {
            formikBag.submitForm();
        } catch (error) {
            console.log({ error });
        }
    }, [formikBag]);

    useEffect(() => {
        if (errors.length === 0) {
            formikBag.resetForm();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [errors]);

    console.log({ formikBag: formikBag.values });

    return (
        <div className="container">
            <ToastContainer />
            <div className="header">LIST OF USERS</div>
            {errors && errors.length ? (
                <ul className="div-err">
                    {errors.map((value: any, index) => {
                        return <li key={index}>{value[0] || value.message}</li>;
                    })}
                </ul>
            ) : (
                <></>
            )}
            <div id="fm-add">
                <div className="div-row">
                    <div>
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            className={`${
                                formikBag.errors.email &&
                                formikBag.touched.email
                                    ? 'input-error'
                                    : ''
                            }`}
                            placeholder="nguyenvana@gmail.com"
                            value={formikBag.values.email}
                            onChange={formikBag.handleChange}
                        />
                        {formikBag.errors.email && formikBag.touched.email && (
                            <div className="div-error">
                                {formikBag.errors.email}
                            </div>
                        )}
                    </div>
                    <div>
                        <label htmlFor="name">Name:</label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            className={`${
                                formikBag.errors.name && formikBag.touched.name
                                    ? 'input-error'
                                    : ''
                            }`}
                            placeholder="Nguyen Van A"
                            value={formikBag.values.name}
                            onChange={formikBag.handleChange}
                        />
                        {formikBag.errors.name && formikBag.touched.name && (
                            <div className="div-error">
                                {formikBag.errors.name}
                            </div>
                        )}
                    </div>
                </div>
                <div className="div-row">
                    <div>
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            className={`${
                                formikBag.errors.password &&
                                formikBag.touched.password
                                    ? 'input-error'
                                    : ''
                            }`}
                            value={formikBag.values.password}
                            onChange={formikBag.handleChange}
                        />
                        {formikBag.errors.password &&
                            formikBag.touched.password && (
                                <div className="div-error">
                                    {formikBag.errors.password}
                                </div>
                            )}
                    </div>
                    <div>
                        <label htmlFor="phone">Phone:</label>
                        <input
                            type="text"
                            name="phone"
                            id="phone"
                            className={`${
                                formikBag.errors.phone &&
                                formikBag.touched.phone
                                    ? 'input-error'
                                    : ''
                            }`}
                            placeholder="0123456789"
                            value={formikBag.values.phone}
                            onChange={formikBag.handleChange}
                        />
                        {formikBag.errors.phone && formikBag.touched.phone && (
                            <div className="div-error">
                                {formikBag.errors.phone}
                            </div>
                        )}
                    </div>
                </div>
                <div className="div-row">
                    <div>
                        <label htmlFor="address">Address:</label>
                        <input
                            type="text"
                            name="address"
                            id="address"
                            className={`${
                                formikBag.errors.address &&
                                formikBag.touched.address
                                    ? 'input-error'
                                    : ''
                            }`}
                            placeholder="Ho Chi Minh, Viet Nam"
                            value={formikBag.values.address}
                            onChange={formikBag.handleChange}
                        />
                        {formikBag.errors.address &&
                            formikBag.touched.address && (
                                <div className="div-error">
                                    {formikBag.errors.address}
                                </div>
                            )}
                    </div>
                </div>
                <div className="div-row row-button">
                    <button type="button" onClick={handleSubmit}>
                        ADD USER
                    </button>
                </div>
            </div>
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
                                <td className="td-no">{index + 1}</td>
                                <td className="td-email">{value.email}</td>
                                <td className="td-name">{value.name}</td>
                                <td className="td-phone">{value.phone}</td>
                                <td className="td-address">{value.address}</td>
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
