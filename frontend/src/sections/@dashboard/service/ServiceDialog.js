import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Typography, Grid } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';

export default function ServiceDialog({ open, handleClose, service }) {
    const { control, handleSubmit, reset } = useForm();

    const onSubmit = (data) => {
        console.log(data);
        handleClose();
        reset();
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
                        <Grid item xs={12} sm={6}>
                            <Controller
                                name="discountCode"
                                control={control}
                                defaultValue=""
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        margin="normal"
                                        label="Mã ưu đãi"
                                        placeholder="Nhập mã ưu đãi"
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
                        <Button type="submit" color="primary" variant="contained">
                            Đăng ký
                        </Button>
                    </DialogActions>
                </form>
            </DialogContent>
        </Dialog>
    );
}
