import { Button, Typography,Box } from '@mui/material'
import { useNavigate } from 'react-router-dom';




export default function Home() {

    const navigate = useNavigate();

    const handleLogout = () => {
    localStorage.removeItem("token"); 
    navigate("/"); 
};
    return (
        <Box
            sx={{
                background: "#16171d",
                height: "100vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: "20px"
            }}
            >
            
            <Typography 
                variant="h3" 
                sx={{ 
                color: "white", 
                fontWeight: "bold" 
                }}
            >
                أهلاً بيك في الصفحة الرئيسية  
            </Typography>

            <Button 
                variant="contained" 
                onClick={handleLogout}
                sx={{
                background: "#0d0b80",
                padding: "10px 20px",
                borderRadius: "8px",
                '&:hover': { background: "#1c1b52" }
                }}
            >
                Logout
            </Button>
        </Box>
        
    
    )
}
