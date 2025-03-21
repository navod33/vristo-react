import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { setPageTitle } from '../../../store/themeConfigSlice';
import { Button, TextField, FormControlLabel, Switch } from '@mui/material';
import { getRoles, getPermissions, createRole, updateRole, getRoleById } from '../../../store/api/role';

const UserRole = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams(); // Get ID from URL params

    const [roleName, setRoleName] = useState('');
    const [selectedPermissions, setSelectedPermissions] = useState<number[]>([]);
    const [permissions, setPermissions] = useState<any[]>([]);
    const [isEditMode, setIsEditMode] = useState(false);

    const token = localStorage.getItem('token');

    useEffect(() => {
        dispatch(setPageTitle(id ? 'Edit Role' : 'Create Role'));

        fetchPermissions();
        if (id) {
            fetchRoleById(id as any);
            setIsEditMode(true);
        }
    }, [dispatch, id]);

    const fetchPermissions = async () => {
        try {
            if (!token) return console.error('No auth token found');
            const response = await getPermissions(token);
            setPermissions(response);
        } catch (error) {
            console.error('Failed to fetch permissions:', error);
        }
    };

    const fetchRoleById = async (roleId: number) => {
        try {
            if (!token) return console.error('No auth token found');
            const response = await getRoleById(roleId, token);

            setRoleName(response.name);
            setSelectedPermissions(response.permissions.map((p: any) => p.id));
        } catch (error) {
            console.error('Failed to fetch role:', error);
        }
    };

    const handlePermissionChange = (permissionId: number) => {
        setSelectedPermissions((prev) => (prev.includes(permissionId) ? prev.filter((p) => p !== permissionId) : [...prev, permissionId]));
    };

    const handleSubmit = async () => {
        if (!roleName || selectedPermissions.length === 0) {
            return alert('Please enter a role name and select at least one permission.');
        }

        try {
            if (isEditMode && id) {
                await updateRole(
                    id as any,
                    {
                        name: roleName,
                        permissions: selectedPermissions,
                    },
                    token as string
                );
            } else {
                await createRole(
                    {
                        name: roleName,
                        permissions: selectedPermissions,
                    },
                    token
                );
            }

            navigate(-1); // Go back after successful operation
        } catch (error) {
            console.error(`Error ${isEditMode ? 'updating' : 'creating'} role:`, error);
        }
    };

    return (
        <div>
            <div className="p-5 bg-white rounded-lg shadow-md">
                <div className="flex justify-between items-center mb-10 mt-5">
                    <h5 className="font-semibold text-lg">{isEditMode ? 'Edit Role' : 'Create Role'}</h5>
                </div>

                {/* Role Name Input */}
                <TextField label="Role Name" variant="outlined" fullWidth value={roleName} onChange={(e) => setRoleName(e.target.value)} className="mb-4" />

                {/* Permissions List */}
                <div className="grid grid-cols-3 gap-4 mb-4 mt-7">
                    {permissions.map((perm) => (
                        <FormControlLabel key={perm.id} control={<Switch checked={selectedPermissions.includes(perm.id)} onChange={() => handlePermissionChange(perm.id)} />} label={perm.name} />
                    ))}
                </div>

                {/* Submit Button */}
                <Button variant="contained" color="primary" onClick={handleSubmit}>
                    {isEditMode ? 'Update' : 'Create'}
                </Button>
            </div>
        </div>
    );
};

export default UserRole;
