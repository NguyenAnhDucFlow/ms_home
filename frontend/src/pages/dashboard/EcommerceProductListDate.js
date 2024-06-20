import { paramCase } from 'change-case';
import { useState, useEffect } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
// @mui
import { useTheme } from '@mui/material/styles';
import {
    TableRow, Checkbox, TableCell, MenuItem,
    Box,
    Grid,
    CardContent,
    Card,
    Table,
    Button,
    Switch,
    Tooltip,
    TableBody,
    Container,
    IconButton,
    TableContainer,
    TablePagination,
    FormControlLabel,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Typography,
} from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
import useTable, { getComparator, emptyRows } from '../../hooks/useTable';
// components
import axios from '../../utils/axios';
import Page from '../../components/Page';
import Iconify from '../../components/Iconify';
import Scrollbar from '../../components/Scrollbar';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import {
    TableNoData,
    TableSkeleton,
    TableEmptyRows,
    TableHeadCustom,
    TableSelectedActions,
    TableMoreMenu,
} from '../../components/table';
// sections
import { ProductTableToolbar } from '../../sections/@dashboard/e-commerce/product-list';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
    { id: 'appointmentId', label: 'Mã Lịch Hẹn', align: 'left' },
    { id: 'propertyListing', label: 'Danh Sách Bất Động Sản', align: 'left' },
    { id: 'landlord', label: 'Chủ Nhà', align: 'left' },
    { id: 'appointmentTime', label: 'Thời Gian Hẹn', align: 'left' },
    { id: '' },
];

// ----------------------------------------------------------------------

export default function EcommerceProductListDate() {
    const {
        dense,
        page,
        order,
        orderBy,
        rowsPerPage,
        setPage,
        //
        selected,
        setSelected,
        onSelectRow,
        onSelectAllRows,
        //
        onSort,
        onChangeDense,
        onChangePage,
        onChangeRowsPerPage,
    } = useTable({
        defaultOrderBy: 'appointmentTime',
    });

    const { themeStretch } = useSettings();

    const navigate = useNavigate();

    const [appointments, setAppointments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [tableData, setTableData] = useState([]);
    const [filterName, setFilterName] = useState('');
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const [isDetailOpen, setIsDetailOpen] = useState(false);

    useEffect(() => {
        async function fetchAppointments() {
            try {
                const response = await axios.get('/api/appointments');
                console.log("sssssssss", response.data)
                setAppointments(response.data);
                setIsLoading(false);
            } catch (error) {
                console.error('Failed to fetch viewing appointments:', error);
                setIsLoading(false);
            }
        }

        fetchAppointments();
    }, []);

    useEffect(() => {
        if (appointments.length) {
            setTableData(appointments);
        }
    }, [appointments]);

    const handleFilterName = (filterName) => {
        setFilterName(filterName);
        setPage(0);
    };

    const handleDeleteRow = (id) => {
        const deleteRow = tableData.filter((row) => row.appointmentId !== id);
        setSelected([]);
        setTableData(deleteRow);
    };

    const handleDeleteRows = (selected) => {
        const deleteRows = tableData.filter((row) => !selected.includes(row.appointmentId));
        setSelected([]);
        setTableData(deleteRows);
    };

    const handleEditRow = (id) => {
        navigate(PATH_DASHBOARD.eCommerce.edit(paramCase(id)));
    };

    const handleRowClick = (appointment) => {
        setSelectedAppointment(appointment);
        setIsDetailOpen(true);
    };

    const handleCloseDetail = () => {
        setIsDetailOpen(false);
        setSelectedAppointment(null);
    };

    const dataFiltered = applySortFilter({
        tableData,
        comparator: getComparator(order, orderBy),
        filterName,
    });

    const denseHeight = dense ? 60 : 80;

    const isNotFound = (!dataFiltered.length && !!filterName) || (!isLoading && !dataFiltered.length);

    return (
        <Page title="Thương Mại Điện Tử: Danh Sách Lịch Xem">
            <Container maxWidth={themeStretch ? false : 'lg'}>
                <HeaderBreadcrumbs
                    heading="Danh Sách Lịch Xem"
                    links={[
                        { name: 'Dashboard', href: PATH_DASHBOARD.root },
                        { name: 'Danh Sách Lịch Xem' },
                    ]}

                />

                <Card>
                    <ProductTableToolbar filterName={filterName} onFilterName={handleFilterName} />

                    <Scrollbar>
                        <TableContainer sx={{ minWidth: 800 }}>
                            {selected.length > 0 && (
                                <TableSelectedActions
                                    dense={dense}
                                    numSelected={selected.length}
                                    rowCount={tableData.length}
                                    onSelectAllRows={(checked) =>
                                        onSelectAllRows(
                                            checked,
                                            tableData.map((row) => row.appointmentId)
                                        )
                                    }
                                    actions={
                                        <Tooltip title="Delete">
                                            <IconButton color="primary" onClick={() => handleDeleteRows(selected)}>
                                                <Iconify icon={'eva:trash-2-outline'} />
                                            </IconButton>
                                        </Tooltip>
                                    }
                                />
                            )}

                            <Table size={dense ? 'small' : 'medium'}>
                                <TableHeadCustom
                                    order={order}
                                    orderBy={orderBy}
                                    headLabel={TABLE_HEAD}
                                    rowCount={tableData.length}
                                    numSelected={selected.length}
                                    onSort={onSort}
                                    onSelectAllRows={(checked) =>
                                        onSelectAllRows(
                                            checked,
                                            tableData.map((row) => row.appointmentId)
                                        )
                                    }
                                />

                                <TableBody>
                                    {(isLoading ? [...Array(rowsPerPage)] : dataFiltered)
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((row, index) =>
                                            row ? (
                                                <ProductTableRow
                                                    key={row.appointmentId}
                                                    row={row}
                                                    selected={selected.includes(row.appointmentId)}
                                                    onSelectRow={() => onSelectRow(row.appointmentId)}
                                                    onDeleteRow={() => handleDeleteRow(row.appointmentId)}
                                                    onEditRow={() => handleEditRow(row.appointmentId)}
                                                    onRowClick={() => handleRowClick(row)}
                                                />
                                            ) : (
                                                !isNotFound && <TableSkeleton key={index} sx={{ height: denseHeight }} />
                                            )
                                        )}

                                    <TableEmptyRows height={denseHeight} emptyRows={emptyRows(page, rowsPerPage, tableData.length)} />

                                    <TableNoData isNotFound={isNotFound} />
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Scrollbar>

                    <Box sx={{ position: 'relative' }}>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25]}
                            component="div"
                            count={dataFiltered.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={onChangePage}
                            onRowsPerPageChange={onChangeRowsPerPage}
                        />

                        <FormControlLabel
                            control={<Switch checked={dense} onChange={onChangeDense} />}
                            label="Dense"
                            sx={{ px: 3, py: 1.5, top: 0, position: { md: 'absolute' } }}
                        />
                    </Box>
                </Card>

                <AppointmentDetail
                    appointment={selectedAppointment}
                    open={isDetailOpen}
                    onClose={handleCloseDetail}
                />
            </Container>
        </Page>
    );
}

// ----------------------------------------------------------------------

function applySortFilter({ tableData, comparator, filterName }) {
    const stabilizedThis = tableData.map((el, index) => [el, index]);

    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });

    tableData = stabilizedThis.map((el) => el[0]);

    if (filterName) {
        tableData = tableData.filter((item) => item.propertyListing.title.toLowerCase().indexOf(filterName.toLowerCase()) !== -1);
    }

    return tableData;
}

// ----------------------------------------------------------------------


function AppointmentDetail({ appointment, open, onClose }) {
    if (!appointment) return null;

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle>Appointment Details</DialogTitle>
            <DialogContent>
                <Card variant="outlined" sx={{ mb: 3 }}>
                    <CardContent>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="subtitle1" gutterBottom>
                                    Appointment ID:
                                </Typography>
                                <Typography variant="body2">{appointment.appointmentId}</Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="subtitle1" gutterBottom>
                                    Property Listing:
                                </Typography>
                                <Typography variant="body2">{appointment.propertyListing.title}</Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="subtitle1" gutterBottom>
                                    Landlord:
                                </Typography>
                                <Typography variant="body2">{appointment.landlord.username}</Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="subtitle1" gutterBottom>
                                    Student:
                                </Typography>
                                <Typography variant="body2">{appointment.student.username}</Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="subtitle1" gutterBottom>
                                    Appointment Time:
                                </Typography>
                                <Typography variant="body2">{new Date(appointment.appointmentTime).toLocaleString()}</Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="subtitle1" gutterBottom>
                                    Status:
                                </Typography>
                                <Typography variant="body2">{appointment.status}</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="subtitle1" gutterBottom>
                                    Feedback:
                                </Typography>
                                <Typography variant="body2">{appointment.feedback}</Typography>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Close</Button>
            </DialogActions>
        </Dialog>
    );
}

AppointmentDetail.propTypes = {
    appointment: PropTypes.object,
    open: PropTypes.bool,
    onClose: PropTypes.func,
};





ProductTableRow.propTypes = {
    row: PropTypes.object,
    selected: PropTypes.bool,
    onEditRow: PropTypes.func,
    onSelectRow: PropTypes.func,
    onDeleteRow: PropTypes.func,
    onRowClick: PropTypes.func,
};

function ProductTableRow({ row, selected, onEditRow, onSelectRow, onDeleteRow, onRowClick }) {
    const theme = useTheme();
    const { appointmentId, propertyListing, landlord, appointmentTime, status, feedback } = row;
    const [openMenu, setOpenMenuActions] = useState(null);

    const handleOpenMenu = (event) => {
        setOpenMenuActions(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setOpenMenuActions(null);
    };

    return (
        <TableRow hover selected={selected} onClick={onRowClick}>
            <TableCell padding="checkbox">
                <Checkbox checked={selected} onChange={onSelectRow} />
            </TableCell>
            <TableCell align="left">{appointmentId}</TableCell>
            <TableCell align="left">{propertyListing?.title || 'N/A'}</TableCell>
            <TableCell align="left">{landlord?.username || 'N/A'}</TableCell>
            <TableCell align="left">{new Date(appointmentTime).toLocaleString()}</TableCell>
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
                            <MenuItem
                                onClick={() => {
                                    onEditRow();
                                    handleCloseMenu();
                                }}
                            >
                                <Iconify icon={'eva:edit-fill'} />
                                Edit
                            </MenuItem>
                        </>
                    }
                />
            </TableCell>
        </TableRow>
    );
}