import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorderOutlined';
import BedIcon from '@mui/icons-material/BedOutlined';
import BathtubIcon from '@mui/icons-material/BathtubOutlined';
import SquareFootIcon from '@mui/icons-material/SquareFootOutlined';
import { Box, Card, Typography, Stack, IconButton, Divider } from '@mui/material';
import Image from '../../../components/Image';

ServiceCard.propTypes = {
  dataCart: PropTypes.object.isRequired,
};
function formatCurrency(number) {
  return number.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
}

export default function ServiceCard({ dataCart }) {
  const { name, rooms, cover, price, address, dimensions, bathrooms, id } = dataCart;

  return (
    <Card component={RouterLink} to={`/property/${id}`} sx={{ maxWidth: 345, borderRadius: 1, textDecoration: 'none' }}>
      <Image alt={name} src={cover} ratio="4/3" />
      <Stack spacing={1} sx={{ p: 2 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6" component="div" color="text.primary">
            {formatCurrency(price)} /tháng
          </Typography>
          <IconButton size='small'>
            <FavoriteBorderIcon />
          </IconButton>
        </Box>
        <Typography variant="body2" align='left' color="text.secondary">
          {address}
        </Typography>
        <Divider sx={{ my: 1 }} />
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <BedIcon color='action' />
          <Typography variant="caption" display="block">{rooms} Phòng</Typography>
          <BathtubIcon color='action' />
          <Typography variant="caption" display="block">{bathrooms} WC</Typography>
          <SquareFootIcon color='action' />
          <Typography variant="caption" display="block">{dimensions}m²</Typography>
        </Box>
      </Stack>
    </Card>
  );
}
