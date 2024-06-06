import PropTypes from 'prop-types';
import { sentenceCase } from 'change-case';
import { useTheme, styled } from '@mui/material/styles';
import { Box, Stack, Typography, Divider } from '@mui/material';
// components
import Label from '../../../../components/Label';
import Iconify from '../../../../components/Iconify';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(3),
  [theme.breakpoints.up(1368)]: {
    padding: theme.spacing(5, 8),
  },
}));

// ----------------------------------------------------------------------

ProductDetailsSummary.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    price: PropTypes.number,
    cover: PropTypes.string,
    status: PropTypes.string,
    address: PropTypes.string,
    propertyType: PropTypes.string,
    amenities: PropTypes.arrayOf(PropTypes.string),
    rooms: PropTypes.number,
    bathrooms: PropTypes.number,
    dimensions: PropTypes.string,
  }),
};

export default function ProductDetailsSummary({ product, ...other }) {
  const theme = useTheme();

  const {
    title,
    description,
    price,
    cover,
    status,
    address,
    propertyType,
    amenities,
    rooms,
    bathrooms,
    dimensions,
  } = product;

  return (
    <RootStyle {...other}>
      <Label
        variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
        color={status === 'AVAILABLE' ? 'success' : 'error'}
        sx={{ textTransform: 'uppercase' }}
      >
        {sentenceCase(status || '')}
      </Label>

      <Typography variant="overline" sx={{ mt: 2, mb: 1, display: 'block', color: 'info.main' }}>
        {propertyType}
      </Typography>

      <Typography variant="h5" paragraph>
        {title}
      </Typography>

      <Typography variant="h4" sx={{ mb: 3 }}>
        {price} / month
      </Typography>

      <Typography variant="body1" sx={{ mb: 3 }}>
        {address}
      </Typography>

      <Typography variant="body2" sx={{ mb: 3 }}>
        {description}
      </Typography>

      <Divider sx={{ borderStyle: 'dashed' }} />

      <Stack direction="row" spacing={2} sx={{ my: 3 }}>
        <Iconify icon="eva:home-outline" width={24} height={24} />
        <Typography variant="subtitle1">{rooms} Rooms</Typography>
      </Stack>

      <Stack direction="row" spacing={2} sx={{ my: 3 }}>
        <Iconify icon="eva:droplet-outline" width={24} height={24} />
        <Typography variant="subtitle1">{bathrooms} Bathrooms</Typography>
      </Stack>

      <Stack direction="row" spacing={2} sx={{ my: 3 }}>
        <Iconify icon="eva:expand-outline" width={24} height={24} />
        <Typography variant="subtitle1">{dimensions} sqm</Typography>
      </Stack>

      <Divider sx={{ borderStyle: 'dashed' }} />

      <Typography variant="subtitle1" sx={{ mt: 3, mb: 1 }}>
        Amenities
      </Typography>
      <Stack spacing={1}>
        {amenities.map((amenity) => (
          <Stack key={amenity} direction="row" spacing={1} alignItems="center">
            <Iconify icon="eva:checkmark-circle-2-outline" width={20} height={20} />
            <Typography variant="body2">{amenity}</Typography>
          </Stack>
        ))}
      </Stack>
    </RootStyle>
  );
}
