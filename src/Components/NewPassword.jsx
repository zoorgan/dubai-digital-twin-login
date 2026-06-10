import { useState } from 'react';
import { Box, Container, TextField, Button, Typography, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function NewPassword() {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate(); 

    const handleResetSubmit = (e) => {
        e.preventDefault();
        setError('');
        setSuccessMessage('');

        
        if (password.length < 6) {
            setError("يجب أن تكون كلمة المرور 6 أحرف أو أكثر");
            return;
        }

        
        if (password !== confirmPassword) {
            setError("كلمتا المرور غير متطابقتين!");
            return;
        }

        
        setSuccessMessage(" تم تغيير كلمة المرور بنجاح!");
        
        
        setPassword('');
        setConfirmPassword('');

        
        setTimeout(() => {
            navigate('/');
        }, 2000);
    };

    return (
        <Container maxWidth={false} sx={{
            backgroundImage: "url('https://pbs.twimg.com/media/DBVSn68VYAAu07M.jpg')",
            backgroundSize: "cover",     
            backgroundPosition: "center",  
            backgroundRepeat: "no-repeat",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: 'center',
            margin: 0,
            padding: 0
        }}>
            <Box sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                gap: "20px", 
                backgroundColor: 'rgba(255,255,255,0.05)', 
                backdropFilter: 'blur(10px)', 
                p: 4, 
                borderRadius: 2, 
                height: 'fit-content', 
                width: '100%', 
                maxWidth: '400px' 
            }}>
                
                <Typography component="h1" variant="h5" sx={{ color: "#fff", mb: 1, textAlign: 'center' }}>
                    Create New Password
                </Typography>

                <Box component="form" onSubmit={handleResetSubmit} sx={{ width: '80%', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <TextField
                        required
                        variant="standard"
                        fullWidth
                        label="New Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        slotProps={{ input: { style: { color: '#fff' } } }}
                    />

                    <TextField
                        required
                        variant="standard"
                        fullWidth
                        label="Confirm New Password"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        slotProps={{ input: { style: { color: '#fff' } } }}
                    />

                    <Button type="submit" fullWidth variant="contained" color="primary" sx={{ mt: 1, backgroundColor:"#0d0b80" , borderRadius:'8px' , padding:"8px" }}>
                        Reset Password
                    </Button>

                    
                    {successMessage && (
                        <Alert severity="success" sx={{ 
                            mt: 1, width: '100%', display: 'flex !important', justifyContent: 'center !important', alignItems: 'center !important', direction: 'rtl', borderRadius: '8px', padding: '0 !important', minHeight: '45px',
                            '& .MuiAlert-message': { padding: '4px', display: 'flex', alignItems: 'center', textAlign: 'center' }
                        }}>
                            {successMessage}
                        </Alert>
                    )}

                    
                    {error && (
                        <Alert severity="error" sx={{ 
                            mt: 1, width: '100%', display: 'flex !important', justifyContent: 'center !important', alignItems: 'center !important', direction: 'rtl', borderRadius: '8px', padding: '0 !important', minHeight: '45px',
                            '& .MuiAlert-message': { padding: '4px', display: 'flex', alignItems: 'center', textAlign: 'center' }
                        }}>
                            {error}
                        </Alert>
                    )}
                </Box>
            </Box>
        </Container>
    );
}

export default NewPassword;