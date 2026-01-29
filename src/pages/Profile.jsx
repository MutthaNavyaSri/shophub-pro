import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  Container,
  Box,
  Paper,
  Typography,
  Button,
  Avatar,
  Grid,
  Card,
  CardContent,
  AppBar,
  Toolbar,
  IconButton,
  Divider,
  Chip,
  Stack,
} from '@mui/material';
import {
  ArrowBack as BackIcon,
  Email as EmailIcon,
  Person as PersonIcon,
  ShoppingBag as ShopIcon,
} from '@mui/icons-material';
import { toast } from 'react-toastify';
import { logout } from '../redux/slices/authSlice';
import { useGetProductsQuery } from '../redux/api/fakestoreApi';

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { data: products } = useGetProductsQuery();

  const userProducts = products?.filter((p) => p.createdBy === user?._id) || [];

  const handleLogout = () => {
    dispatch(logout());
    toast.success('Logged out successfully!');
    navigate('/');
  };

  const getInitials = () => {
    const first = user?.firstname?.[0] || '';
    const last = user?.lastname?.[0] || '';
    return `${first}${last}`.toUpperCase();
  };

  return (
    <>
      {/* AppBar */}
      <AppBar
        position="static"
        elevation={0}
        sx={{
          background: 'linear-gradient(135deg, #6366f1 0%, #ec4899 100%)',
        }}
      >
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={() => navigate('/dashboard')}
            sx={{ mr: 2 }}
          >
            <BackIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 600 }}>
            🛍️ ShopHub Pro
          </Typography>
          <Button
            variant="outlined"
            onClick={handleLogout}
            sx={{
              borderColor: 'white',
              color: 'white',
              '&:hover': {
                borderColor: 'white',
                bgcolor: 'rgba(255, 255, 255, 0.1)',
              },
            }}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      <Box
        sx={{
          minHeight: 'calc(100vh - 64px)',
          background: 'linear-gradient(135deg, #f8fafc 0%, #e0e7ff 100%)',
          py: 4,
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={3}>
            {/* Profile Card */}
            <Grid item xs={12} md={4}>
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  textAlign: 'center',
                  borderRadius: 3,
                  background: 'linear-gradient(135deg, #2563eb 0%, #0ea5e9 100%)',
                  color: 'white',
                }}
              >
                <Avatar
                  sx={{
                    width: 120,
                    height: 120,
                    mx: 'auto',
                    mb: 2,
                    bgcolor: 'rgba(255, 255, 255, 0.3)',
                    fontSize: '3rem',
                    fontWeight: 700,
                    border: '4px solid white',
                  }}
                >
                  {getInitials()}
                </Avatar>
                <Typography variant="h5" gutterBottom fontWeight={700}>
                  {user?.firstname} {user?.lastname}
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.9, mb: 1 }}>
                  @{user?.username}
                </Typography>
                <Chip
                  label="Premium Member"
                  sx={{
                    bgcolor: 'rgba(255, 255, 255, 0.2)',
                    color: 'white',
                    fontWeight: 600,
                  }}
                />
              </Paper>

              {/* Stats Card */}
              <Paper elevation={0} sx={{ p: 3, mt: 3, borderRadius: 3 }}>
                <Typography variant="h6" gutterBottom fontWeight={600}>
                  Your Stats
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <Stack spacing={2}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography color="text.secondary">Products Created</Typography>
                    <Typography fontWeight={600} color="primary.main">
                      {userProducts.length}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography color="text.secondary">Member Since</Typography>
                    <Typography fontWeight={600}>
                      {new Date().getFullYear()}
                    </Typography>
                  </Box>
                </Stack>
              </Paper>
            </Grid>

            {/* Profile Information */}
            <Grid item xs={12} md={8}>
              <Paper elevation={0} sx={{ p: 4, borderRadius: 3, mb: 3 }}>
                <Box sx={{ mb: 3 }}>
                  <Typography variant="h5" fontWeight={700}>
                    Profile Information
                  </Typography>
                </Box>

                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <PersonIcon sx={{ mr: 1, color: 'primary.main' }} />
                      <Typography variant="body2" color="text.secondary">
                        First Name
                      </Typography>
                    </Box>
                    <Typography variant="body1" fontWeight={600}>
                      {user?.firstname}
                    </Typography>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <PersonIcon sx={{ mr: 1, color: 'primary.main' }} />
                      <Typography variant="body2" color="text.secondary">
                        Last Name
                      </Typography>
                    </Box>
                    <Typography variant="body1" fontWeight={600}>
                      {user?.lastname}
                    </Typography>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <EmailIcon sx={{ mr: 1, color: 'primary.main' }} />
                      <Typography variant="body2" color="text.secondary">
                        Email Address
                      </Typography>
                    </Box>
                    <Typography variant="body1" fontWeight={600}>
                      {user?.email}
                    </Typography>
                  </Grid>
                </Grid>
              </Paper>

              {/* My Products */}
              <Paper elevation={0} sx={{ p: 4, borderRadius: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <ShopIcon sx={{ mr: 1, color: 'primary.main' }} />
                  <Typography variant="h5" fontWeight={700}>
                    My Products
                  </Typography>
                  <Chip
                    label={userProducts.length}
                    size="small"
                    color="primary"
                    sx={{ ml: 2 }}
                  />
                </Box>

                {userProducts.length === 0 ? (
                  <Box sx={{ textAlign: 'center', py: 4 }}>
                    <Typography color="text.secondary">
                      You haven't created any products yet
                    </Typography>
                    <Button
                      variant="contained"
                      sx={{ mt: 2 }}
                      onClick={() => navigate('/dashboard')}
                    >
                      Create Product
                    </Button>
                  </Box>
                ) : (
                  <Grid container spacing={2}>
                    {userProducts.slice(0, 6).map((product) => (
                      <Grid item xs={12} sm={6} md={4} key={product._id}>
                        <Card
                          sx={{
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            '&:hover': {
                              transform: 'translateY(-4px)',
                              boxShadow: 4,
                            },
                          }}
                          onClick={() => navigate('/dashboard')}
                        >
                          <Box
                            sx={{
                              height: 120,
                              backgroundImage: `url(${product.image})`,
                              backgroundSize: 'contain',
                              backgroundPosition: 'center',
                              backgroundRepeat: 'no-repeat',
                              backgroundColor: '#f5f5f5',
                            }}
                          />
                          <CardContent sx={{ p: 2 }}>
                            <Typography variant="body2" noWrap fontWeight={600}>
                              {product.title}
                            </Typography>
                            <Typography variant="h6" color="primary.main">
                              ${product.price}
                            </Typography>
                          </CardContent>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                )}
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Profile;
