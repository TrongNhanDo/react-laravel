import * as DateFns from 'date-fns';
import { ToastPosition, TypeOptions, toast } from 'react-toastify';

export const formatDate = (date: string) => {
    return DateFns.format(date, 'yyyy-MM-dd HH:mm:ss');
};

export const showToast = (
    message: string,
    type?: TypeOptions,
    position?: ToastPosition,
    closeTime?: number
) => {
    if (!message) return;
    return toast(message, {
        position: position ? position : 'top-right',
        type: type ? type : 'default',
        autoClose: closeTime || 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
        pauseOnFocusLoss: false,
    });
};
