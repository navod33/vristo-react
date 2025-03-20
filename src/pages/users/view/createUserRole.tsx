import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../../store/themeConfigSlice';
import { Button, TextField, FormControlLabel, Switch } from '@mui/material';
import { getRoles, getPermissions, createRole } from '../../../store/api/role';

const UserRole = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('User Role'));
        fetchRoles();
        fetchPermissions();
    }, [dispatch]);

    const [roles, setRoles] = useState<any[]>([]);
    const [permissions, setPermissions] = useState<any[]>([]);
    const [roleName, setRoleName] = useState('');
    const [selectedPermissions, setSelectedPermissions] = useState<number[]>([]);

    const token = localStorage.getItem('token');

    const fetchRoles = async () => {
        try {
            if (!token) return console.error('No auth token found');
            const response = await getRoles(token);
            setRoles(response);
        } catch (error) {
            console.error('Failed to fetch roles:', error);
        }
    };

    const fetchPermissions = async () => {
        try {
            if (!token) return console.error('No auth token found');
            const response = await getPermissions(token);
            setPermissions(response);
        } catch (error) {
            console.error('Failed to fetch permissions:', error);
        }
    };

    const handlePermissionChange = (permissionId: number) => {
        setSelectedPermissions((prev) => (prev.includes(permissionId) ? prev.filter((p) => p !== permissionId) : [...prev, permissionId]));
    };

    const handleCreateRole = async () => {
        if (!roleName || selectedPermissions.length === 0) {
            return alert('Please enter a role name and select at least one permission.');
        }
        console.log('name', roleName);
        console.log('selectedPermissions', selectedPermissions);

        try {
            await createRole(
                {
                    name: roleName,
                    permissions: selectedPermissions,
                },
                token
            );

            setRoleName('');
            setSelectedPermissions([]);
            fetchRoles();
        } catch (error) {
            console.error('Error creating role:', error);
        }
    };

    return (
        <div>
            <div className="p-5 bg-white rounded-lg shadow-md">
                {/* <h5 className="font-semibold text-lg mb-5">Create Role</h5> */}
                <div className="flex justify-between items-center mb-10 mt-5">
                    <h5 className="font-semibold text-lg">Create Role</h5>
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
                <Button variant="contained" color="primary" onClick={handleCreateRole}>
                    Submit
                </Button>
            </div>
        </div>
    );
};

export default UserRole;
