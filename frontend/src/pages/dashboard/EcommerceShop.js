import React, { useEffect, useState } from 'react';
// form
import { useForm, Controller } from 'react-hook-form';
// @mui
import { Container, Typography, Stack, Box, FormControl, MenuItem, TextField, Button, Divider, Grid } from '@mui/material';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import { FormProvider } from '../../components/hook-form';
import { PATH_DASHBOARD } from '../../routes/paths';
import axios from '../../utils/axios';
// sections
import { ShopProductList, ShopProductSearch } from '../../sections/@dashboard/e-commerce/shop';
import FilterBar from '../../sections/@dashboard/e-commerce/shop/FilterBar';

// ----------------------------------------------------------------------

export default function EcommerceShop() {
  const { themeStretch } = useSettings();

  const [products, setProducts] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState({
    priceMin: null,
    priceMax: null,
    address: '',
    typeOfRental: '',
    dimensions: '',
  });

  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortDirection, setSortDirection] = useState('desc');

  const defaultValues = {
    priceMin: filters.priceMin,
    priceMax: filters.priceMax,
    address: filters.address,
    typeOfRental: filters.typeOfRental,
    dimensions: filters.dimensions,
  };

  const methods = useForm({
    defaultValues,
  });

  const { reset, watch, setValue } = methods;
  const values = watch();

  const isDefault =
    !values.priceMin &&
    !values.priceMax &&
    !values.address &&
    !values.typeOfRental &&
    values.dimensions === '';

  const fetchProducts = async (filterParams) => {
    setLoading(true);
    try {
      const response = await axios.get('/api/listings/search', {
        params: {
          ...filterParams,
          page,
          size,
          sortBy,
          sortDirection,
        },
      });
      setProducts(response.data.data.content);
      setTotalProducts(response.data.data.totalElements);
    } catch (error) {
      console.error('Failed to fetch products', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const filterParams = {
      priceMin: filters.priceMin,
      priceMax: filters.priceMax,
      address: filters.address,
      typeOfRental: filters.typeOfRental,
      dimensions: filters.dimensions,
    };
    fetchProducts(filterParams);
  }, [filters, page, size, sortBy, sortDirection]);

  const handleSearch = (data) => {
    const { address, priceRange, typeOfRental, dimensions } = data;
    let priceMin = null;
    let priceMax = null;
    if (priceRange === 'below1000000') {
      priceMax = 1000000;
    } else if (priceRange === '1000000to5000000') {
      priceMin = 1000000;
      priceMax = 5000000;
    } else if (priceRange === 'above5000000') {
      priceMin = 5000000;
    }
    setFilters({ ...filters, address, priceMin, priceMax, typeOfRental, dimensions });
  };

  const handleSort = (data) => {
    setSortBy(data.sortBy);
    setSortDirection(data.sortDirection);
  };

  return (
    <Page title="Cho thuê">
      <Container maxWidth={themeStretch ? false : 'lg'} sx={{ mt: 15 }}>
        <FilterBar onSearch={handleSearch} />
        <HeaderBreadcrumbs
          links={[
            {
              name: 'Trang chủ',
              href: '/',
            },
            { name: 'Cho thuê' },
          ]}
        />

        <SortBar onSort={handleSort} totalElements={totalProducts} />

        <Stack sx={{ mb: 3 }}>
          {!isDefault && (
            <>
              <Typography variant="body2" gutterBottom>
                <strong>{totalProducts}</strong>
                &nbsp;Products found
              </Typography>
            </>
          )}
        </Stack>

        <ShopProductList products={products} loading={loading} />
      </Container>
    </Page>
  );
}

function SortBar({ onSort, totalElements }) {
  const handleSort = (sortBy, sortDirection) => {
    onSort({ sortBy, sortDirection });
  };

  return (
    <Stack>
      <Typography variant='subtitle1' sx={{ mb: 1 }}>Tổng {totalElements} kết quả</Typography>
      <Stack direction='row' alignItems='center' spacing={1}>
        <Typography variant='subtitle2' sx={{ pr: 1 }}>Sắp xếp: </Typography>
        <Button variant="contained" size="small" onClick={() => handleSort('createdAt', 'desc')}>Mặc định</Button>
        <Button variant="contained" size="small" onClick={() => handleSort('price', 'asc')}>Giá tăng dần</Button>
        <Button variant="contained" size="small" onClick={() => handleSort('price', 'desc')}>Giá giảm dần</Button>
      </Stack>
    </Stack>
  );
}

