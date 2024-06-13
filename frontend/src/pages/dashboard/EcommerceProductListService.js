import { paramCase } from 'change-case';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
    { id: 'serviceId', label: 'Mã Dịch Vụ', align: 'left' },
    { id: 'serviceName', label: 'Tên Dịch Vụ', align: 'left' },
    { id: 'name', label: 'Tên Khách Hàng', align: 'left' },
    { id: 'phone', label: 'Số Điện Thoại', align: 'left' },
    { id: '' },
];

// ----------------------------------------------------------------------

export default function EcommerceProductListService() {
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
        defaultOrderBy: 'startTime',
    });

    const { themeStretch } = useSettings();

    const navigate = useNavigate();

    const [services, setServices] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [tableData, setTableData] = useState([]);
    const [filterName, setFilterName] = useState('');
    const [selectedService, setSelectedService] = useState(null);
    const [isDetailOpen, setIsDetailOpen] = useState(false);

    useEffect(() => {
        async function fetchServices() {
            try {
                const response = await axios.get('/api/services/list');
                setServices(response.data);
                setIsLoading(false);
            } catch (error) {
                console.error('Failed to fetch services:', error);
                setIsLoading(false);
            }
        }

        fetchServices();
    }, []);

    useEffect(() => {
        if (services.length) {
            setTableData(services);
        }
    }, [services]);

    const handleFilterName = (filterName) => {
        setFilterName(filterName);
        setPage(0);
    };

    const handleDeleteRow = (id) => {
        const deleteRow = tableData.filter((row) => row.serviceId !== id);
        setSelected([]);
        setTableData(deleteRow);
    };

    const handleDeleteRows = (selected) => {
        const deleteRows = tableData.filter((row) => !selected.includes(row.serviceId));
        setSelected([]);
        setTableData(deleteRows);
    };

    const handleEditRow = (id) => {
        navigate(PATH_DASHBOARD.eCommerce.edit(paramCase(id)));
    };

    const handleRowClick = (service) => {
        setSelectedService(service);
        setIsDetailOpen(true);
    };

    const handleCloseDetail = () => {
        setIsDetailOpen(false);
        setSelectedService(null);
    };

    const dataFiltered = applySortFilter({
        tableData,
        comparator: getComparator(order, orderBy),
        filterName,
    });

    const denseHeight = dense ? 60 : 80;

    const isNotFound = (!dataFiltered.length && !!filterName) || (!isLoading && !dataFiltered.length);

    return (
        <Page title="Thương Mại Điện Tử: Danh Sách Dịch Vụ">
            <Container maxWidth={themeStretch ? false : 'lg'}>
                <HeaderBreadcrumbs
                    heading="Danh Sách Dịch Vụ"
                    links={[
                        { name: 'Bảng Điều Khiển', href: PATH_DASHBOARD.root },
                        {
                            name: 'Thương Mại Điện Tử',
                            href: PATH_DASHBOARD.eCommerce.root,
                        },
                        { name: 'Danh Sách Dịch Vụ' },
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
                                            tableData.map((row) => row.serviceId)
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
                                            tableData.map((row) => row.serviceId)
                                        )
                                    }
                                />

                                <TableBody>
                                    {(isLoading ? [...Array(rowsPerPage)] : dataFiltered)
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((row, index) =>
                                            row ? (
                                                <ProductTableRow
                                                    key={row.serviceId}
                                                    row={row}
                                                    selected={selected.includes(row.serviceId)}
                                                    onSelectRow={() => onSelectRow(row.serviceId)}
                                                    onDeleteRow={() => handleDeleteRow(row.serviceId)}
                                                    onEditRow={() => handleEditRow(row.serviceId)}
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

                <ServiceDetail
                    service={selectedService}
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
        tableData = tableData.filter((item) => item.serviceName.toLowerCase().indexOf(filterName.toLowerCase()) !== -1);
    }

    return tableData;
}

// ----------------------------------------------------------------------

function ServiceDetail({ service, open, onClose }) {
    if (!service) return null;

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle>Service Details</DialogTitle>
            <DialogContent>
                <Card variant="outlined" sx={{ mb: 3 }}>
                    <CardContent>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="subtitle1" gutterBottom>
                                    Service ID:
                                </Typography>
                                <Typography variant="body2">{service.serviceId}</Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="subtitle1" gutterBottom>
                                    Service Name:
                                </Typography>
                                <Typography variant="body2">{service.serviceName}</Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="subtitle1" gutterBottom>
                                    Customer Name:
                                </Typography>
                                <Typography variant="body2">{service.name}</Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="subtitle1" gutterBottom>
                                    Phone:
                                </Typography>
                                <Typography variant="body2">{service.phone}</Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="subtitle1" gutterBottom>
                                    Start Address:
                                </Typography>
                                <Typography variant="body2">{service.startAddress}</Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="subtitle1" gutterBottom>
                                    End Address:
                                </Typography>
                                <Typography variant="body2">{service.endAddress}</Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="subtitle1" gutterBottom>
                                    Start Time:
                                </Typography>
                                <Typography variant="body2">{service.startTime}</Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="subtitle1" gutterBottom>
                                    End Time:
                                </Typography>
                                <Typography variant="body2">{service.endTime}</Typography>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Typography variant="subtitle1" gutterBottom>
                                    Area:
                                </Typography>
                                <Typography variant="body2">{service.area}</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="subtitle1" gutterBottom>
                                    Notes:
                                </Typography>
                                <Typography variant="body2">{service.notes}</Typography>
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

ServiceDetail.propTypes = {
    service: PropTypes.object,
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
    const { serviceId, serviceName, provider, name, phone, startAddress, endAddress } = row;
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
            <TableCell align="left">{serviceId}</TableCell>
            <TableCell align="left">{serviceName}</TableCell>
            <TableCell align="left">{name}</TableCell>
            <TableCell align="left">{phone}</TableCell>
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
