import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../../store';
import { useEffect, useState } from 'react';
import { setPageTitle, toggleRTL } from '../../store/themeConfigSlice';
import Dropdown from '../../components/Dropdown';
import i18next from 'i18next';
import IconCaretDown from '../../components/Icon/IconCaretDown';
import { passwordReset } from '../../store/api/auth';
import { useParams } from 'react-router-dom';

const ResetPasswordBox = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // const [searchParams] = useSearchParams(); // Get query params from URL
    // const token = searchParams.get('token'); // Extract reset token
    const { token } = useParams();

    console.log('token', token);

    useEffect(() => {
        dispatch(setPageTitle('Reset Password'));
    }, [dispatch]);

    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl';
    const themeConfig = useSelector((state: IRootState) => state.themeConfig);

    const setLocale = (flag: string) => {
        setFlag(flag);
        dispatch(toggleRTL(flag.toLowerCase() === 'ae' ? 'rtl' : 'ltr'));
    };

    const [flag, setFlag] = useState(themeConfig.locale);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!token) {
            setError('Invalid or missing reset token.');
            return;
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        setError('');
        setLoading(true);

        try {
            const resetPassword = {
                email,
                password,
                password_confirmation: confirmPassword,
                token,
            };

            console.log('resetPassword', resetPassword);

            const response = await passwordReset(resetPassword);
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Password reset failed.');
            }

            setSuccessMessage('Password reset successful! Redirecting...');
            setTimeout(() => navigate('/login'), 2000);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div className="absolute inset-0">
                <img src="/assets/images/auth/bg-gradient.png" alt="image" className="h-full w-full object-cover" />
            </div>
            <div className="relative flex min-h-screen items-center justify-center bg-[url(/assets/images/auth/map.png)] bg-cover bg-center bg-no-repeat px-6 py-10 dark:bg-[#060818] sm:px-16">
                <img src="/assets/images/auth/coming-soon-object1.png" alt="image" className="absolute left-0 top-1/2 h-full max-h-[893px] -translate-y-1/2" />
                <img src="/assets/images/auth/coming-soon-object2.png" alt="image" className="absolute left-24 top-0 h-40 md:left-[30%]" />
                <img src="/assets/images/auth/coming-soon-object3.png" alt="image" className="absolute right-0 top-0 h-[300px]" />
                <div className="relative w-full max-w-[870px] rounded-md bg-[linear-gradient(45deg,#fff9f9_0%,rgba(255,255,255,0)_25%,rgba(255,255,255,0)_75%,_#fff9f9_100%)] p-2 dark:bg-[linear-gradient(52.22deg,#0E1726_0%,rgba(14,23,38,0)_18.66%,rgba(14,23,38,0)_51.04%,rgba(14,23,38,0)_80.07%,#0E1726_100%)]">
                    <div className="relative flex flex-col justify-center rounded-md bg-white/60 backdrop-blur-lg dark:bg-black/50 px-6 lg:min-h-[758px] py-20">
                        <div className="mx-auto w-full max-w-[440px]">
                            <h1 className="mb-3 text-2xl font-bold !leading-snug dark:text-white">Reset Password</h1>
                            <p>Enter your new password below</p>

                            <form className="space-y-5" onSubmit={handleSubmit}>
                                <div>
                                    <label htmlFor="Email" className="dark:text-white">
                                        Email
                                    </label>
                                    <input id="Email" type="email" placeholder="Enter your email" className="form-input w-full" value={email} onChange={(e) => setEmail(e.target.value)} required />
                                </div>

                                <div>
                                    <label htmlFor="Password" className="dark:text-white">
                                        New Password
                                    </label>
                                    <input
                                        id="Password"
                                        type="password"
                                        placeholder="Enter New Password"
                                        className="form-input w-full"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor="ConfirmPassword" className="dark:text-white">
                                        Confirm Password
                                    </label>
                                    <input
                                        id="ConfirmPassword"
                                        type="password"
                                        placeholder="Confirm New Password"
                                        className="form-input w-full"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        required
                                    />
                                </div>

                                {error && <p className="text-red-500">{error}</p>}
                                {successMessage && <p className="text-green-500">{successMessage}</p>}

                                <button type="submit" className="btn btn-gradient w-full uppercase" disabled={loading}>
                                    {loading ? 'Resetting...' : 'Reset Password'}
                                </button>
                            </form>

                            <p className="mt-4 text-center">
                                <Link to="/auth/signin" className="text-blue-500">
                                    Back to Login
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResetPasswordBox;
