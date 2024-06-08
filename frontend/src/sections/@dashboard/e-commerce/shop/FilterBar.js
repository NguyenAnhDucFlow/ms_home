import React, { useState } from 'react';
import { Box, Button, FormControl, InputLabel, MenuItem, Select, Grid, Checkbox, FormControlLabel, Typography, FormGroup, Dialog, DialogTitle, DialogContent, DialogActions, IconButton } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import FilterListIcon from '@mui/icons-material/FilterList';
import CloseIcon from '@mui/icons-material/Close';

export default function FilterBar({ onSearch }) {
    const { control, handleSubmit, reset } = useForm({
        defaultValues: {
            address: '',
            priceRange: '',
            typeOfRental: '',
            bedrooms: '',
            bathrooms: '',
            amenities: [],
            sort: '',
        },
    });

    const [open, setOpen] = useState(false);

    const onSubmit = (data) => {
        onSearch(data);
        setOpen(false);
    };

    const handleReset = () => {
        reset();
        setOpen(false);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Button
                variant="contained"
                color="primary"
                startIcon={<FilterListIcon />}
                onClick={handleClickOpen}
            >
                Filter
            </Button>
            <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
                <DialogTitle>
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Typography variant="h6">Filter Options</Typography>
                        <IconButton onClick={handleClose}>
                            <CloseIcon />
                        </IconButton>
                    </Box>
                </DialogTitle>
                <DialogContent dividers>
                    <Box
                        component="form"
                        onSubmit={handleSubmit(onSubmit)}
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 3,
                            width: '100%',
                        }}
                    >
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={6} md={4}>
                                <FormControl fullWidth variant="outlined">
                                    <InputLabel>Chọn khu vực</InputLabel>
                                    <Controller
                                        name="address"
                                        control={control}
                                        render={({ field }) => (
                                            <Select {...field} label="Chọn khu vực">
                                                <MenuItem value=""><em>None</em></MenuItem>
                                                <MenuItem value="area1">Khu vực 1</MenuItem>
                                                <MenuItem value="area2">Khu vực 2</MenuItem>
                                                <MenuItem value="area3">Khu vực 3</MenuItem>
                                            </Select>
                                        )}
                                    />
                                </FormControl>
                            </Grid>

                            <Grid item xs={12} sm={6} md={4}>
                                <FormControl fullWidth variant="outlined">
                                    <InputLabel>Giá thuê</InputLabel>
                                    <Controller
                                        name="priceRange"
                                        control={control}
                                        render={({ field }) => (
                                            <Select {...field} label="Giá thuê">
                                                <MenuItem value=""><em>None</em></MenuItem>
                                                <MenuItem value="below1000000">Dưới 1,000,000</MenuItem>
                                                <MenuItem value="1000000to5000000">1,000,000 - 5,000,000</MenuItem>
                                                <MenuItem value="above5000000">Trên 5,000,000</MenuItem>
                                            </Select>
                                        )}
                                    />
                                </FormControl>
                            </Grid>

                            <Grid item xs={12} sm={6} md={4}>
                                <FormControl fullWidth variant="outlined">
                                    <InputLabel>Loại hình thuê</InputLabel>
                                    <Controller
                                        name="typeOfRental"
                                        control={control}
                                        render={({ field }) => (
                                            <Select {...field} label="Loại hình thuê">
                                                <MenuItem value=""><em>None</em></MenuItem>
                                                <MenuItem value="apartment">Căn hộ</MenuItem>
                                                <MenuItem value="house">Nhà riêng</MenuItem>
                                                <MenuItem value="condo">Chung cư</MenuItem>
                                            </Select>
                                        )}
                                    />
                                </FormControl>
                            </Grid>

                            <Grid item xs={12} sm={6} md={4}>
                                <FormControl fullWidth variant="outlined">
                                    <InputLabel>Số phòng ngủ</InputLabel>
                                    <Controller
                                        name="bedrooms"
                                        control={control}
                                        render={({ field }) => (
                                            <Select {...field} label="Số phòng ngủ">
                                                <MenuItem value=""><em>None</em></MenuItem>
                                                <MenuItem value="1">1</MenuItem>
                                                <MenuItem value="2">2</MenuItem>
                                                <MenuItem value="3">3</MenuItem>
                                                <MenuItem value="4">4+</MenuItem>
                                            </Select>
                                        )}
                                    />
                                </FormControl>
                            </Grid>

                            <Grid item xs={12} sm={6} md={4}>
                                <FormControl fullWidth variant="outlined">
                                    <InputLabel>Số phòng tắm</InputLabel>
                                    <Controller
                                        name="bathrooms"
                                        control={control}
                                        render={({ field }) => (
                                            <Select {...field} label="Số phòng tắm">
                                                <MenuItem value=""><em>None</em></MenuItem>
                                                <MenuItem value="1">1</MenuItem>
                                                <MenuItem value="2">2</MenuItem>
                                                <MenuItem value="3">3</MenuItem>
                                                <MenuItem value="4">4+</MenuItem>
                                            </Select>
                                        )}
                                    />
                                </FormControl>
                            </Grid>

                            <Grid item xs={12} sm={6} md={4}>
                                <Typography variant="subtitle1" gutterBottom>
                                    Tiện ích
                                </Typography>
                                <FormControl component="fieldset">
                                    <FormGroup row>
                                        <FormControlLabel
                                            control={<Checkbox {...control.register('amenities')} value="wifi" />}
                                            label="WiFi"
                                        />
                                        <FormControlLabel
                                            control={<Checkbox {...control.register('amenities')} value="parking" />}
                                            label="Bãi đỗ xe"
                                        />
                                        <FormControlLabel
                                            control={<Checkbox {...control.register('amenities')} value="pool" />}
                                            label="Bể bơi"
                                        />
                                    </FormGroup>
                                </FormControl>
                            </Grid>

                            <Grid item xs={12} sm={6} md={4}>
                                <FormControl fullWidth variant="outlined">
                                    <InputLabel>Sắp xếp theo</InputLabel>
                                    <Controller
                                        name="sort"
                                        control={control}
                                        render={({ field }) => (
                                            <Select {...field} label="Sắp xếp theo">
                                                <MenuItem value=""><em>None</em></MenuItem>
                                                <MenuItem value="priceAsc">Giá tăng dần</MenuItem>
                                                <MenuItem value="priceDesc">Giá giảm dần</MenuItem>
                                                <MenuItem value="newest">Mới nhất</MenuItem>
                                            </Select>
                                        )}
                                    />
                                </FormControl>
                            </Grid>
                        </Grid>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button variant="outlined" color="secondary" onClick={handleReset}>
                        Reset
                    </Button>
                    <Button variant="contained" color="primary" onClick={handleSubmit(onSubmit)}>
                        Tìm kiếm
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
