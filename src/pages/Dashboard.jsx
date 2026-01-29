import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Box,
  Grid,
  Card,
  CardContent,
  CardActions,
  IconButton,
  Chip,
  CircularProgress,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Fab,
} from '@mui/material';
import {
  Logout as LogoutIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as ViewIcon,
} from '@mui/icons-material';
import { toast } from 'react-toastify';
import { logout } from '../redux/slices/authSlice';
import {
  useGetAllProductsQuery,
  useGetUserQuery,
  useGetProductsByCategoryQuery,
  useGetAllCategoriesQuery,
  useDeleteProductMutation,
} from '../redux/api/fakestoreApi';
import ProductModal from '../components/ProductModal';
import ProductDetailModal from '../components/ProductDetailModal';

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userId } = useSelector((state) => state.auth);

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [modalOpen, setModalOpen] = useState(false);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [viewingProductId, setViewingProductId] = useState(null);

  // Fetch user data
  const { data: userData } = useGetUserQuery();

  // Fetch products based on category
  const {
    data: allProducts,
    isLoading: allProductsLoading,
    error: allProductsError,
  } = useGetAllProductsQuery(undefined, {
    skip: selectedCategory !== 'all',
  });

  const {
    data: categoryProducts,
    isLoading: categoryProductsLoading,
    error: categoryProductsError,
  } = useGetProductsByCategoryQuery(selectedCategory, {
    skip: selectedCategory === 'all',
  });

  // Fetch categories
  const { data: categories } = useGetAllCategoriesQuery();

  // Delete product mutation
  const [deleteProduct, { isLoading: deleteLoading }] = useDeleteProductMutation();

  const products = selectedCategory === 'all' ? allProducts : categoryProducts;
  const isLoading = allProductsLoading || categoryProductsLoading;
  const error = allProductsError || categoryProductsError;

  const handleLogout = () => {
    dispatch(logout());
    toast.info('Logged out successfully');
    navigate('/login');
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleAddProduct = () => {
    setEditingProduct(null);
    setModalOpen(true);
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setModalOpen(true);
  };

  const handleViewProduct = (productId) => {
    setViewingProductId(productId);
    setDetailModalOpen(true);
  };

  const handleDeleteProduct = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProduct(productId).unwrap();
        toast.success('Product deleted successfully!');
      } catch (err) {
        console.error('Delete error:', err);
        toast.error(err?.data?.message || 'Failed to delete product');
      }
    }
  };

  return (
    <>
      {/* AppBar */}
      <AppBar 
        position="static" 
        elevation={0}
        sx={{
          background: 'linear-gradient(135deg, #2563eb 0%, #0ea5e9 100%)',
        }}
      >
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 700 }}>
            🛍️ ShopHub Pro
          </Typography>
          {userData && (
            <Button 
              color="inherit" 
              onClick={() => navigate('/profile')}
              sx={{ mr: 2 }}
            >
              {userData.name?.firstname || userData.firstname || 'User'}
            </Button>
          )}
          <Button color="inherit" onClick={handleLogout} startIcon={<LogoutIcon />}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Box
        sx={{
          minHeight: 'calc(100vh - 64px)',
          background: 'linear-gradient(135deg, #f8fafc 0%, #e0e7ff 100%)',
          py: 4,
        }}
      >
        <Container maxWidth="lg">

        {/* Category Filter */}
        <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel>Category</InputLabel>
            <Select
              value={selectedCategory}
              label="Category"
              onChange={handleCategoryChange}
              sx={{
                bgcolor: 'white',
                borderRadius: 2,
              }}
            >
              <MenuItem value="all">All Products</MenuItem>
              {categories?.map((category) => (
                <MenuItem key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleAddProduct}
            sx={{
              borderRadius: 2,
              px: 3,
              py: 1.5,
              boxShadow: '0 4px 12px rgba(99, 102, 241, 0.3)',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 6px 16px rgba(99, 102, 241, 0.4)',
              },
              transition: 'all 0.3s ease',
            }}
          >
            Add Product
          </Button>
        </Box>

        {/* Products Grid */}
        {isLoading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <CircularProgress />
          </Box>
        )}

        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            Failed to load products. Please try again.
          </Alert>
        )}

        {!isLoading && !error && products && (
          <Grid container spacing={3}>
            {products.map((product) => (
              <Grid item xs={12} sm={6} md={4} key={product._id}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <Box
                    sx={{
                      height: 200,
                      backgroundImage: `url(${product.image})`,
                      backgroundSize: 'contain',
                      backgroundPosition: 'center',
                      backgroundRepeat: 'no-repeat',
                      backgroundColor: '#f5f5f5',
                    }}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h6" component="h2" noWrap>
                      {product.title}
                    </Typography>
                    <Chip
                      label={product.category}
                      size="small"
                      color="primary"
                      sx={{ mb: 1 }}
                    />
                    <Typography variant="h6" color="primary" gutterBottom>
                      ${product.price}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                      }}
                    >
                      {product.description}
                    </Typography>
                  </CardContent>
                  <CardActions sx={{ justifyContent: 'space-between', px: 2, pb: 2 }}>
                    <IconButton
                      size="small"
                      color="info"
                      onClick={() => handleViewProduct(product._id)}
                    >
                      <ViewIcon />
                    </IconButton>
                    <IconButton
                      size="small"
                      color="primary"
                      onClick={() => handleEditProduct(product)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => handleDeleteProduct(product._id)}
                      disabled={deleteLoading}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}

        {!isLoading && !error && products?.length === 0 && (
          <Alert severity="info" sx={{ mt: 2 }}>
            No products found in this category.
          </Alert>
        )}
        </Container>
      </Box>

      {/* Floating Action Button */}
      <Fab
        color="primary"
        aria-label="add"
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
        onClick={handleAddProduct}
      >
        <AddIcon />
      </Fab>

      {/* Product Modal (Create/Edit) */}
      <ProductModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        product={editingProduct}
      />

      {/* Product Detail Modal (View) */}
      <ProductDetailModal
        open={detailModalOpen}
        onClose={() => setDetailModalOpen(false)}
        productId={viewingProductId}
      />
    </>
  );
};

export default Dashboard;
