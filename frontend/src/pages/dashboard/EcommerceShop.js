import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Container, Typography, Stack, Box, FormControl, MenuItem, TextField, Button, Divider, Grid } from '@mui/material';
import useSettings from '../../hooks/useSettings';
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import axios from '../../utils/axios';
import { ShopProductList } from '../../sections/@dashboard/e-commerce/shop';
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

  const { watch } = methods;
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
      console.log('Request Params:', {
        ...filterParams,
        page,
        size,
        sortBy,
        sortDirection,
      }); // Debug thông tin request

      const response = await axios.get('/api/listings/search', {
        params: {
          ...filterParams,
          page,
          size,
          sortBy,
          sortDirection,
        },
      });
      console.log('Response data:', response.data); // Debug thông tin response

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
    const { address, priceMin, priceMax, typeOfRental, dimensions } = data;

    setFilters({
      priceMin: priceMin !== undefined ? priceMin : null,
      priceMax: priceMax !== undefined ? priceMax : null,
      address: address || '',
      typeOfRental: typeOfRental || '',
      dimensions: dimensions || ''
    });

    console.log('Filters:', {
      priceMin,
      priceMax,
      address,
      typeOfRental,
      dimensions
    }); // Debug thông tin filters
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
