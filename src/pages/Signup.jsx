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
  Grid,
  Divider,
  Stack,
} from '@mui/material';
import {
  Email as EmailIcon,
  Person as PersonIcon,
  Lock as LockIcon,
  Visibility,
  VisibilityOff,
  ShoppingBag as ShopIcon,
  PersonAdd as PersonAddIcon,
} from '@mui/icons-material';
import { toast } from 'react-toastify';
import { useSignupMutation } from '../redux/api/fakestoreApi';
import { setCredentials } from '../redux/slices/authSlice';

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [signup, { isLoading }] = useSignupMutation();

  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    firstname: '',
    lastname: '',
  });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);

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

    // Validation
    if (!formData.email || !formData.username || !formData.password || !formData.firstname || !formData.lastname) {
      setError('All fields are required');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    try {
      // Real MongoDB signup
      const result = await signup({
        email: formData.email,
        username: formData.username,
        password: formData.password,
        firstname: formData.firstname,
        lastname: formData.lastname,
      }).unwrap();

      if (result.token) {
        // Auto-login after successful signup
        dispatch(setCredentials(result));
        toast.success('Account created successfully! Welcome!');
        navigate('/dashboard');
      }
    } catch (err) {
      console.error('Signup error:', err);
      const errorMessage = err?.data?.message || err?.data?.errors?.[0]?.msg || 'Signup failed. Please try again.';
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
        py: { xs: 4, sm: 6 },
        px: { xs: 2, sm: 3 },
      }}
    >
      <Container maxWidth="md">
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
              Join ShopHub Pro
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Create your account to start shopping
            </Typography>
          </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="firstname"
                  label="First Name"
                  name="firstname"
                  autoFocus
                  value={formData.firstname}
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonIcon color="primary" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastname"
                  label="Last Name"
                  name="lastname"
                  value={formData.lastname}
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonIcon color="primary" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </Grid>

            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon color="primary" />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon color="primary" />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              id="password"
              value={formData.password}
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon color="primary" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="Confirm Password"
              type={showConfirmPassword ? 'text' : 'password'}
              id="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon color="primary" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle confirm password visibility"
                      onClick={handleClickShowConfirmPassword}
                      edge="end"
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              startIcon={<PersonAddIcon />}
              sx={{ 
                mt: 3, 
                mb: 2, 
                py: 1.5,
                fontSize: { xs: '0.9rem', sm: '1rem' },
                borderRadius: 2,
                background: 'linear-gradient(135deg, #2563eb 0%, #1e40af 100%)',
                boxShadow: '0 4px 12px rgba(37, 99, 235, 0.3)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #1e40af 0%, #2563eb 100%)',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 6px 16px rgba(37, 99, 235, 0.4)',
                },
                transition: 'all 0.3s ease',
              }}
              disabled={isLoading}
            >
              {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Create Account'}
            </Button>

            <Divider sx={{ my: 3 }}>
              <Typography variant="body2" color="text.secondary">
                OR
              </Typography>
            </Divider>

            <Stack spacing={2}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="body2" color="text.secondary">
                  Already have an account?{' '}
                  <Link 
                    to="/login" 
                    style={{ 
                      textDecoration: 'none', 
                      color: '#2563eb',
                      fontWeight: 600,
                    }}
                  >
                    Sign In
                  </Link>
                </Typography>
              </Box>


            </Stack>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Signup;
