import * as Yup from 'yup';

export const validationSchema = () => {
    return Yup.object().shape({
        email: Yup.string().required('This field is required'),
        name: Yup.string().required('This field is required'),
        password: Yup.string().required('This field is required'),
        phone: Yup.string().required('This field is required'),
        address: Yup.string().required('This field is required'),
    });
};
