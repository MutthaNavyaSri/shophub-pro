import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  Container,
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  Alert,
  CircularProgress,
  InputAdornment,
  IconButton,
  Divider,
  Stack,
} from '@mui/material';
import {
  Email as EmailIcon,
  Lock as LockIcon,
  Visibility,
  VisibilityOff,
  ShoppingBag as ShopIcon,
  Login as LoginIcon,
} from '@mui/icons-material';
import { toast } from 'react-toastify';
import { useLoginMutation } from '../redux/api/fakestoreApi';
import { setCredentials } from '../redux/slices/authSlice';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const result = await login({
        email: formData.email,
        password: formData.password,
      }).unwrap();

      // MongoDB backend returns token and user data
      if (result.token) {
        // Save credentials to Redux and localStorage
        dispatch(setCredentials(result));
        
        toast.success('Login successful!');
        navigate('/dashboard');
      }
    } catch (err) {
      const errorMessage = err?.data?.message || 'Login failed. Please check your credentials.';
      setError(errorMessage);
      toast.error(errorMessage);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #6366f1 0%, #ec4899 100%)',
        py: { xs: 4, sm: 8 },
        px: { xs: 2, sm: 3 },
      }}
    >
      <Container maxWidth="sm">
        <Paper 
          elevation={10} 
          sx={{ 
            p: { xs: 3, sm: 5 }, 
            borderRadius: 4,
            background: 'white',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
          }}
        >
          {/* Logo and Title */}
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Box
              sx={{
                width: 80,
                height: 80,
                margin: '0 auto 16px',
                background: 'linear-gradient(135deg, #2563eb 0%, #0ea5e9 100%)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 8px 24px rgba(37, 99, 235, 0.3)',
              }}
            >
              <ShopIcon sx={{ fontSize: 40, color: 'white' }} />
            </Box>
            <Typography 
              component="h1" 
              variant="h4" 
              fontWeight={700}
              sx={{
                background: 'linear-gradient(135deg, #2563eb 0%, #0ea5e9 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 1,
              }}
            >
              Welcome Back!
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Sign in to ShopHub Pro
            </Typography>
          </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit} noValidate>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              type="email"
              autoComplete="email"
              autoFocus
              value={formData.email}
              onChange={handleChange}
              disabled={isLoading}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon color="primary" />
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 2 }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              id="password"
              autoComplete="current-password"
              value={formData.password}
              onChange={handleChange}
              disabled={isLoading}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon color="primary" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 3 }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              startIcon={isLoading ? null : <LoginIcon />}
              sx={{ 
                py: 1.5,
                mb: 3,
                borderRadius: 2,
                fontSize: '1.1rem',
                background: 'linear-gradient(135deg, #2563eb 0%, #0ea5e9 100%)',
                boxShadow: '0 4px 12px rgba(37, 99, 235, 0.4)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #0ea5e9 0%, #2563eb 100%)',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 6px 20px rgba(37, 99, 235, 0.5)',
                },
                transition: 'all 0.3s ease',
              }}
              disabled={isLoading}
            >
              {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Sign In'}
            </Button>

            <Divider sx={{ my: 3 }}>
              <Typography variant="body2" color="text.secondary">
                OR
              </Typography>
            </Divider>

            <Stack direction="row" spacing={1} justifyContent="center" alignItems="center">
              <Typography variant="body2" color="text.secondary">
                Don't have an account?
              </Typography>
              <Button
                component={Link}
                to="/signup"
                variant="text"
                sx={{
                  fontWeight: 600,
                  background: 'linear-gradient(135deg, #2563eb 0%, #0ea5e9 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Sign Up
              </Button>
            </Stack>


          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Login;
