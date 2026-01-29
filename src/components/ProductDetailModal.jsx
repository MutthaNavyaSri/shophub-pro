import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Chip,
  CircularProgress,
  Alert,
  Rating,
} from '@mui/material';
import { useGetProductByIdQuery } from '../redux/api/fakestoreApi';

const ProductDetailModal = ({ open, onClose, productId }) => {
  const {
    data: product,
    isLoading,
    error,
  } = useGetProductByIdQuery(productId, {
    skip: !productId,
  });

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Product Details</DialogTitle>
      <DialogContent>
        {isLoading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
            <CircularProgress />
          </Box>
        )}

        {error && (
          <Alert severity="error">
            Failed to load product details. Please try again.
          </Alert>
        )}

        {product && (
          <Box>
            <Box
              sx={{
                height: 300,
                backgroundImage: `url(${product.image})`,
                backgroundSize: 'contain',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundColor: '#f5f5f5',
                borderRadius: 1,
                mb: 3,
              }}
            />

            <Typography variant="h5" gutterBottom>
              {product.title}
            </Typography>

            <Box sx={{ mb: 2 }}>
              <Chip
                label={product.category}
                color="primary"
                sx={{ mr: 1 }}
              />
              <Typography variant="h4" color="primary" component="span">
                ${product.price}
              </Typography>
            </Box>

            {product.rating && (
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Rating
                  value={product.rating.rate}
                  precision={0.1}
                  readOnly
                  sx={{ mr: 1 }}
                />
                <Typography variant="body2" color="text.secondary">
                  ({product.rating.count} reviews)
                </Typography>
              </Box>
            )}

            <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
              Description
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              {product.description}
            </Typography>

            <Box sx={{ mt: 3, p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
              <Typography variant="caption" display="block" gutterBottom>
                <strong>Product ID:</strong> {product.id}
              </Typography>
              <Typography variant="caption" display="block">
                <strong>Category:</strong> {product.category}
              </Typography>
            </Box>
          </Box>
        )}
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onClose} variant="contained">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProductDetailModal;
