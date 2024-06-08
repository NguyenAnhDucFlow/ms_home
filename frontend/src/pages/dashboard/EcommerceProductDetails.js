import { sentenceCase } from 'change-case';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { alpha, styled } from '@mui/material/styles';
import { Box, Tab, Card, Grid, Divider, Container, Typography, Button, IconButton, Link, Avatar } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
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

  return (
    <Page title="Ecommerce: Product Details">
      <Container maxWidth={themeStretch ? false : 'lg'} sx={{ mt: 15 }}>
        <HeaderBreadcrumbs
          heading="Product Details"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            {
              name: 'E-Commerce',
              href: PATH_DASHBOARD.eCommerce.root,
            },
            {
              name: 'Shop',
              href: PATH_DASHBOARD.eCommerce.shop,
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
              <ContactAvatar alt="Contact Person" src="/path/to/avatar.jpg" />
              <Typography variant="h6" sx={{ mt: 2 }}>Huệ Building</Typography>
              <Button fullWidth variant="contained" sx={{ mt: 2 }}>
                0906 892 *** · Hiện số
              </Button>
              <Button fullWidth variant="outlined" sx={{ mt: 2 }}>
                Chat qua Zalo
              </Button>
              <Button fullWidth variant="outlined" sx={{ mt: 2 }}>
                Gửi email
              </Button>
              <Button fullWidth variant="outlined" sx={{ mt: 2 }}>
                Yêu cầu liên hệ lại
              </Button>
            </ContactCard>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
