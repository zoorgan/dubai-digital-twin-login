import './App.css';
import { Box, Container, Divider, CircularProgress } from '@mui/material';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { FormControlLabel, Checkbox } from '@mui/material';
import Button from '@mui/material/Button';
//import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@mui/material/Link';
import Alert from '@mui/material/Alert';




function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [loginError, setLoginError] = useState('');
  const [loginSuccess, setLoginSuccess] = useState('');
  const [rememberMe, setRememberMe] = useState(false);


useEffect(() => {
    const savedUsername = localStorage.getItem('rememberedUsername');
    const savedRememberMe = localStorage.getItem('rememberMe') === 'true';

    if (savedRememberMe && savedUsername) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setUsername(savedUsername);
        setRememberMe(true);
    }
}, []);






  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      navigate('/home');
    } else {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsLoading(false);
    }
  }, [navigate]);



// دي الدالة الجديدة بعد ما غيرتها عشان سرعة الاستجابة في الموقع وقفلت اكسيوس وعملت توكن افتراضي 
  const handleLogin = (e) => {
    if (e) e.preventDefault();
    setLoginError('');
    setLoginSuccess('');


    if (!username || !password){
      setLoginError("اسم المستخدم وكلمة المرور مطلوبة");
      return;
    }

    const saveUSer = localStorage.getItem('userName') || "Ahmed";
    const savePassword = localStorage.getItem('userPAssword') || "172002";

    if (username.trim() === saveUSer.trim() && password === savePassword){
      setLoginSuccess("تم تسجيل الدخول بنجاح!");

        if (rememberMe){
          localStorage.setItem('rememberedUsername', username);
          localStorage.setItem('rememberMe', 'true');
        } else {
          localStorage.removeItem('rememberedUsername');
          localStorage.removeItem('rememberMe');
        }

        localStorage.setItem('token', 'mock-json-web-token-12345');

        setTimeout(() => {
        navigate('/home');
      }, 500);
    } else {
      setLoginError("اسم المستخدم أو كلمة المرور غير صحيحة!");
    }





  // const handleLogin = (e) => {
  //   if (e) e.preventDefault();

  //   if (rememberMe) {
  //       localStorage.setItem('rememberedUsername', username);
  //       localStorage.setItem('rememberMe', 'true');
  //     } else {
  //         localStorage.removeItem('rememberedUsername');
  //         localStorage.removeItem('rememberMe');
  //   }
  //   setLoginError('');
  //   setLoginSuccess('') 

  //   if (!username || !password) {
  //     setLoginError("اسم المستخدم وكلمة المرور مطلوبة!");
  //     return;
  //   }



//     axios.post("https://dummyjson.com/auth/login", {
//       username: username,
//       password: password
//     })
//     .then(function(response) {
//       const token = response.data.accessToken;
//       localStorage.setItem("token", token);
//       console.log("token received", token);
//       setLoginSuccess("تم تسجيل الدخول بنجاح!  ...");

//       setTimeout(() => {
//       navigate('/home');
//     }, 1500);
//   })
//     .catch(error => {
//       if (error.response && error.response.status === 400){
//         setLoginError("اسم المستخدم أو كلمة المرور غير صحيحة!");
//       }else  {
//         setLoginError("حدث خطأ في الاتصال، يرجى المحاولة مرة أخرى");
//       }
//     });
    };

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#16171d' }}>
        <CircularProgress /> 
      </Box>
    );
  }


  return (
    <Container maxWidth={false} sx={{
      backgroundImage: "url('https://pbs.twimg.com/media/DBVSn68VYAAu07M.jpg')",
      backgroundSize: "cover",     
      backgroundPosition: "center",  
      backgroundRepeat: "no-repeat",
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      margin: 0,
      padding: 0
    }}>

      <Box sx={{
        height: "auto", 
        minHeight: "500px",
        width: "400px",
        background: "rgba(56, 60, 61, 0.25)",
        backdropFilter: "blur(8px)",
        borderRadius: "12px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "25px",
        p: 3 
      }}>
        
        <Typography component="h1" variant="h5" sx={{ color: '#fff' }}>Welcome</Typography>
        
        <TextField
          required
          id="standard-email-input"
          variant="standard"
          label="Username"
          placeholder="Enter your username"
          sx={{ width: "80%" }}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <TextField
          required
          id="standard-password-input"
          variant="standard"
          label="Password"
          placeholder="Enter your password"
          sx={{ width: "80%" }}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Box sx={{
          width: "80%",              
          display: "flex",           
          justifyContent: "space-between", 
          alignItems: "center",      
          marginTop: "-5px"          
        }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                size="small"
                sx={{ 
                  color: "#fff",
                  padding: "4px",
                  '&.Mui-checked': { color: '#1410f7' } 
                }} 
              />
            }
            label="Remember Me"
            sx={{
              color: "#fff",
              margin: "0",
              '& .MuiFormControlLabel-label': { fontSize: '0.85rem' } 
            }}
          />
          
          <Link 
            component={RouterLink} 
            to="/forgot-password" 
            variant="body2" 
            sx={{ textDecoration: 'none', color: '#fff' }}
          >
            Forgot Password?
          </Link>
        </Box>

        <Button 
          variant="contained" 
          disableElevation 
          id="login-btn"
          onClick={handleLogin}
          sx={{
            background: "#0d0b80",
            width: "80%",
            padding: "10px",
            fontSize: "16px",
            fontWeight: "500",
            borderRadius: "8px",
            '&:hover': { background: "#1c1b52" }
          }}
        >
          Sign In
        </Button>

        {loginSuccess && (
          <Alert 
            severity="success" 
            sx={{ 
              width: '80%',
              padding: '0', 
              direction: 'rtl', 
              textAlign: 'right', 
              justifyContent: 'center',
              fontFamily: 'sans-serif',
              fontSize: '0.9rem',
              borderRadius: '8px',
              mt: -1,
              mb: -1
            }}
          >
            {loginSuccess}
          </Alert>
        )}

        
        {loginError && (
          <Alert 
            severity="error" 
            sx={{ 
              width: '80%', 
              padding: '0',
              direction: 'rtl', 
              textAlign: 'right', 
              justifyContent: 'center',
              fontFamily: 'sans-serif',
              fontSize: '0.9rem',
              borderRadius: '8px',
              mt: -1, 
              mb: -1
            }}
          >
            {loginError}
          </Alert>
        )}

        <Divider sx={{ width: "80%", borderColor: 'rgba(255,255,255,0.2)' }} />

        <Typography component="p" variant="body2" sx={{ color: "#fff" }}>
          Don't have an account? {' '}
          <Link 
            component={RouterLink} 
            to="/signup" 
            variant="body2" 
            sx={{ textDecoration:'none', color: '#90caf9', fontWeight: 'bold' }}
          >
            Sign Up
          </Link>
        </Typography>

      </Box>
    </Container>
  );
}

export default App;