'use client';

import { useEffect, useState } from 'react';
import { Box, Button, TextField, Typography, Paper } from '@mui/material';
import { Google as GoogleIcon } from '@mui/icons-material';
import { signIn } from "@/firebase/auth/traditionalAuth";
import { signInWithGooglePopup } from "@/firebase/auth/googleAuth";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import firebase_app from "@/firebase/config";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Page() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSignIn = async () => {
        const { result, error } = await signIn(email, password);
        if (error) {
            setError(error.message);
            return;
        }
    };

    const handleSignInWithGoogle = async () => {
        const { result, error } = await signInWithGooglePopup();
        if (error) {
            setError(error.message);
            return;
        }
    };

    useEffect(() => {
        const auth = getAuth(firebase_app);
        onAuthStateChanged(auth, (user) => {
            if (user) {
                router.push('/');
            }
        });
    }, []);

    return (
        <Box sx={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#0d1117' }}>
            <Paper elevation={3} sx={{ p: 3, maxWidth: 300, mx: 'auto', mt: 5, backgroundColor: '#161b22', color: '#c9d1d9' }}>
                <Typography variant="h5" sx={{ mb: 2, color: '#c9d1d9' }}>Iniciar sesión</Typography>
                {error && <Typography color="error">{error}</Typography>}
                <TextField
                    label="Correo electrónico"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={email}
                    onChange={handleEmailChange}
                    sx={{ input: { color: '#c9d1d9' }, label: { color: '#c9d1d9' } }}
                />
                <TextField
                    label="Contraseña"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    type="password"
                    value={password}
                    onChange={handlePasswordChange}
                    sx={{ input: { color: '#c9d1d9' }, label: { color: '#c9d1d9' } }}
                />
                <Button
                    variant="contained"
                    fullWidth
                    sx={{ mt: 2, backgroundColor: '#238636', '&:hover': { backgroundColor: '#2ea043' } }}
                    onClick={handleSignIn}
                >
                    Iniciar sesión
                </Button>
                <Button
                    startIcon={<GoogleIcon />}
                    variant="outlined"
                    fullWidth
                    sx={{ mt: 2, color: '#c9d1d9', borderColor: '#c9d1d9', '&:hover': { borderColor: '#f0f6fc' } }}
                    onClick={handleSignInWithGoogle}
                >
                    Inicia sesión con Google
                </Button>
                <Typography component="p" sx={{ mt: 2 }}>
                    ¿No tienes una cuenta?
                    <Typography color="primary" component={Link} href="/signup" sx={{ display: 'inline', ml: 1, color: '#58a6ff' }}>
                        Regístrate
                    </Typography>
                </Typography>
            </Paper>
        </Box>
    );
}
