// @mui
import { styled } from '@mui/material/styles';
import { Box, Typography, Container, Grid, Button, useTheme } from '@mui/material';
import Slider from 'react-slick';
import { m } from 'framer-motion';

// components
import Page from '../components/Page';
import { MotionViewport, varFade } from '../components/animate';
// sections
import {
  HomeHero,
} from '../sections/home';
import ServiceCard from '../sections/@dashboard/service/ServiceCard';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(() => ({
  height: '100%',
}));

const ContentStyle = styled('div')(({ theme }) => ({
  overflow: 'hidden',
  position: 'relative',
  backgroundColor: theme.palette.background.default,
}));

// ----------------------------------------------------------------------
const dataList = [
  {
    "id": "1",
    "name": "test1",
    "image": "https://image.luatvietnam.vn/uploaded/1200x675twebp/images/original/2022/09/05/mau-hop-dong-thue-tro-2022-1_0509150415.jpg",
    "price": "4.000.000",
    "address": "299, Liên Phường, phường Phú Hữu, TP.Thủ Đức",
    "rooms": 4,
    "WC": 2,
    "size": "6x8 m²"
  },
  {
    "id": "2",
    "name": "test2",
    "image": "https://image.luatvietnam.vn/uploaded/1200x675twebp/images/original/2022/09/05/mau-hop-dong-thue-tro-2022-1_0509150415.jpg",
    "price": "5.000.000 VND/tháng",
    "address": "300, Liên Phường, phường Phú Hữu, TP.Thủ Đức",
    "rooms": 3,
    "WC": 2,
    "size": "5x7 m²"
  },
  {
    "id": "2",
    "name": "test2",
    "image": "https://image.luatvietnam.vn/uploaded/1200x675twebp/images/original/2022/09/05/mau-hop-dong-thue-tro-2022-1_0509150415.jpg",
    "price": "5.000.000 VND/tháng",
    "address": "300, Liên Phường, phường Phú Hữu, TP.Thủ Đức",
    "rooms": 3,
    "WC": 2,
    "size": "5x7 m²"
  },
  {
    "id": "2",
    "name": "test2",
    "image": "https://image.luatvietnam.vn/uploaded/1200x675twebp/images/original/2022/09/05/mau-hop-dong-thue-tro-2022-1_0509150415.jpg",
    "price": "5.000.000 VND/tháng",
    "address": "300, Liên Phường, phường Phú Hữu, TP.Thủ Đức",
    "rooms": 3,
    "WC": 2,
    "size": "5x7 m²"
  },
  {
    "id": "2",
    "name": "test2",
    "image": "https://image.luatvietnam.vn/uploaded/1200x675twebp/images/original/2022/09/05/mau-hop-dong-thue-tro-2022-1_0509150415.jpg",
    "price": "5.000.000 VND/tháng",
    "address": "300, Liên Phường, phường Phú Hữu, TP.Thủ Đức",
    "rooms": 3,
    "WC": 2,
    "size": "5x7 m²"
  },
  {
    "id": "2",
    "name": "test2",
    "image": "https://image.luatvietnam.vn/uploaded/1200x675twebp/images/original/2022/09/05/mau-hop-dong-thue-tro-2022-1_0509150415.jpg",
    "price": "5.000.000 VND/tháng",
    "address": "300, Liên Phường, phường Phú Hữu, TP.Thủ Đức",
    "rooms": 3,
    "WC": 2,
    "size": "5x7 m²"
  },
];


export default function HomePage() {

  const theme = useTheme();
  return (
    <Page title="Home page">
      <RootStyle>
        <HomeHero />
        <ContentStyle>
          <Container component={MotionViewport} sx={{ pb: 10, textAlign: 'center', marginTop: '30px' }}>
            <m.div variants={varFade().inUp}>
              <Box display='flex' justifyContent='space-between' alignItems='center' sx={{ mb: 5, mt: 7 }}>
                <Typography variant="h4" sx={{ color: theme.palette.secondary.main }}>
                  Dựa trên tìm kiếm của bạn
                </Typography>
                <Button variant="contained" size='small' sx={{ mr: 2 }}>Tìm kiếm những nhà thuê khác</Button>
              </Box>
            </m.div>

            <Box maxWidth="lg" position="relative" m="auto">
              <Grid container spacing={2}>
                {(dataList || []).map((product) => (
                  <Grid item xs={6} md={3} key={product.id} sx={{ px: 1.5, py: 1 }}>
                    <ServiceCard dataCart={product} />
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Container>
          <Container component={MotionViewport} sx={{ pb: 10, textAlign: 'center', marginTop: '30px' }}>
            <m.div variants={varFade().inUp}>
              <Typography variant="h4" sx={{ color: theme.palette.secondary.main, mb: 3, textAlign: 'center', mt: 5 }}>
                Những tiện ích mà bạn cần
              </Typography>
            </m.div>

            <ServiceSlider services={dataList} />

          </Container>
          <Container component={MotionViewport} sx={{ pb: 10, textAlign: 'center', marginTop: '30px' }}>
            <m.div variants={varFade().inUp}>
              <Typography variant="h4" sx={{ color: theme.palette.secondary.main, mb: 3, textAlign: 'center', mt: 5 }}>
                Ưu đãi hấp dẫn
              </Typography>
            </m.div>

            <ServiceSlider services={dataList} />

          </Container>
        </ContentStyle>
      </RootStyle>
    </Page>
  );
}



function ServiceSlider({ services }) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 960,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1
        }
      }
    ]
  };

  return (
    <Slider {...settings}>
      {services.map(service => (
        <Box key={service.id} sx={{ padding: 2 }}>
          <ServiceCard dataCart={service} />
        </Box>
      ))}
    </Slider>
  );
}