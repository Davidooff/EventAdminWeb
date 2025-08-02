import { AppProvider } from '@toolpad/core/AppProvider';
import {
    SignInPage,
    type AuthProvider,
    type AuthResponse,
} from '@toolpad/core/SignInPage';
import theme from '../theme';
import { useAuth } from '../contexts/authContext';
import { useLocation, useNavigate } from 'react-router-dom';

const providers = [{ id: 'credentials', name: 'Email and password' }];

export default function SignIn() {
    const navigate = useNavigate();
    const authContext = useAuth();
    const location = useLocation();


    // The corrected signIn function
    const signIn = (
        _provider: AuthProvider, // Marked as unused
        formData?: FormData,
    ): Promise<AuthResponse> => {
        const email = formData?.get('email') as string;
        const password = formData?.get('password') as string;

        const authP = new Promise<AuthResponse>(async (resolve) => {
            const res = await authContext.login({ email, password });

            if (!res.ok) {
                // On failure, return an error object that matches AuthResponse
                resolve ({
                    type: res.errText?.title,
                    error: res.errText?.detail,
                });
            }
            
            const from = location.state?.from?.pathname || '/dashboard';
            navigate(from, { replace: true });
        })

        return authP
    };

    return (
        <AppProvider theme={theme}>
            <SignInPage
                signIn={signIn}
                providers={providers}
                slotProps={{ emailField: { autoFocus: false }, form: { noValidate: true } }}
            />
        </AppProvider>
    );
}