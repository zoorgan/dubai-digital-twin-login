import { Box, TextField, Button, Alert } from '@mui/material';



function Otp({ otp, handleOtpChange, handleOtpKeyDown, inputRefs, canResend, timer, onResend, onSubmit, successMessage, error }) {
    return (
        <Box component="form" onSubmit={onSubmit} sx={{ mt: 1, width: '100%', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-around', gap: '10px', direction: 'ltr' }}>
                {otp.map((digit, index) => (
                    <TextField
                        key={index}
                        inputRef={(el) => (inputRefs.current[index] = el)}
                        value={digit}
                        onChange={(e) => handleOtpChange(e.target.value, index)}
                        onKeyDown={(e) => handleOtpKeyDown(e, index)}
                        required
                        variant="outlined"
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                height: '56px',
                                width: '56px',
                            },
                            '& .MuiOutlinedInput-input': {
                                textAlign: 'center !important', 
                                padding: '0 !important',        
                                height: '56px',                  
                                lineHeight: '56px',
                                color: '#fff', 
                                fontSize: '1.5rem', 
                                fontWeight: 'bold',
                            }
                        }}
                    />
                ))}
            </Box>
        
            <Button
                type="button"
                fullWidth
                variant="outlined"
                onClick={onResend}
                disabled={!canResend}
                sx={{ 
                    fontWeight: 'bold',
                    fontSize: '0.95rem',
                    textTransform: 'none',
                    borderRadius: '8px',
                    padding: '10px ',
                    color: canResend ? '#90caf9' : '#666',
                    borderColor: canResend ? 'rgba(144, 202, 249, 0.5)' : '#444',
                    '&:hover': {
                        borderColor: '#fff',
                        color: '#fff',
                        backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    },
                    '&:disabled': {
                        color: 'rgba(255, 255, 255, 0.3) !important',
                        borderColor: 'rgba(255, 255, 255, 0.1) !important',
                        backgroundColor: 'transparent !important',
                    }
                }}
            >
                {!canResend ? `Resend OTP (${timer}s)` : "Resend OTP"}
            </Button>

            <Button 
                type="submit" 
                fullWidth 
                variant="contained" 
                color="success" 
                sx={{
                    padding:"10px",
                    borderRadius: '8px',
                    fontWeight: 'bold',
                    fontSize: '0.95rem',
                    }}
            >
                Verify OTP
            </Button>

            {successMessage && <Alert severity="success" sx={{ mt: 1, width: '100%',display:"flex", direction: 'rtl',alignItems: 'center', textAlign: 'right', justifyContent: 'center', fontFamily: 'sans-serif', fontSize: '0.9rem',padding:" 4px 0",borderRadius: '8px'}}>{successMessage}</Alert>}
            {error && <Alert severity="error" sx={{ mt: 1, width: '100%', direction: 'rtl', textAlign: 'right', justifyContent: 'center', fontFamily: 'sans-serif', fontSize: '0.9rem', padding:" 4px 0",borderRadius: '8px' }}>{error}</Alert>}
        </Box>
    );
}

export default Otp;