import React, { useState } from 'react';
import { Container, Typography, Box, Grid, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import ServiceDialog from './ServiceDialog';

const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(2),
    borderRadius: '20px',
    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
    cursor: 'pointer',
}));

const services = [
    {
        title: 'Vệ sinh đồ điện lạnh',
        image: '/path/to/image1.png',
    },
    {
        title: 'Chuyển nhà',
        image: '/path/to/image2.png',
    },
    {
        title: 'Dọn dẹp nhà',
        image: '/path/to/image3.png',
    },
];

function ServiceCard({ service, onClick }) {
    return (
        <StyledPaper onClick={() => onClick(service)}>
            <Box component="img" src={service.image} alt={service.title} width="100%" height="auto" borderRadius="20px" />
            <Typography variant="h6" align="center" mt={2}>{service.title}</Typography>
        </StyledPaper>
    );
}

export default function HomePage() {
    const [selectedService, setSelectedService] = useState(null);

    const handleClickOpen = (service) => {
        setSelectedService(service);
    };

    const handleClose = () => {
        setSelectedService(null);
    };

    return (
        <Container maxWidth="lg" sx={{ mt: 15, mb: 4 }}>
            <Box
                sx={{
                    backgroundColor: '#003366',
                    color: '#fff',
                    borderRadius: '20px',
                    p: 4,
                    textAlign: 'center',
                }}
            >
                <Typography variant="h4" gutterBottom>
                    Giới thiệu về dịch vụ của MSHOME
                </Typography>
                <Typography variant="body1">
                    Chào mừng bạn đến với trang web của chúng tôi! Chúng tôi cung cấp các dịch vụ điện lạnh, chuyển nhà, và dọn dẹp nhà cửa với chất lượng cao. Đội ngũ chuyên nghiệp của chúng tôi sẽ giúp bạn dễ dàng và nhanh chóng hơn trong việc chăm sóc nhà cửa và đồ dùng của bạn.
                </Typography>
            </Box>

            <Grid container direction="column" spacing={4} sx={{ mt: 4 }}>
                {services.map((service, index) => (
                    <Grid item xs={12} key={index}>
                        <ServiceCard service={service} onClick={handleClickOpen} />
                    </Grid>
                ))}
            </Grid>

            {selectedService && (
                <ServiceDialog
                    open={Boolean(selectedService)}
                    handleClose={handleClose}
                    service={selectedService}
                />
            )}
        </Container>
    );
}
