import { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
// @mui
import { Container } from '@mui/material';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import ProductNewEditForm from '../../sections/@dashboard/e-commerce/ProductNewEditForm';
// utils
import axios from '../../utils/axios';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';

// ----------------------------------------------------------------------

export default function EcommerceProductCreate() {
  const { themeStretch } = useSettings();
  const { pathname } = useLocation();
  const { id } = useParams();
  const isEdit = pathname.includes('edit');
  const [currentProduct, setCurrentProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      if (isEdit) {
        try {
          const response = await axios.get(`/api/listings/${id}`);
          setCurrentProduct(response.data.data);
        } catch (error) {
          console.error('Failed to fetch product', error);
        }
      }
    };

    fetchProduct();
  }, [id, isEdit]);

  return (
    <Page title="Cho thuê">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={!isEdit ? 'Tạo bài đăng' : 'Sửa bài đăng'}
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            {
              name: 'Cho thuê',
              href: PATH_DASHBOARD.eCommerce.root,
            },
            { name: !isEdit ? 'Bài đăng mới' : id },
          ]}
        />

        <ProductNewEditForm isEdit={isEdit} currentProperty={currentProduct} />
      </Container>
    </Page>
  );
}
