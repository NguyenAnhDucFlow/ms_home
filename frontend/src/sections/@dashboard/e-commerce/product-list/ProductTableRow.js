import PropTypes from 'prop-types';
import { useState } from 'react';
import { useTheme, styled } from '@mui/material/styles';
import { TableRow, Checkbox, TableCell, Typography, MenuItem, Dialog, DialogTitle, DialogActions, Button } from '@mui/material';
import { useSnackbar } from 'notistack';
import Label from '../../../../components/Label';
import Image from '../../../../components/Image';
import Iconify from '../../../../components/Iconify';
import { TableMoreMenu } from '../../../../components/table';
import useAuth from '../../../../hooks/useAuth';
import axios from '../../../../utils/axios';

// Styled components for the dialog
const StyledDialogTitle = styled(DialogTitle)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

const StyledDialogActions = styled(DialogActions)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderTop: `1px solid ${theme.palette.divider}`,
}));

ProductTableRow.propTypes = {
  row: PropTypes.object,
  selected: PropTypes.bool,
  onEditRow: PropTypes.func,
  onSelectRow: PropTypes.func,
  onDeleteRow: PropTypes.func,
  onStatusChange: PropTypes.func,
};

export default function ProductTableRow({ row, selected, onEditRow, onSelectRow, onDeleteRow, onStatusChange }) {
  const theme = useTheme();
  const { user } = useAuth();
  const { enqueueSnackbar } = useSnackbar();

  const { id, title, cover, fullName, typeOfRental, price, verificationStatus } = row;

  const [openMenu, setOpenMenuActions] = useState(null);
  const [openStatusDialog, setOpenStatusDialog] = useState(false);

  const handleOpenMenu = (event) => {
    setOpenMenuActions(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpenMenuActions(null);
  };

  const handleOpenStatusDialog = () => {
    setOpenStatusDialog(true);
    handleCloseMenu();
  };

  const handleCloseStatusDialog = () => {
    setOpenStatusDialog(false);
  };

  const handleChangeStatus = async (newStatus) => {
    try {
      const response = await axios.put(`/api/listings/${id}/status`, {
        status: newStatus,
      });
      enqueueSnackbar('Update success!');
      onStatusChange(id, newStatus);
    } catch (error) {
      console.error('Failed to change status:', error);
    } finally {
      handleCloseStatusDialog();
    }
  };

  return (
    <>
      <TableRow hover selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox checked={selected} onClick={onSelectRow} />
        </TableCell>

        <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
          <Image disabledEffect alt={title} src={cover} sx={{ borderRadius: 1.5, width: 48, height: 48, mr: 2 }} />
          <Typography variant="subtitle2" noWrap>
            {title}
          </Typography>
        </TableCell>

        <TableCell>{typeOfRental}</TableCell>

        <TableCell align="right">{price}</TableCell>

        <TableCell align="center">
          <Label
            variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
            color={verificationStatus === 'VERIFIED' ? 'success' : 'error'}
            sx={{ textTransform: 'capitalize' }}
          >
            {verificationStatus}
          </Label>
        </TableCell>

        <TableCell align="right">
          <TableMoreMenu
            open={openMenu}
            onOpen={handleOpenMenu}
            onClose={handleCloseMenu}
            actions={
              <>
                <MenuItem
                  onClick={() => {
                    onDeleteRow();
                    handleCloseMenu();
                  }}
                  sx={{ color: 'error.main' }}
                >
                  <Iconify icon={'eva:trash-2-outline'} />
                  Delete
                </MenuItem>
                {user.role === 'ADMIN' ? (
                  <MenuItem onClick={handleOpenStatusDialog}>
                    <Iconify icon={'eva:edit-fill'} />
                    Change Status
                  </MenuItem>
                ) : (
                  <MenuItem
                    onClick={() => {
                      onEditRow();
                      handleCloseMenu();
                    }}
                  >
                    <Iconify icon={'eva:edit-fill'} />
                    Edit
                  </MenuItem>
                )}
              </>
            }
          />
        </TableCell>
      </TableRow>

      <Dialog open={openStatusDialog} onClose={handleCloseStatusDialog}>
        <StyledDialogTitle>Change Status</StyledDialogTitle>
        <StyledDialogActions>
          <Button onClick={() => handleChangeStatus('VERIFIED')} color="success" variant="contained">
            VERIFIED
          </Button>
          <Button onClick={() => handleChangeStatus('REJECTED')} color="error" variant="contained">
            REJECTED
          </Button>
        </StyledDialogActions>
      </Dialog>
    </>
  );
}
