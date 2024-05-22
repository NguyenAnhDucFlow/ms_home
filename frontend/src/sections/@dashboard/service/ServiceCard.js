import PropTypes from 'prop-types';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorderOutlined';
import BedIcon from '@mui/icons-material/BedOutlined';
import BathtubIcon from '@mui/icons-material/BathtubOutlined';
import SquareFootIcon from '@mui/icons-material/SquareFootOutlined';
import { Box, Card, Typography, Stack, IconButton, Divider } from '@mui/material';
import Image from '../../../components/Image';

ServiceCard.propTypes = {
  dataCart: PropTypes.object.isRequired,
};

export default function ServiceCard({ dataCart }) {


  const { name, image, price, address } = dataCart;

  return (
    <Card sx={{ maxWidth: 345, borderRadius: 1 }}>
      <Image alt={name} src={image} ratio="4/3" />
      <Stack spacing={1} sx={{ p: 2 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6" component="div" color="text.primary">
            {price} VND/tháng
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
          <Typography variant="caption" display="block">4 Phòng</Typography>
          <BathtubIcon color='action' />
          <Typography variant="caption" display="block">2 WC</Typography>
          <SquareFootIcon color='action' />
          <Typography variant="caption" display="block">68m²</Typography>
        </Box>
      </Stack>
    </Card>
  );
}
