import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import { useEffect, useState } from 'react';
import sortBy from 'lodash/sortBy';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { setPageTitle } from '../../store/themeConfigSlice';
import { useDispatch } from 'react-redux';
import IconBell from '../../components/Icon/IconBell';
import IconXCircle from '../../components/Icon/IconXCircle';
import IconPencil from '../../components/Icon/IconPencil';
import IconTrashLines from '../../components/Icon/IconTrashLines';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, MenuItem } from '@mui/material';
import { type IUser } from '../../model/user';
import { getUsers, getUserById, deleteUser, createUser } from '../../store/api/user';

const rowData = [
    {
        id: 1,
        name: 'Caroline',
        email: 'carolinejensen@zidant.com',
        branch: ' test',
    },
    {
        id: 2,
        name: 'Celeste',
        email: 'celestegrant@polarax.com',
        dob: '1989-11-19',
    },
    {
        id: 3,
        name: 'Tillman',
        email: 'tillmanforbes@manglo.com',
        branch: ' test',
    },
    {
        id: 4,
        name: 'Daisy',
        email: 'daisywhitley@applideck.com',
        branch: ' test',
    },
    {
        id: 5,
        name: 'Weber',
        email: 'weberbowman@volax.com',
    },
];

const UserTable = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setPageTitle('Multiple Tables'));
    }, [dispatch]);

    const PAGE_SIZES = [10, 20, 30, 50, 100];
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [users, setUsers] = useState(sortBy(rowData, 'name'));
    const [search, setSearch] = useState('');
    const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
        columnAccessor: 'name',
        direction: 'asc',
    });

    // Dialog state
    const [openAddDialog, setOpenAddDialog] = useState(false);
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [selectedUser, setSelectedUser] = useState<IUser>();

    // Form state
    const [formData, setFormData] = useState({ name: '', email: '', role: 'User' });

    useEffect(() => {
        setUsers(rowData.filter((item) => Object.values(item).some((value) => value.toString().toLowerCase().includes(search.toLowerCase()))));
    }, [search]);

    useEffect(() => {
        const sortedData = sortBy(users, sortStatus.columnAccessor);
        setUsers(sortStatus.direction === 'desc' ? sortedData.reverse() : sortedData);
    }, [sortStatus]);

    const handleAddUser = () => {
        // setUsers([...users, { ...formData, id: users.length + 1 }]);
        setOpenAddDialog(false);
    };

    const handleEditUser = () => {
        // setUsers(users.map((user) => (user.id === selectedUser.id ? { ...selectedUser, ...formData } : user)));
        setOpenEditDialog(false);
    };

    const handleDeleteUser = () => {
        // setUsers(users.filter((user) => user.id !== selectedUser.id));
        setOpenDeleteDialog(false);
    };

    return (
        <div>
            {/* Header with Add User Button */}
            <div className="flex justify-between items-center mb-10 mt-5">
                <h5 className="font-semibold text-lg">User Table</h5>
                <Button variant="contained" color="primary" startIcon={<IconXCircle />} onClick={() => setOpenAddDialog(true)}>
                    Add User
                </Button>
            </div>

            {/* Search Input */}
            {/* <div className="mb-3">
                <TextField fullWidth label="Search..." variant="outlined" value={search} onChange={(e) => setSearch(e.target.value)} />
            </div> */}

            {/* User Table */}
            <DataTable
                records={users}
                columns={[
                    { accessor: 'name', title: 'Name', sortable: false },
                    { accessor: 'email', title: 'Email', sortable: false },
                    { accessor: 'branch', title: 'branch', sortable: false },
                    { accessor: 'role', title: 'Role', sortable: false },
                    {
                        accessor: 'actions',
                        title: 'Actions',
                        render: (user) => (
                            <div className="flex gap-2">
                                <Tippy content="Edit">
                                    <button
                                        onClick={() => {
                                            setSelectedUser(user as any);
                                            setOpenEditDialog(true);
                                        }}
                                    >
                                        <IconPencil />
                                    </button>
                                </Tippy>
                                <Tippy content="Delete">
                                    <button
                                        onClick={() => {
                                            setSelectedUser(user as any);
                                            setOpenDeleteDialog(true);
                                        }}
                                    >
                                        <IconTrashLines />
                                    </button>
                                </Tippy>
                            </div>
                        ),
                    },
                ]}
                totalRecords={users.length}
                recordsPerPage={pageSize}
                page={page}
                onPageChange={setPage}
                recordsPerPageOptions={PAGE_SIZES}
                onRecordsPerPageChange={setPageSize}
                sortStatus={sortStatus}
                onSortStatusChange={setSortStatus}
            />

            {/* Add User Dialog */}
            <Dialog open={openAddDialog} onClose={() => setOpenAddDialog(false)}>
                <DialogTitle>Add User</DialogTitle>
                <DialogContent>
                    <TextField fullWidth label="Name" margin="dense" onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                    <TextField fullWidth label="Email" margin="dense" onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                    <TextField fullWidth select label="Role" margin="dense" value={formData.role} onChange={(e) => setFormData({ ...formData, role: e.target.value })}>
                        <MenuItem value="User">User</MenuItem>
                        <MenuItem value="Admin">Admin</MenuItem>
                    </TextField>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenAddDialog(false)}>Cancel</Button>
                    <Button variant="contained" color="primary" onClick={handleAddUser}>
                        Add
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Edit User Dialog */}
            <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
                <DialogTitle>Edit User</DialogTitle>
                <DialogContent>
                    <TextField fullWidth label="Name" margin="dense" defaultValue={selectedUser?.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                    <TextField fullWidth label="Email" margin="dense" defaultValue={selectedUser?.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                    <TextField fullWidth select label="Role" margin="dense" defaultValue={selectedUser?.role} onChange={(e) => setFormData({ ...formData, role: e.target.value })}>
                        <MenuItem value="User">User</MenuItem>
                        <MenuItem value="Admin">Admin</MenuItem>
                    </TextField>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenEditDialog(false)}>Cancel</Button>
                    <Button variant="contained" color="primary" onClick={handleEditUser}>
                        Save
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Delete Confirmation Dialog */}
            <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
                <DialogTitle>Confirm Delete</DialogTitle>
                <DialogContent>Are you sure you want to delete {selectedUser?.name}?</DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDeleteDialog(false)}>Cancel</Button>
                    <Button variant="contained" color="secondary" onClick={handleDeleteUser}>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default UserTable;
