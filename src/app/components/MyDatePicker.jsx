import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const MyDatePicker = ({ name, label }) => {
    return (
        <div className='mb-4'>
            <label className='font-semibold' htmlFor={name}>{label}*</label>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                    className='border-black h-3'
                />
            </LocalizationProvider>
        </div>
    );
};

export default MyDatePicker;