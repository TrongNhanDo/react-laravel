import * as DateFns from 'date-fns';

export const formatDate = (date: string) => {
    return DateFns.format(date, 'yyyy-MM-dd HH:mm:ss');
};
