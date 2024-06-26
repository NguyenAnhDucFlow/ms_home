// @mui
import { Stack, Button, Typography } from '@mui/material';

import { useNavigate } from 'react-router-dom';
// hooks
import useAuth from '../../../hooks/useAuth';

// routes
import { PATH_AUTH } from '../../../routes/paths';
// assets
import { DocIllustration } from '../../../assets';

// ----------------------------------------------------------------------

export default function NavbarDocs() {
  const { user, logout } = useAuth();

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate(PATH_AUTH.login, { replace: true });
  }

  return (
    <Stack
      spacing={3}
      sx={{ px: 5, pb: 5, mt: 10, width: 1, textAlign: 'center', display: 'block' }}
    >
      <DocIllustration sx={{ width: 1 }} />

      <div>
        <Typography gutterBottom variant="subtitle1">
          Hi, {user?.username}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Need help?
          <br /> Enjoy connecting with us
        </Typography>
      </div>

      <Button onClick={handleLogout} variant="contained">
        Logout
      </Button>
    </Stack>
  );
}
