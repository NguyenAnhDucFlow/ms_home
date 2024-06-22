import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Alert, Typography, Grid, Snackbar } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from '../../../utils/axios';
import useAuth from '../../../hooks/useAuth'; // Import useAuth hook

export default function ServiceDialog({ open, handleClose, service }) {
    const { control, handleSubmit, reset } = useForm();
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth(); // Get authentication status

    const onSubmit = async (data) => {
        try {
            const requestData = {
                ...data,
                serviceName: service.title,
            }
            const response = await axios.post('/api/services/create', requestData);
            console.log('API Response:', response.data);
            setSnackbar({ open: true, message: 'Đăng ký dịch vụ thành công!', severity: 'success' });
            reset();
            handleClose();
        } catch (error) {
            console.error('Error submitting form:', error);
            // Show error message
            setSnackbar({ open: true, message: 'Có lỗi xảy ra, vui lòng thử lại sau!', severity: 'error' });
        }
    };

    const handleOpen = () => {
        if (!isAuthenticated) {
            navigate('/auth/login');
        }
    };

    const handleCloseSnackbar = () => {
        setSnackbar({ ...snackbar, open: false });
    };

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
            <DialogTitle>
                Đăng ký dịch vụ: {service.title}
            </DialogTitle>
            <DialogContent>
                <Typography variant="body1" gutterBottom>
                    Vui lòng điền thông tin của bạn để đăng ký dịch vụ này.
                </Typography>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <Controller
                                name="name"
                                control={control}
                                defaultValue=""
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        margin="normal"
                                        label="Họ và tên"
                                        placeholder="VD: Nguyễn Văn A"
                                        type="text"
                                        fullWidth
                                        variant="outlined"
                                        required
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Controller
                                name="phone"
                                control={control}
                                defaultValue=""
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        margin="normal"
                                        label="Số điện thoại"
                                        placeholder="VD: 0902797237"
                                        type="tel"
                                        fullWidth
                                        variant="outlined"
                                        required
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Controller
                                name="area"
                                control={control}
                                defaultValue=""
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        margin="normal"
                                        label="Diện tích"
                                        placeholder="VD: 50 m²"
                                        type="text"
                                        fullWidth
                                        variant="outlined"
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Controller
                                name="startAddress"
                                control={control}
                                defaultValue=""
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        margin="normal"
                                        label="Địa chỉ chuyển đi"
                                        placeholder="VD: 299, Liên Phường, phường Phú Hữu"
                                        type="text"
                                        fullWidth
                                        variant="outlined"
                                        required
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Controller
                                name="endAddress"
                                control={control}
                                defaultValue=""
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        margin="normal"
                                        label="Địa chỉ chuyển đến"
                                        placeholder="VD: 201/2, Lê Văn Việt, phường Phú Hữu"
                                        type="text"
                                        fullWidth
                                        variant="outlined"
                                        required
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Controller
                                name="startTime"
                                control={control}
                                defaultValue=""
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        margin="normal"
                                        label="Thời gian bắt đầu"
                                        type="time"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        inputProps={{
                                            value: field.value || "",
                                        }}
                                        fullWidth
                                        variant="outlined"
                                        required
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Controller
                                name="endTime"
                                control={control}
                                defaultValue=""
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        margin="normal"
                                        label="Thời gian kết thúc"
                                        type="time"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        inputProps={{
                                            value: field.value || "",
                                        }}
                                        fullWidth
                                        variant="outlined"
                                        required
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Controller
                                name="notes"
                                control={control}
                                defaultValue=""
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        margin="normal"
                                        label="Ghi chú"
                                        placeholder="Ghi chú"
                                        type="text"
                                        multiline
                                        rows={4}
                                        fullWidth
                                        variant="outlined"
                                    />
                                )}
                            />
                        </Grid>
                    </Grid>
                    <DialogActions>
                        <Button onClick={handleClose} color="secondary" variant="outlined">
                            Hủy bỏ
                        </Button>
                        <Button type="submit" color="primary" variant="contained" onClick={handleOpen}>
                            Đăng ký
                        </Button>
                    </DialogActions>
                </form>
            </DialogContent>
            <Snackbar
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
            >
                <Alert onClose={handleCloseSnackbar} severity={snackbar.severity}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Dialog>
    );
}
