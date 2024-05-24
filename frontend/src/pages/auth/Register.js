import { capitalCase } from 'change-case';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Card, Stack, Link, Alert, Tooltip, Container, Typography, Divider, IconButton } from '@mui/material';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebookF, FaApple } from 'react-icons/fa';
// hooks
import useAuth from '../../hooks/useAuth';
import useResponsive from '../../hooks/useResponsive';
// routes
import { PATH_AUTH } from '../../routes/paths';
// components
import Page from '../../components/Page';
import Logo from '../../components/Logo';
import Image from '../../components/Image';
// sections
import { RegisterForm } from '../../sections/auth/register';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const HeaderStyle = styled('header')(({ theme }) => ({
  top: 0,
  zIndex: 9,
  lineHeight: 0,
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  position: 'absolute',
  padding: theme.spacing(3),
  justifyContent: 'space-between',
  [theme.breakpoints.up('md')]: {
    alignItems: 'flex-start',
    padding: theme.spacing(7, 5, 0, 7),
  },
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: 464,
  display: 'flex',
  backgroundImage: 'url(https://mutantorchid.s3.ap-southeast-1.amazonaws.com/DALL%C2%B7E+2024-05-22+12.47.09+-+A+minimalistic+vertical+digital+illustration+for+the+MsHome+website%2C+utilizing+a+sea+blue+color+scheme.+The+scene+depicts+a+diverse+group+of+students+.webp)',
  backgroundSize: 'cover',
  backgroundPosition: 'center center',
  backgroundRepeat: 'no-repeat',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: theme.spacing(2, 0, 2, 2),
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function Register() {
  const { method } = useAuth();

  const smUp = useResponsive('up', 'sm');

  const mdUp = useResponsive('up', 'md');

  return (
    <Page title="Register">
      <RootStyle>
        <HeaderStyle>
          <Logo />

        </HeaderStyle>

        {mdUp && (
          <SectionStyle>
            <></>
          </SectionStyle>
        )}

        <Container>
          <ContentStyle>
            <Box sx={{ mb: 3, display: 'flex', alignItems: 'center' }}>
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="h4" gutterBottom>
                  Đăng kí
                </Typography>
              </Box>
            </Box>

            <RegisterForm />

            <Divider sx={{ my: 3 }}>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Hoặc
              </Typography>
            </Divider>

            <Stack direction="row" justifyContent="center" spacing={2}>
              <Tooltip title="Sign in with Google">
                <IconButton component={RouterLink} to="#">
                  <FcGoogle style={{ fontSize: 30 }} />
                </IconButton>
              </Tooltip>
              <Tooltip title="Sign in with Facebook">
                <IconButton component={RouterLink} to="#">
                  <FaFacebookF style={{ fontSize: 30, color: '#1877F2' }} />
                </IconButton>
              </Tooltip>
              <Tooltip title="Sign in with Apple">
                <IconButton component={RouterLink} to="#">
                  <FaApple style={{ fontSize: 30, color: '#000000' }} />
                </IconButton>
              </Tooltip>
            </Stack>

            {!smUp && (
              <Typography variant="body2" sx={{ mt: 3, textAlign: 'center' }}>
                Already have an account?{' '}
                <Link variant="subtitle2" to={PATH_AUTH.login} component={RouterLink}>
                  Login
                </Link>
              </Typography>
            )}

            {smUp && (
              <Typography variant="body2" sx={{ mt: 5 }}>
                Bạn đã có tài khoản ?{' '}
                <Link variant="subtitle2" component={RouterLink} to={PATH_AUTH.login}>
                  Đăng nhập
                </Link>
              </Typography>
            )}
          </ContentStyle>
        </Container>
      </RootStyle>
    </Page>
  );
}
