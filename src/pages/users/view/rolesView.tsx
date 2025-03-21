import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setPageTitle } from '../../../store/themeConfigSlice';
import { Card, CardContent, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import IconPencil from '../../../components/Icon/IconPencil';
import IconTrashLines from '../../../components/Icon/IconTrashLines';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { updateRole, deleteRole, getRoles } from '../../../store/api/role';

const PAGE_SIZES = [5, 10, 20];

const RolesView = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [roles, setRoles] = useState<any[]>([]);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({ columnAccessor: 'name', direction: 'asc' });
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [selectedRole, setSelectedRole] = useState<any>(null);
    const token = localStorage.getItem('token');

    useEffect(() => {
        dispatch(setPageTitle('Roles List'));
        fetchRoles();
    }, [dispatch]);

    const fetchRoles = async () => {
        try {
            if (!token) return console.error('No auth token found');
            const response = await getRoles(token);
            setRoles(response);
        } catch (error) {
            console.error('Failed to fetch roles:', error);
        }
    };

    const handleEditRole = (roleId: string) => {
        navigate(`/user-roles/edit/${roleId}`);
    };

    const handleDeleteRole = async () => {
        try {
            if (!selectedRole || !token) return;
            await deleteRole(selectedRole.id, token);
            setDeleteDialogOpen(false);
            fetchRoles(); // Refresh the roles list
        } catch (error) {
            console.error('Error deleting role:', error);
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-10 mt-5">
                <h5 className="font-semibold text-lg">Roles List</h5>
                <Button variant="contained" color="primary" onClick={() => navigate('create')}>
                    Add User
                </Button>
            </div>

            <DataTable
                records={roles}
                columns={[
                    { accessor: 'name', title: 'Name' },
                    // { accessor: 'email', title: 'Email' },
                    {
                        accessor: 'actions',
                        title: 'Actions',
                        render: (role) => (
                            <div className="flex gap-5">
                                <Tippy content="Edit">
                                    <button onClick={() => handleEditRole(role.id as string)}>
                                        <IconPencil />
                                    </button>
                                </Tippy>
                                <Tippy content="Delete">
                                    <button
                                        onClick={() => {
                                            setSelectedRole(role);
                                            setDeleteDialogOpen(true);
                                        }}
                                    >
                                        <IconTrashLines />
                                    </button>
                                </Tippy>
                            </div>
                        ),
                    },
                ]}
                totalRecords={roles.length}
                recordsPerPage={pageSize}
                page={page}
                onPageChange={setPage}
                recordsPerPageOptions={PAGE_SIZES}
                onRecordsPerPageChange={setPageSize}
                sortStatus={sortStatus}
                onSortStatusChange={setSortStatus}
            />

            {/* Delete Confirmation Modal */}
            <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
                <DialogTitle>Confirm Delete</DialogTitle>
                <DialogContent>Are you sure you want to delete this role?</DialogContent>
                <DialogActions>
                    <Button onClick={() => setDeleteDialogOpen(false)} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={handleDeleteRole} color="error">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default RolesView;
