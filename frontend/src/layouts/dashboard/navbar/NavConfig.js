// navConfig.js
import { PATH_DASHBOARD } from '../../../routes/paths';
import SvgIconStyle from '../../../components/SvgIconStyle';

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
  list: getIcon('ic_list'),
  listDate: getIcon('ic_date'),
  service: getIcon('ic_service')
};

const navConfig = [
  {
    items: [
      { title: 'MsHome', path: PATH_DASHBOARD.general.home, icon: ICONS.home, roles: ['ADMIN'] },
      { title: 'Đăng thông tin', path: PATH_DASHBOARD.general.new, icon: ICONS.create, roles: ['ADMIN', 'LANDLORD'] },
      { title: 'Danh sách bài đăng', path: PATH_DASHBOARD.general.list, icon: ICONS.list, roles: ['ADMIN', 'LANDLORD'] },
      { title: 'Danh sách lịch hẹn', path: PATH_DASHBOARD.general.listdate, icon: ICONS.listDate, roles: ['ADMIN'] },
      { title: 'Danh sách dịch vụ', path: PATH_DASHBOARD.general.service, icon: ICONS.service, roles: ['ADMIN'] },
      { title: 'Người dùng', path: PATH_DASHBOARD.user.list, icon: ICONS.user, roles: ['ADMIN'] },
      { title: 'Cài đặt', path: PATH_DASHBOARD.user.account, icon: ICONS.setting, roles: ['ADMIN'] },
    ],
  },
];

export default navConfig;
