import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  Container,
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  AppBar,
  Toolbar,
  Chip,
  Stack,
} from '@mui/material';
import {
  ShoppingCart as ShopIcon,
  TrendingUp as TrendingIcon,
  Security as SecurityIcon,
  LocalShipping as ShippingIcon,
  ArrowForward as ArrowIcon,
} from '@mui/icons-material';
import { keyframes } from '@mui/system';

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const float = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
`;

const pulse = keyframes`
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
`;

const Home = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const features = [
    {
      icon: <ShopIcon sx={{ fontSize: 48, color: 'primary.main' }} />,
      title: 'Vast Selection',
      description: 'Browse through thousands of products across multiple categories',
    },
    {
      icon: <TrendingIcon sx={{ fontSize: 48, color: 'secondary.main' }} />,
      title: 'Best Deals',
      description: 'Get the best prices and exclusive deals on trending items',
    },
    {
      icon: <SecurityIcon sx={{ fontSize: 48, color: 'success.main' }} />,
      title: 'Secure Shopping',
      description: 'Shop with confidence using our secure payment system',
    },
    {
      icon: <ShippingIcon sx={{ fontSize: 48, color: 'primary.main' }} />,
      title: 'Fast Delivery',
      description: 'Quick and reliable shipping right to your doorstep',
    },
  ];

  return (
    <>
      {/* Navbar */}
      <AppBar
        position="static"
        elevation={0}
        sx={{
          background: 'linear-gradient(135deg, #6366f1 0%, #ec4899 100%)',
        }}
      >
        <Toolbar>
          <Typography
            variant="h5"
            component="div"
            sx={{
              flexGrow: 1,
              fontWeight: 700,
              letterSpacing: '-0.5px',
            }}
          >
            🛍️ ShopHub Pro
          </Typography>
          {user ? (
            <>
              <Button
                color="inherit"
                onClick={() => navigate('/dashboard')}
                sx={{ mr: 2 }}
              >
                Dashboard
              </Button>
              <Button
                color="inherit"
                onClick={() => navigate('/profile')}
              >
                Profile
              </Button>
            </>
          ) : (
            <>
              <Button
                color="inherit"
                onClick={() => navigate('/login')}
                sx={{ mr: 2 }}
              >
                Login
              </Button>
              <Button
                variant="contained"
                onClick={() => navigate('/signup')}
                sx={{
                  bgcolor: 'white',
                  color: 'primary.main',
                  '&:hover': {
                    bgcolor: 'rgba(255, 255, 255, 0.9)',
                  },
                }}
              >
                Sign Up
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>

      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #6366f1 0%, #ec4899 100%)',
          color: 'white',
          py: 12,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  animation: `${fadeInUp} 0.8s ease-out`,
                }}
              >
                <Chip
                  label="🎉 New Launch"
                  sx={{
                    bgcolor: 'rgba(255, 255, 255, 0.2)',
                    color: 'white',
                    mb: 2,
                    fontWeight: 600,
                  }}
                />
                <Typography
                  variant="h1"
                  sx={{
                    mb: 3,
                    fontWeight: 800,
                    fontSize: { xs: '2.5rem', md: '3.5rem' },
                    lineHeight: 1.2,
                  }}
                >
                  Shop Smarter with ShopHub Pro
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    mb: 4,
                    opacity: 0.95,
                    fontWeight: 400,
                    fontSize: { xs: '1rem', md: '1.25rem' },
                  }}
                >
                  Discover amazing products at unbeatable prices. Your one-stop destination for all your shopping needs.
                </Typography>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  <Button
                    variant="contained"
                    size="large"
                    endIcon={<ArrowIcon />}
                    onClick={() => navigate(user ? '/dashboard' : '/signup')}
                    sx={{
                      bgcolor: 'white',
                      color: 'primary.main',
                      px: 4,
                      py: 1.5,
                      fontSize: '1.1rem',
                      '&:hover': {
                        bgcolor: 'rgba(255, 255, 255, 0.9)',
                        transform: 'translateY(-2px)',
                        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)',
                      },
                      transition: 'all 0.3s ease',
                    }}
                  >
                    {user ? 'Browse Products' : 'Get Started'}
                  </Button>
                  <Button
                    variant="outlined"
                    size="large"
                    onClick={() => navigate('/dashboard')}
                    sx={{
                      borderColor: 'white',
                      color: 'white',
                      px: 4,
                      py: 1.5,
                      fontSize: '1.1rem',
                      '&:hover': {
                        borderColor: 'white',
                        bgcolor: 'rgba(255, 255, 255, 0.1)',
                        transform: 'translateY(-2px)',
                      },
                      transition: 'all 0.3s ease',
                    }}
                  >
                    Explore Now
                  </Button>
                </Stack>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  animation: `${float} 3s ease-in-out infinite`,
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <Box
                  sx={{
                    width: 300,
                    height: 300,
                    background: 'rgba(255, 255, 255, 0.1)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backdropFilter: 'blur(10px)',
                    border: '2px solid rgba(255, 255, 255, 0.2)',
                  }}
                >
                  <ShopIcon sx={{ fontSize: 150, opacity: 0.8 }} />
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: 10 }}>
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography
            variant="h2"
            sx={{
              mb: 2,
              fontWeight: 700,
              background: 'linear-gradient(135deg, #6366f1 0%, #ec4899 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Why Choose ShopHub Pro?
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Experience the future of online shopping
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card
                sx={{
                  height: '100%',
                  textAlign: 'center',
                  p: 3,
                  animation: `${fadeInUp} 0.8s ease-out ${index * 0.1}s both`,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    animation: `${pulse} 0.5s ease-in-out`,
                  },
                }}
              >
                <CardContent>
                  <Box sx={{ mb: 2 }}>{feature.icon}</Box>
                  <Typography variant="h6" gutterBottom fontWeight={600}>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* CTA Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #6366f1 0%, #ec4899 100%)',
          py: 8,
          color: 'white',
        }}
      >
        <Container maxWidth="md">
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h3" sx={{ mb: 2, fontWeight: 700 }}>
              Ready to Start Shopping?
            </Typography>
            <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
              Join thousands of satisfied customers today
            </Typography>
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate(user ? '/dashboard' : '/signup')}
              sx={{
                bgcolor: 'white',
                color: 'primary.main',
                px: 6,
                py: 2,
                fontSize: '1.2rem',
                '&:hover': {
                  bgcolor: 'rgba(255, 255, 255, 0.9)',
                  transform: 'scale(1.05)',
                },
              }}
            >
              {user ? 'Start Shopping' : 'Create Free Account'}
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Footer */}
      <Box sx={{ bgcolor: '#1e293b', color: 'white', py: 4 }}>
        <Container maxWidth="lg">
          <Typography variant="body2" align="center">
            © 2026 ShopHub Pro. All rights reserved.
          </Typography>
        </Container>
      </Box>
    </>
  );
};

export default Home;
