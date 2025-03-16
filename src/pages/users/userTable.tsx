import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import { useEffect, useState } from 'react';
import sortBy from 'lodash/sortBy';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { setPageTitle } from '../../store/themeConfigSlice';
import { useDispatch } from 'react-redux';
import IconPencil from '../../components/Icon/IconPencil';
import IconTrashLines from '../../components/Icon/IconTrashLines';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, MenuItem } from '@mui/material';
import { IUser } from '../../model/user';
import { getUsers, getUserById, deleteUser, createUser, updateUser } from '../../store/api/user';
import { getRoles } from '../../store/api/role';

const UserTable = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('User Management'));
        fetchUsers();
        fetchRoles();
    }, [dispatch]);

    const PAGE_SIZES = [10, 20, 30, 50, 100];
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [users, setUsers] = useState<any[]>([]);
    const [roles, setRoles] = useState<any[]>([]);
    const [search, setSearch] = useState('');
    const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({ columnAccessor: 'name', direction: 'asc' });

    console.log('roles', roles);

    // Dialog states
    const [openAddDialog, setOpenAddDialog] = useState(false);
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [selectedUser, setSelectedUser] = useState<IUser | null>(null);
    const [formData, setFormData] = useState({ name: '', email: '', role: '' });

    // Fetch authentication token
    const token = localStorage.getItem('token');

    // Fetch users from API
    const fetchUsers = async () => {
        try {
            if (!token) return console.error('No auth token found');
            const response = await getUsers(token);
            setUsers(sortBy(response, 'name'));
        } catch (error) {
            console.error('Failed to fetch users:', error);
        }
    };

    // Fetch roles from API
    const fetchRoles = async () => {
        try {
            if (!token) return console.error('No auth token found');
            const response = await getRoles(token);
            setRoles(response);
        } catch (error) {
            console.error('Failed to fetch roles:', error);
        }
    };

    useEffect(() => {
        const filteredUsers = users.filter((user) => Object.values(user).some((value) => value?.toString().toLowerCase().includes(search.toLowerCase())));
        setUsers(filteredUsers);
    }, [search]);

    useEffect(() => {
        const sortedData = sortBy(users, sortStatus.columnAccessor);
        setUsers(sortStatus.direction === 'desc' ? sortedData.reverse() : sortedData);
    }, [sortStatus]);

    const handleAddUser = async () => {
        try {
            if (!token) return console.error('No auth token found');
            await createUser(token, formData);
            fetchUsers();
            setOpenAddDialog(false);
        } catch (error) {
            console.error('Error adding user:', error);
        }
    };

    const handleEditUser = async () => {
        if (!selectedUser) return;
        try {
            if (!token) return console.error('No auth token found');
            await updateUser(token, selectedUser.id, formData);
            fetchUsers();
            setOpenEditDialog(false);
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    const handleDeleteUser = async () => {
        if (!selectedUser) return;
        try {
            if (!token) return console.error('No auth token found');
            await deleteUser(token, selectedUser.id);
            fetchUsers();
            setOpenDeleteDialog(false);
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    const handleOpenEditDialog = (user: IUser) => {
        setSelectedUser(user);
        setFormData({ name: user.name, email: user.email, role: user.role });
        setOpenEditDialog(true);
    };

    const handleOpenDeleteDialog = (user: IUser) => {
        setSelectedUser(user);
        setOpenDeleteDialog(true);
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-10 mt-5">
                <h5 className="font-semibold text-lg">User Table</h5>
                <Button variant="contained" color="primary" onClick={() => setOpenAddDialog(true)}>
                    Add User
                </Button>
            </div>

            <DataTable
                records={users}
                columns={[
                    { accessor: 'name', title: 'Name' },
                    { accessor: 'email', title: 'Email' },
                    { accessor: 'branch.internal_name', title: 'Branch' },
                    { accessor: 'role', title: 'Role' },
                    {
                        accessor: 'actions',
                        title: 'Actions',
                        render: (user) => (
                            <div className="flex gap-2">
                                <Tippy content="Edit">
                                    <button onClick={() => handleOpenEditDialog(user as any)}>
                                        <IconPencil />
                                    </button>
                                </Tippy>
                                <Tippy content="Delete">
                                    <button onClick={() => handleOpenDeleteDialog(user as any)}>
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
                        {roles.map((role) => (
                            <MenuItem key={role.id} value={role.name}>
                                {role.name}
                            </MenuItem>
                        ))}
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
                    <TextField fullWidth label="Name" margin="dense" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                    <TextField fullWidth label="Email" margin="dense" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                    <TextField fullWidth select label="Role" margin="dense" value={formData.role} onChange={(e) => setFormData({ ...formData, role: e.target.value })}>
                        {roles.map((role) => (
                            <MenuItem key={role.id} value={role.name}>
                                {role.name}
                            </MenuItem>
                        ))}
                    </TextField>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenEditDialog(false)}>Cancel</Button>
                    <Button variant="contained" color="primary" onClick={handleEditUser}>
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default UserTable;
