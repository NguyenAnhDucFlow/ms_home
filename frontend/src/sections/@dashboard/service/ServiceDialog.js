import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Typography } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';

export default function ServiceDialog({ open, handleClose, service }) {
    const { control, handleSubmit, reset } = useForm();

    const onSubmit = (data) => {
        console.log(data);
        handleClose();
        reset();
    };

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
            <DialogTitle>
                Đăng ký dịch vụ: {service.title}
            </DialogTitle>
            <DialogContent>
                <Typography variant="body1" gutterBottom>
                    Vui lòng điền thông tin của bạn để đăng ký dịch vụ này.
                </Typography>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Controller
                        name="name"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <TextField
                                {...field}
                                margin="normal"
                                label="Tên của bạn"
                                type="text"
                                fullWidth
                                variant="outlined"
                                required
                            />
                        )}
                    />
                    <Controller
                        name="phone"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <TextField
                                {...field}
                                margin="normal"
                                label="Số điện thoại"
                                type="tel"
                                fullWidth
                                variant="outlined"
                                required
                            />
                        )}
                    />
                    <Controller
                        name="email"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <TextField
                                {...field}
                                margin="normal"
                                label="Email"
                                type="email"
                                fullWidth
                                variant="outlined"
                                required
                            />
                        )}
                    />
                    <Controller
                        name="address"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <TextField
                                {...field}
                                margin="normal"
                                label="Địa chỉ"
                                type="text"
                                fullWidth
                                variant="outlined"
                                required
                            />
                        )}
                    />
                    <DialogActions>
                        <Button onClick={handleClose} color="secondary" variant="outlined">
                            Hủy bỏ
                        </Button>
                        <Button type="submit" color="primary" variant="contained">
                            Đăng ký
                        </Button>
                    </DialogActions>
                </form>
            </DialogContent>
        </Dialog>
    );
}
