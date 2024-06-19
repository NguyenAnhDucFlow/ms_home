import React from 'react';
import { Box, Button, FormControl, MenuItem, TextField, InputLabel, Select, Grid, Divider } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import axios from '../../../../utils/axios';

export default function FilterBar({ onSearch }) {
    const { control, handleSubmit } = useForm({
        defaultValues: {
            address: '',
            priceRange: '',
            typeOfRental: '',
            dimensions: '',
        },
    });

    const onSubmit = async (data) => {
        let priceMin = null;
        let priceMax = null;
        if (data.priceRange === 'below1000000') {
            priceMax = 1;
        } else if (data.priceRange === '1000000to5000000') {
            priceMin = 1;
            priceMax = 5;
        } else if (data.priceRange === 'above5000000') {
            priceMin = 5;
        }

        const filterParams = {
            priceMin: priceMin || undefined,
            priceMax: priceMax || undefined,
            address: data.address || undefined,
            typeOfRental: data.typeOfRental || undefined,
            dimensions: data.dimensions || undefined,
        };

        onSearch(filterParams);
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{
                width: '100%',
                padding: 2,
                backgroundColor: '#fff',
                borderRadius: 1,
                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
            }}
        >
            <Grid container alignItems="center" justifyContent="space-between">
                <Grid item xs={12} sm={6} md={2}>
                    <FormControl variant='standard' fullWidth>
                        <InputLabel>Loại hình thuê</InputLabel>
                        <Controller
                            name="typeOfRental"
                            control={control}
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    label="Loại hình thuê"
                                    size="small"
                                >
                                    <MenuItem value=""><em>None</em></MenuItem>
                                    <MenuItem value="Apartment">Căn hộ</MenuItem>
                                    <MenuItem value="House">Nhà riêng</MenuItem>
                                    <MenuItem value="Condo">Chung cư</MenuItem>
                                </Select>
                            )}
                        />
                    </FormControl>
                </Grid>
                <Divider orientation="vertical" flexItem />
                <Grid item xs={12} sm={6} md={2}>
                    <FormControl variant='standard' fullWidth>
                        <InputLabel>Giá</InputLabel>
                        <Controller
                            name="priceRange"
                            control={control}
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    label="Giá"
                                    size="small"
                                >
                                    <MenuItem value=""><em>None</em></MenuItem>
                                    <MenuItem value="below1000000">Below 1,000,000</MenuItem>
                                    <MenuItem value="1000000to5000000">1,000,000 - 5,000,000</MenuItem>
                                    <MenuItem value="above5000000">Above 5,000,000</MenuItem>
                                </Select>
                            )}
                        />
                    </FormControl>
                </Grid>
                <Divider orientation="vertical" flexItem />
                <Grid item xs={12} sm={6} md={2}>
                    <Controller
                        name="dimensions"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Diện tích"
                                variant='standard'
                                size="small"
                                fullWidth
                            />
                        )}
                    />
                </Grid>
                <Divider orientation="vertical" flexItem />
                <Grid item xs={12} sm={6} md={2}>
                    <Button variant="contained" color="primary" type="submit" size="large" fullWidth>
                        Tìm kiếm
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
}
