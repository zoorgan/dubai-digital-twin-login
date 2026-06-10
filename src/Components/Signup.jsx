import { useState } from 'react';
import { Box, Container, TextField, Button, Typography, Alert,Divider} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import axios from 'axios';


function Signup() {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [successMessage, setSuccessMessage] = useState('');
    const [error, setError] = useState('');

    
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSignup = (e) => {
        e.preventDefault();
        setError('');
        setSuccessMessage('');

        if(formData.fullName === "zoorgan"){
            setError("اسم المستخدم موجود بالفعل ")
            return;
        }
        if (formData.password !== formData.confirmPassword) {
            setError("كلمتا المرور غير متطابقتين!");
            return;
        }

        
        if (formData.password.length < 6) {
            setError("يجب أن تكون كلمة المرور 6 أحرف أو أكثر");
            return;
        }


        const registerEmail = "zoorgan@example.com";
        if (formData.email === registerEmail ){
            setError("هذا البريد الالكتروني موجود بالفعل");
        } else{
            setSuccessMessage("تم انشاء الحساب بنجاح!");

            localStorage.setItem('userEmail' , formData.email);
            localStorage.setItem('userPassword' ,formData.password);

            setFormData({ fullName:'' , email:'' , password:'' , confirmPassword:''});
        }

        setError('');
        setTimeout(()=>{
            setSuccessMessage('');
        },3000);
        

        
        // axios.post('https://dummyjson.com/auth/login', {
        //     name: formData.fullName,
        //     email: formData.email,
        //     password: formData.password
        // })
        // .then(() => {
        //     setSuccessMessage("تم إنشاء الحساب بنجاح! يمكنك تسجيل الدخول الآن.");
            
        //     setFormData({ fullName: '', email: '', password: '', confirmPassword: '' });
        // })
        // .catch((err) => {
        //     setError(err.response?.data?.message || "حدث خطأ أثناء إنشاء الحساب، يرجى المحاولة مرة أخرى");
        // });
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
                backgroundColor: 'rgba(56, 60, 61, 0.25)', 
                backdropFilter: 'blur(8px)', 
                p: 4, 
                borderRadius: 2, 
                height: 'fit-content', 
                width: '100%', 
                maxWidth: '400px' 
            }}>
                
                <Typography component="h1" variant="h5" sx={{ color: "#fff", mb: 1 }}>
                    Create New Account
                </Typography>

                <Box component="form" onSubmit={handleSignup} sx={{ width: '80%', display: 'flex', flexDirection: 'column', gap: '25px' }}>
                    <TextField
                        required
                        variant="standard"
                        fullWidth
                        label="Full Name"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        slotProps={{ input: { style: { color: '#fff' } } }}
                    />
                    
                    <TextField
                        required
                        variant="standard"
                        fullWidth
                        label="Email Address"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        slotProps={{ input: { style: { color: '#fff' } } }}
                    />

                    <TextField
                        required
                        variant="standard"
                        fullWidth
                        label="Password"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        slotProps={{ input: { style: { color: '#fff' } } }}
                    />

                    <TextField
                        required
                        variant="standard"
                        fullWidth
                        label="Confirm Password"
                        name="confirmPassword"
                        type="password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        slotProps={{ input: { style: { color: '#fff' } } }}
                    />

                    <Button type="submit" fullWidth variant="contained" color="primary"
                        sx={{
                            background: "#0d0b80",
                            width: "100%",
                            padding: "10px",
                            fontSize: "16px",
                            fontWeight: "500",
                            borderRadius: "13px",
                            marginTop:"10px",
                            '&:hover': { background: "#1c1b52" }
                        }}>
                        Sign Up
                    </Button>

                    {successMessage && (
                        <Alert severity="success"
                            sx={{ 
                                mt:-1,
                                width: '100%',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                direction: 'rtl',
                                borderRadius: '8px',
                                padding: '0',
                                '& .MuiAlert-message': { padding: '8px 0', display: 'flex', alignItems: 'center' }
                        }}>
                            {successMessage}
                        </Alert>
                    )}

            
                    {error && (
                        <Alert severity="error" 
                        sx={{ 
                            mt:-1,
                            width: '100%', 
                            display: 'flex', 
                            justifyContent: 'center', 
                            alignItems: 'center ', 
                            direction: 'rtl', 
                            borderRadius: '8px', 
                            padding: '0',
                            '& .MuiAlert-message': { 
                                padding: ' 8px 0', 
                                display: 'flex', 
                                alignItems: 'center'
                            }
                        }}>
                            {error}
                        </Alert>
                    )}

                    <Divider 
                        sx={{ 
                            mt:-1,
                            width: "100%",
                            borderColor: 'rgba(255,255,255,0.2)'
                        }} />
                    
                    <Typography variant="body2" 
                        sx={{ 
                            color: '#fff',
                            textAlign: 'center',
                        }}>
                        Already have an account?{' '}
                        <RouterLink 
                            to="/" 
                            style={{ 
                                color: '#90caf9',
                                textDecoration: 'none', 
                                fontWeight: 'bold' 
                            }}>
                            Sign In
                        </RouterLink>
                    </Typography>

                    
                    
                </Box>
            </Box>
        </Container>
    );
}

export default Signup;