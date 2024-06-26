// routes
import { PATH_PAGE } from '../../routes/paths';
// components
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const ICON_SIZE = {
  width: 22,
  height: 22,
};

const menuConfig = [
  {
    title: 'Về MsHome',
    icon: <Iconify icon={'eva:home-fill'} {...ICON_SIZE} />,
    path: PATH_PAGE.about,
  },
  {
    title: 'Cho thuê',
    icon: <Iconify icon={'eva:home-fill'} {...ICON_SIZE} />,
    path: 'chothue',
  },
  {
    title: 'Dịch vụ',
    icon: <Iconify icon={'eva:home-fill'} {...ICON_SIZE} />,
    path: 'dichvu',
  },
  {
    title: 'Hỗ trợ',
    icon: <Iconify icon={'eva:home-fill'} {...ICON_SIZE} />,
    path: PATH_PAGE.faqs
  },

];

export default menuConfig;
