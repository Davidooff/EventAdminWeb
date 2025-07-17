import { AppProvider } from '@toolpad/core/AppProvider';
import {
    SignInPage,
    type AuthProvider,
    type AuthResponse,
} from '@toolpad/core/SignInPage';
import theme from '../theme';
import { useAuth } from '../contexts/authContext';

const providers = [{ id: 'credentials', name: 'Email and password' }];

export default function SignIn() {
    const authContext = useAuth();

    // The corrected signIn function
    const signIn = async (
        _provider: AuthProvider, // Marked as unused
        formData?: FormData,
    ): Promise<AuthResponse> => {
        const email = formData?.get('email') as string;
        const password = formData?.get('password') as string;

        const res = await authContext.login({ email, password });

        if (!res.ok) {
            // On failure, return an error object that matches AuthResponse
            return {
                type: res.errText?.title || 'Login Error',
                error: res.errText?.detail || 'An unknown error occurred.',
            };
        }

        // On success, return null as expected by AuthResponse
        return {
            type: res.errText?.title || 'Login Sucessfuly',
            error: res.errText?.detail || 'Sucess.',
        };
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