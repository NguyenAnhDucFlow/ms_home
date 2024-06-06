// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import SvgIconStyle from '../../../components/SvgIconStyle';

// ----------------------------------------------------------------------

const getIcon = (name) => <SvgIconStyle src={`/icons/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const ICONS = {
  blog: getIcon('ic_blog'),
  cart: getIcon('ic_cart'),
  user: getIcon('ic_user'),
  ecommerce: getIcon('ic_ecommerce'),
  analytics: getIcon('ic_analytics'),
  home: getIcon('ic_home'),
  create: getIcon('ic_create'),
  setting: getIcon('ic_setting'),
  list: getIcon('ic_list')
};

const navConfig = [
  {
    items: [
      { title: 'MsHome', path: PATH_DASHBOARD.general.home, icon: ICONS.home },
      { title: 'Đăng thông tin', path: PATH_DASHBOARD.general.new, icon: ICONS.create },
      { title: 'Danh sách bài đăng', path: PATH_DASHBOARD.general.list, icon: ICONS.list },
      { title: 'Người dùng', path: PATH_DASHBOARD.user.list, icon: ICONS.user },
      { title: 'Cài đặt', path: PATH_DASHBOARD.user.account, icon: ICONS.setting },
    ],
  },

];

export default navConfig;
