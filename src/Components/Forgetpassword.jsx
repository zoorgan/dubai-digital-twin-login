
import { useState, useEffect, useRef } from 'react';
import { Box, Container, Typography } from '@mui/material';
import axios from 'axios';
import ResetPassword from './ResetPassword';
import Otp from './Otp';
import { useNavigate } from 'react-router-dom';



function ForgetPassword() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const [correctOtp, setCorrectOtp] = useState("1234");
    const [otp, setOtp] = useState(['', '', '', '']);
    const inputRefs = useRef([]);
    
    const [timer, setTimer] = useState(60);
    const [canResend, setCanResend] = useState(false);

    
    const handleSubmitEmail = (e) => {
        if (e) e.preventDefault();
        setMessage('');
        setSuccessMessage('');
        setError('');
        setTimer(60);
        setCanResend(false);
        setOtp(['', '', '', '']);

        // axios.post('https://your-backend-api.com/auth/forgot-password', { email })
        // .then(() => {
        //     setSuccessMessage("تم إرسال كود الـ OTP إلى بريدك الإلكتروني بنجاح!");
        // })
        // .catch(() => {
            if (email !== "zoorgan@example.com"){
                setError("هذا البريد الإلكتروني غير مسجل لدينا");
            } else {
                setSuccessMessage("تم إرسال كود الـ OTP إلى بريدك الإلكتروني بنجاح! ");
                setTimeout(() => {
                    setMessage("OTP_SENT");
                    setSuccessMessage(''); 
                }, 500);
            }
        
    };


    useEffect(() => {
        let interval = null;
        if (message && timer > 0) {
            interval = setInterval(() => {
                setTimer((prevTimer) => prevTimer - 1);
            }, 1000);
        } else if (timer === 0) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setCanResend(true);
        }
        return () => clearInterval(interval);
    }, [message, timer]); 

    
    const handleOtpChange = (value, index) => {
        if (isNaN(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value.substring(value.length - 1);
        setOtp(newOtp);
        if (value && index < 3) {
            inputRefs.current[index + 1].focus();
        }
    };

    const handleOtpKeyDown = (e, index) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs.current[index - 1].focus();
        }
    };

    
    const handleResendOtp = () => {
        if (!canResend) return;
        setError('');
        setSuccessMessage('');
        setOtp(['', '', '', '']);
        setTimer(60);
        setCanResend(false);
        setCorrectOtp("5678");
        setSuccessMessage("تم إنشاء وإرسال كود OTP جديد بنجاح !");
    };


    const handleSubmitOtp = (e) => {
        e.preventDefault();
        setError('');
        setSuccessMessage('');

        const fullOtp = otp.join('');
        if (fullOtp === correctOtp)  {
            setSuccessMessage("تم التحقق بنجاح! يمكنك الآن تغيير كلمة المرور");

            setTimeout(()=> {
                navigate('/new-password')
            },500);
        } else {
            setError("كود OTP غير صحيح يرجى المحاولة مرة أخرى");
        }
    };

    return (
        <Container maxWidth={false} 
            sx={{
                backgroundImage: "url('https://pbs.twimg.com/media/DBVSn68VYAAu07M.jpg')",
                backgroundSize: "cover",     
                backgroundPosition: "center",  
                backgroundRepeat: "no-repeat",
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                margin: 0,
                padding: 0
            }}>
            <Box sx={{ marginTop: 15, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: "20px", backgroundColor: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(10px)', p: 4, borderRadius: 2, height: 'fit-content', width: '100%', maxWidth: '400px' }}>
                
                <Typography component="h1" variant="h5" sx={{ color: "#fff", mb: 1 }}>
                    {!message ? "Reset Password" : "Enter OTP Code"}
                </Typography>

                
                {!message ? (                  
                    <ResetPassword 
                        email={email}
                        setEmail={setEmail}
                        onSubmit={handleSubmitEmail}
                        successMessage={successMessage}
                        error={error}
                    />
                ) : (
                    <Otp
                        otp={otp}
                        handleOtpChange={handleOtpChange}
                        handleOtpKeyDown={handleOtpKeyDown}
                        inputRefs={inputRefs}
                        canResend={canResend}
                        timer={timer}
                        onResend={handleResendOtp}
                        onSubmit={handleSubmitOtp}
                        successMessage={successMessage}
                        error={error}
                    />
                )}
            </Box>
        </Container>
    );
}

export default ForgetPassword;