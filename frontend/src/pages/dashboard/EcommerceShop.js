import React, { useEffect, useState } from 'react';
// form
import { useForm } from 'react-hook-form';
// @mui
import { Container, Typography, Stack } from '@mui/material';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import { FormProvider } from '../../components/hook-form';
import { PATH_DASHBOARD } from '../../routes/paths';
import axios from '../../utils/axios';
// sections
import {
  ShopProductList,
  ShopProductSearch,
} from '../../sections/@dashboard/e-commerce/shop';
import FilterBar from '../../sections/@dashboard/e-commerce/shop/FilterBar';

// ----------------------------------------------------------------------

export default function EcommerceShop() {
  const { themeStretch } = useSettings();

  const [openFilter, setOpenFilter] = useState(false);
  const [products, setProducts] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState({
    priceMin: null,
    priceMax: null,
    address: '',
    typeOfRental: '',
    amenities: [],
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
    amenities: filters.amenities,
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
    values.amenities.length === 0;

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
      amenities: filters.amenities,
    };
    fetchProducts(filterParams);
  }, [filters, page, size, sortBy, sortDirection]);

  const handleSearch = (data) => {
    const { address, priceRange, typeOfRental } = data;
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
    setFilters({ ...filters, address, priceMin, priceMax, typeOfRental });
  };

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  const handleResetFilter = () => {
    reset();
    setFilters({
      priceMin: null,
      priceMax: null,
      address: '',
      typeOfRental: '',
      amenities: [],
    });
    handleCloseFilter();
  };

  const handleRemoveFilter = (key) => {
    setValue(key, defaultValues[key]);
    setFilters((prev) => ({ ...prev, [key]: defaultValues[key] }));
  };

  return (
    <Page title="Cho thuê">
      <Container maxWidth={themeStretch ? false : 'lg'} sx={{ mt: 15 }}>
        <HeaderBreadcrumbs
          heading="Cho thuê"
          links={[
            {
              name: 'Trang chủ',
              href: '/',
            },
            { name: 'Cho thuê' },
          ]}
        />

        <Stack direction='row' justifyContent='space-between'>
          <ShopProductSearch />
          <FilterBar onSearch={handleSearch} />
        </Stack>

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
    </Page >
  );
}
