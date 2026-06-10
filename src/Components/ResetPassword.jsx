import { Box, TextField, Button, Alert } from '@mui/material';


function ResetPassword({ email, setEmail, onSubmit, successMessage, error }) {
    return (
        <Box component="form" onSubmit={onSubmit} sx={{ mt: 1, width: '100%' }}>
            <TextField
                required
                
                fullWidth
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                slotProps={{ input: { style: { color: '#fff' } } }}
            />
            <Button 
                type="submit" 
                fullWidth variant="contained" 
                sx={{ 
                    mt: 3, 
                    mb: 2 ,
                    backgroundColor:"#121a68" ,
                    padding:"10px" , 
                    borderRadius: '8px',
                    '&:hover': { background: "#1c1b52" }}}>
                Send Reset Link
            </Button>
            
            {successMessage && (
                <Alert severity="success" sx={{ mt: 1, direction: 'rtl', textAlign: 'right', justifyContent: 'center',borderRadius: '8px', padding:"4px"}}>
                    {successMessage}
                </Alert>
            )}
            {error && (
                <Alert severity="error" sx={{ mt: 1, direction: 'rtl', textAlign: 'right', justifyContent: 'center',borderRadius: '8px',padding:"4px " }}>
                    {error}
                </Alert>
            )}
        </Box>
    );
}

export default ResetPassword;