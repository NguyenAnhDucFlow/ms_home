import { sentenceCase } from 'change-case';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { alpha, styled } from '@mui/material/styles';
import {
  Box, Card, Grid, Divider, Container, Typography, Button, IconButton, Avatar, TextField, Snackbar, Alert, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
  Stack,
} from '@mui/material';
import SquareFootIcon from '@mui/icons-material/SquareFoot';
import BedIcon from '@mui/icons-material/Bed';
import KitchenIcon from '@mui/icons-material/Kitchen';
import PriceCheckIcon from '@mui/icons-material/PriceCheck';
import WcIcon from '@mui/icons-material/Wc';
import useSettings from '../../hooks/useSettings';
import Page from '../../components/Page';
import Iconify from '../../components/Iconify';
import Markdown from '../../components/Markdown';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import { PATH_DASHBOARD } from '../../routes/paths';
import axios from '../../utils/axios';
import { ProductDetailsSummary, ProductDetailsCarousel } from '../../sections/@dashboard/e-commerce/product-details';

const IconWrapperStyle = styled('div')(({ theme }) => ({
  margin: 'auto',
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  width: theme.spacing(8),
  justifyContent: 'center',
  height: theme.spacing(8),
  marginBottom: theme.spacing(3),
  color: theme.palette.primary.main,
  backgroundColor: `${alpha(theme.palette.primary.main, 0.08)}`,
}));

const InfoWrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-around',
  alignItems: 'center',
  padding: theme.spacing(2, 0),
  borderBottom: `1px solid ${theme.palette.divider}`,
  '& .info': {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  '& .icon-buttons': {
    display: 'flex',
    alignItems: 'center',
  },
}));

const DetailItem = styled(Grid)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: theme.spacing(1, 0),
  '& svg': {
    marginRight: theme.spacing(1),
    color: theme.palette.text.secondary,
  },
}));

const DetailTitle = styled(Typography)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  '& svg': {
    marginRight: theme.spacing(1),
  },
}));

const ContactCard = styled(Card)(({ theme }) => ({
  position: 'sticky',
  top: '100px',
  padding: theme.spacing(3),
  textAlign: 'center',
}));

const ContactAvatar = styled(Avatar)(({ theme }) => ({
  width: theme.spacing(10),
  height: theme.spacing(10),
  margin: 'auto',
}));

export default function EcommerceProductDetails() {
  const { themeStretch } = useSettings();
  const { id = '' } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const [value, setValue] = useState('1');
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    date: '',
    message: '',
  });
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`/api/listings/${id}`);
        setProduct(response.data.data);
      } catch (error) {
        setError(error.response ? error.response.data.message : error.message);
      }
    };

    fetchProduct();
  }, [id]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post('/api/appointments', form);
      setSnackbar({ open: true, message: 'Đăng ký lịch hẹn thành công!', severity: 'success' });
      setForm({
        name: '',
        phone: '',
        email: '',
        date: '',
        message: '',
      });
      handleClose();
    } catch (error) {
      setSnackbar({ open: true, message: 'Có lỗi xảy ra, vui lòng thử lại sau!', severity: 'error' });
    }
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Page title="Bất động sản chi tiết">
      <Container maxWidth={themeStretch ? false : 'lg'} sx={{ mt: 15 }}>
        <HeaderBreadcrumbs
          heading="Bất động sản chi tiết"
          links={[
            { name: 'Trang chủ', href: '/' },
            {
              name: 'Cho thuê',
              href: '/chothue',
            },
            { name: sentenceCase(id) },
          ]}
        />

        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            {product && (
              <>
                <Card sx={{ mb: 3 }}>
                  <ProductDetailsCarousel product={product} />
                  <Divider />
                  <InfoWrapper>
                    <div className="info">
                      <Typography variant="body2" color="textSecondary">Mức giá</Typography>
                      <Typography variant="h6">{product.price} triệu/tháng</Typography>
                    </div>
                    <div className="info">
                      <Typography variant="body2" color="textSecondary">Diện tích</Typography>
                      <Typography variant="h6">{product.dimensions} m²</Typography>
                    </div>
                    <div className="info">
                      <Typography variant="body2" color="textSecondary">Phòng ngủ</Typography>
                      <Typography variant="h6">{product.rooms} PN</Typography>
                    </div>
                    <div className="icon-buttons">
                      <IconButton>
                        <Iconify icon="eva:share-fill" />
                      </IconButton>
                      <IconButton>
                        <Iconify icon="eva:alert-triangle-fill" />
                      </IconButton>
                      <IconButton>
                        <Iconify icon="eva:heart-fill" />
                      </IconButton>
                    </div>
                  </InfoWrapper>
                  <Divider />
                  <Box sx={{ p: 3 }}>
                    <Typography variant="h6" sx={{ mb: 2 }}>Thông tin mô tả</Typography>
                    <Markdown variant="body2" color="textSecondary">{product.description}</Markdown>
                  </Box>
                  <Box sx={{ p: 3 }}>
                    <Typography variant="h6">Đặc điểm bất động sản</Typography>
                    <Grid container spacing={2} sx={{ mt: 2 }}>
                      <Grid item xs={6}>
                        <DetailItem container alignItems="center" spacing={1}>
                          <Grid item>
                            <SquareFootIcon />
                          </Grid>
                          <Grid item>
                            <Typography variant="body2" color="textSecondary">Diện tích</Typography>
                          </Grid>
                          <Grid item xs>
                            <Divider orientation="vertical" flexItem />
                          </Grid>
                          <Grid item>
                            <Typography variant="body1" align="center">{product.dimensions} m²</Typography>
                          </Grid>
                        </DetailItem>
                        <Divider />
                      </Grid>
                      <Grid item xs={6}>
                        <DetailItem container alignItems="center" spacing={1}>
                          <Grid item>
                            <PriceCheckIcon />
                          </Grid>
                          <Grid item>
                            <Typography variant="body2" color="textSecondary">Mức giá</Typography>
                          </Grid>
                          <Grid item xs>
                            <Divider orientation="vertical" flexItem />
                          </Grid>
                          <Grid item>
                            <Typography variant="body1" align="center">{product.price} triệu/tháng</Typography>
                          </Grid>
                        </DetailItem>
                        <Divider />
                      </Grid>
                      <Grid item xs={6}>
                        <DetailItem container alignItems="center" spacing={1}>
                          <Grid item>
                            <BedIcon />
                          </Grid>
                          <Grid item>
                            <Typography variant="body2" color="textSecondary">Số phòng ngủ</Typography>
                          </Grid>
                          <Grid item xs>
                            <Divider orientation="vertical" flexItem />
                          </Grid>
                          <Grid item>
                            <Typography variant="body1" align="center">{product.rooms} phòng</Typography>
                          </Grid>
                        </DetailItem>
                        <Divider />
                      </Grid>
                      <Grid item xs={6}>
                        <DetailItem container alignItems="center" spacing={1}>
                          <Grid item>
                            <WcIcon />
                          </Grid>
                          <Grid item>
                            <Typography variant="body2" color="textSecondary">Số toilet</Typography>
                          </Grid>
                          <Grid item xs>
                            <Divider orientation="vertical" flexItem />
                          </Grid>
                          <Grid item>
                            <Typography variant="body1" align="center">{product.bathrooms} phòng</Typography>
                          </Grid>
                        </DetailItem>
                        <Divider />
                      </Grid>
                      <Grid item xs={6}>
                        <DetailItem container alignItems="center" spacing={1}>
                          <Grid item>
                            <KitchenIcon />
                          </Grid>
                          <Grid item>
                            <Typography variant="body2" color="textSecondary">Nội thất</Typography>
                          </Grid>
                          <Grid item xs>
                            <Divider orientation="vertical" flexItem />
                          </Grid>
                          <Grid item>
                            <Typography variant="body1" align="center">{product.amenities.includes('Full') ? 'Đầy đủ' : 'Không có'}</Typography>
                          </Grid>
                        </DetailItem>
                        <Divider />
                      </Grid>
                      <Grid item xs={6}>
                        <DetailItem container alignItems="center" spacing={1}>
                          <Grid item>
                            <Iconify icon="eva:home-outline" />
                          </Grid>
                          <Grid item>
                            <Typography variant="body2" color="textSecondary">Địa chỉ</Typography>
                          </Grid>
                          <Grid item xs>
                            <Divider orientation="vertical" flexItem />
                          </Grid>
                          <Grid item>
                            <Typography variant="body1" align="center">{product.address}</Typography>
                          </Grid>
                        </DetailItem>
                        <Divider />
                      </Grid>
                      <Grid item xs={6}>
                        <DetailItem container alignItems="center" spacing={1}>
                          <Grid item>
                            <Iconify icon="eva:layers-outline" />
                          </Grid>
                          <Grid item>
                            <Typography variant="body2" color="textSecondary">Loại bất động sản</Typography>
                          </Grid>
                          <Grid item xs>
                            <Divider orientation="vertical" flexItem />
                          </Grid>
                          <Grid item>
                            <Typography variant="body1" align="center">{product.propertyType}</Typography>
                          </Grid>
                        </DetailItem>
                        <Divider />
                      </Grid>
                      <Grid item xs={6}>
                        <DetailItem container alignItems="center" spacing={1}>
                          <Grid item>
                            <Iconify icon="eva:checkmark-square-2-outline" />
                          </Grid>
                          <Grid item>
                            <Typography variant="body2" color="textSecondary">Trạng thái</Typography>
                          </Grid>
                          <Grid item xs>
                            <Divider orientation="vertical" flexItem />
                          </Grid>
                          <Grid item>
                            <Typography variant="body1" align="center">{product.status}</Typography>
                          </Grid>
                        </DetailItem>
                        <Divider />
                      </Grid>
                    </Grid>
                  </Box>
                  <Divider />
                </Card>
              </>
            )}

            {!product && !error && <Typography variant="h6">Loading...</Typography>}
            {error && <Typography variant="h6">404 Product not found</Typography>}
          </Grid>

          <Grid item xs={12} md={4}>
            <ContactCard>
              <Stack direction='row' spacing={2} alignItems="center" sx={{ mb: 2 }}>
                <Avatar alt="Nguyễn Tiến Đạt" src="/path/to/avatar.jpg" justifyContent="start" sx={{ width: 56, height: 56 }} />
                <Stack>
                  <Typography variant="h6" sx={{ ml: -6 }}>Nguyễn Tiến Đạt</Typography>
                  <Typography variant="body2" color="textSecondary">Đã tham gia: 11 tháng 19 ngày</Typography>
                </Stack>
              </Stack>
              <Divider />
              <Typography variant="h6" sx={{ mt: 2 }}>Đăng ký lịch hẹn</Typography>
              <Button variant="contained" fullWidth sx={{ mt: 2 }} onClick={handleOpen}>
                Đăng ký lịch hẹn
              </Button>
            </ContactCard>
          </Grid>
        </Grid>
      </Container>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Đăng ký lịch hẹn</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Điền thông tin của bạn vào form dưới đây để đăng ký lịch hẹn.
          </DialogContentText>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <TextField
              name="name"
              label="Họ và tên"
              variant="outlined"
              fullWidth
              value={form.name}
              onChange={handleChange}
              required
              sx={{ mb: 2 }}
            />
            <TextField
              name="phone"
              label="Số điện thoại"
              variant="outlined"
              fullWidth
              value={form.phone}
              onChange={handleChange}
              required
              sx={{ mb: 2 }}
            />
            <TextField
              name="email"
              label="Email"
              variant="outlined"
              fullWidth
              value={form.email}
              onChange={handleChange}
              required
              sx={{ mb: 2 }}
            />
            <TextField
              name="date"
              label="Ngày hẹn"
              type="date"
              variant="outlined"
              fullWidth
              value={form.date}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              required
              sx={{ mb: 2 }}
            />
            <TextField
              name="message"
              label="Lời nhắn"
              variant="outlined"
              fullWidth
              value={form.message}
              onChange={handleChange}
              multiline
              rows={4}
              sx={{ mb: 2 }}
            />
            <DialogActions>
              <Button onClick={handleClose}>Hủy</Button>
              <Button type="submit" variant="contained">Gửi đăng ký</Button>
            </DialogActions>
          </Box>
        </DialogContent>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Page>
  );
}
