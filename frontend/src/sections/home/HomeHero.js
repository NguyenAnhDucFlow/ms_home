import { m } from 'framer-motion';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Button, Box, Link, Container, Typography, Stack, Grid, TextField, MenuItem, Divider, Paper, InputBase, InputAdornment } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import HomeIcon from '@mui/icons-material/Home';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import Image from '../../components/Image';
import Iconify from '../../components/Iconify';
import TextIconLabel from '../../components/TextIconLabel';
import { MotionContainer, varFade } from '../../components/animate';

// ----------------------------------------------------------------------

const RootStyle = styled(m.div)(({ theme }) => ({
  position: 'relative',
  backgroundColor: theme.palette.grey[400],
  [theme.breakpoints.up('md')]: {
    top: 0,
    left: 0,
    width: '100%',
    height: '100vh',
    display: 'flex',
    position: 'fixed',
    alignItems: 'center',
  },
}));

const ContentStyle = styled((props) => <Stack spacing={5} {...props} />)(({ theme }) => ({
  zIndex: 10,
  maxWidth: 620,
  margin: 'auto',
  textAlign: 'center',
  position: 'relative',
  paddingTop: theme.spacing(15),
  paddingBottom: theme.spacing(15),
  [theme.breakpoints.up('md')]: {
    margin: 'unset',
    textAlign: 'left',
  },
}));

const HeroOverlayStyle = styled(m.img)({
  zIndex: 9,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
});

const HeroImgStyle = styled(m.img)(({ theme }) => ({
  top: '16%',
  right: '5%',
  zIndex: 8,
  width: '12%',
  height: 'auto',
  position: 'absolute',
  [theme.breakpoints.up('lg')]: {
    right: '5%',
    width: '12%',
  },
}));



// ----------------------------------------------------------------------

export default function HomeHero() {
  return (
    <MotionContainer>
      <RootStyle>
        <HeroOverlayStyle
          alt="overlay"
          src="https://minimal-assets-api.vercel.app/assets/overlay.svg"
          variants={varFade().in}
        />

        <HeroImgStyle
          alt="hero"
          src="https://minimal-assets-api.vercel.app/assets/images/home/hero.png"
          variants={varFade().inUp}
        />

        <Container>
          <ContentStyle>
            <m.div variants={varFade().inRight}>
              <Typography variant="h3" sx={{ color: '#183580', mt: 5 }}>
                Mở khóa cuộc sống sinh<br />
                viên tiện lợi
              </Typography>
            </m.div>

            <m.div variants={varFade().inRight}>
              <Typography variant='h5' sx={{ color: '#445a63' }}>
                Mọi thứ bạn cần về nơi ở sẽ có ở đây, nơi ở sẽ <br /> tìm kiếm dễ dàng hơn
              </Typography>
            </m.div>

            <SearchBar />

            <Stack spacing={2}>
              <m.div variants={varFade().inRight}>
                <Typography variant='h5' sx={{ color: '#445a63' }}>
                  Quan hệ đối tác của chúng tôi
                </Typography>
              </m.div>

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
            </Stack>
          </ContentStyle>
        </Container>
      </RootStyle>
      <Box sx={{ height: { md: '100vh' } }} />
    </MotionContainer>
  );
}

function SearchBar() {
  const textFieldStyle = {
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        border: 'none',
      },
      '&:hover fieldset': {
        border: 'none',
      },
      '&.Mui-focused fieldset': {
        border: 'none',
      },
    },
    flexGrow: 1,
    marginRight: 1,
  };

  return (
    <Paper elevation={4} style={{ borderRadius: '15px' }}>
      <Box display="flex" justifyContent="center" padding="12px 16px" backgroundColor="#f5f5f5" borderRadius={2} alignItems="center">
        <TextField
          label="Địa chỉ"
          defaultValue="Thành phố Thủ Đức, HCM"
          placeholder='Thành phố Thủ Đức, HCM'
          variant="outlined"
          sx={{ ...textFieldStyle, width: '40%' }}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <Divider orientation="vertical" flexItem sx={{ mx: 1.5, height: 'auto' }} />
        <TextField
          select
          label="Loại hình thuê"
          defaultValue="Chung cư"
          variant="outlined"
          sx={{ ...textFieldStyle, width: '30%' }}
        >
          <MenuItem value="Chung cư">Chung cư</MenuItem>
          <MenuItem value="Nhà riêng">Nhà riêng</MenuItem>
        </TextField>
        <Button variant="contained" color="primary" sx={{ flexGrow: 0, whiteSpace: 'nowrap' }}>
          Tìm kiếm
        </Button>
      </Box>
    </Paper>
  );
}

const partners = [
  { name: 'bTaskee', logo: 'path/to/btaskee-logo.png' },
  { name: 'SEC', logo: 'path/to/sec-logo.png' },
  { name: 'FPT', logo: 'path/to/fpt-logo.png' },
  { name: 'Đại học Quốc Gia TP HCM', logo: 'path/to/university-logo.png' }
];
