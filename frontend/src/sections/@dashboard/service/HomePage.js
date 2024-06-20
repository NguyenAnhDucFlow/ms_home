import React, { useState } from 'react';
import { Container, Typography, Box, Grid, Paper, Button } from '@mui/material';
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
        image: '/image/dv sua may lanh.png',
    },
    {
        title: 'Chuyển nhà',
        image: '/image/dv van chuyen.png',
    },
    {
        title: 'Dọn dẹp nhà',
        image: '/image/dv don dep.png',
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

            <Grid container spacing={2} sx={{ padding: 2, mt: 10 }}>
                <Grid item xs={12} sm={12} md={12} lg={12} >
                    <Typography variant="h4" gutterBottom>
                        Đối tác của MsHome
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={4} sx={{ display: 'flex', alignItems: 'center' }}>
                            <img src="/image/fpt-logo.jpg" alt="Đại học FPT" style={{ width: '10%', height: 'auto', display: 'inline' }} />
                            <span style={{ marginLeft: '5px' }}>Đại học FPT</span>
                        </Grid>
                        <Grid item xs={4} sx={{ display: 'flex', alignItems: 'center' }}>
                            <img src="/image/dh-quoc-gia-logo.jpg" alt="Đại học Quốc Gia" style={{ width: '10%', height: 'auto' }} />
                            <span style={{ marginLeft: '5px' }}>Đại học Quốc Gia <br /> TH.HCM</span>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6}>
                    <Typography variant="h4" gutterBottom>
                        Chúng tôi sẵn sàng hỗ trợ bạn
                    </Typography>
                    <Typography variant="body1" paragraph>
                        Khi có bất kỳ thắc mắc, bạn chỉ cần chạm nhẹ, chúng tôi sẽ giải đáp cho bạn.
                    </Typography>
                    <Button variant="contained" color="primary" sx={{ mt: 2 }}>
                        Nhận hỗ trợ
                    </Button>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6}>
                    <img src="/image/support-image.jpg" alt="Hỗ trợ" style={{ width: '70%', height: 'auto', marginTop: '20px' }} />
                </Grid>
            </Grid>
        </Container>
    );
}
