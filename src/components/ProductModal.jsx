import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  ToggleButtonGroup,
  ToggleButton,
  CircularProgress,
  IconButton,
  Typography,
} from '@mui/material';
import { CloudUpload as UploadIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { toast } from 'react-toastify';
import {
  useCreateProductMutation,
  useUpdateProductMutation,
  usePatchProductMutation,
  useGetAllCategoriesQuery,
} from '../redux/api/fakestoreApi';

const ProductModal = ({ open, onClose, product }) => {
  const isEditMode = !!product;
  const [updateMode, setUpdateMode] = useState('PUT'); // PUT or PATCH
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [uploading, setUploading] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    price: '',
    description: '',
    image: '',
    category: '',
  });

  const { data: categories, isLoading: categoriesLoading } = useGetAllCategoriesQuery();
  const [createProduct, { isLoading: createLoading }] = useCreateProductMutation();
  const [updateProduct, { isLoading: updateLoading }] = useUpdateProductMutation();
  const [patchProduct, { isLoading: patchLoading }] = usePatchProductMutation();

  const isLoading = createLoading || updateLoading || patchLoading;

  useEffect(() => {
    if (open) {
      if (product) {
        setFormData({
          title: product.title || '',
          price: product.price || '',
          description: product.description || '',
          image: product.image || '',
          category: product.category || '',
        });
        setImagePreview(product.image || '');
        setImageFile(null);
      } else {
        setFormData({
          title: '',
          price: '',
          description: '',
          image: '',
          category: '',
        });
        setImagePreview('');
        setImageFile(null);
      }
    }
  }, [product, open]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file size (5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image size should be less than 5MB');
        return;
      }

      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast.error('Please select an image file');
        return;
      }

      setImageFile(file);
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview('');
    setFormData({ ...formData, image: '' });
  };

  const uploadImage = async () => {
    if (!imageFile) return formData.image;

    setUploading(true);
    try {
      const token = localStorage.getItem('token');
      const uploadFormData = new FormData();
      uploadFormData.append('image', imageFile);

      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      const response = await fetch(`${API_URL}/upload/upload`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: uploadFormData,
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const data = await response.json();
      return data.url;
    } catch (error) {
      toast.error('Failed to upload image');
      throw error;
    } finally {
      setUploading(false);
    }
  };

  const handleUpdateModeChange = (event, newMode) => {
    if (newMode !== null) {
      setUpdateMode(newMode);
    }
  };

  const handleSubmit = async (e) => {
    if (e) {
      e.preventDefault();
    }

    // Validation
    if (!formData.title || !formData.price || !formData.category) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      // Upload image if a file is selected
      let imageUrl = formData.image;
      if (imageFile) {
        imageUrl = await uploadImage();
      }

      const productData = {
        title: formData.title,
        price: parseFloat(formData.price),
        description: formData.description || '',
        image: imageUrl || 'https://via.placeholder.com/300',
        category: formData.category,
      };

      console.log('Submitting product data:', productData);

      if (isEditMode) {
        // Update existing product
        if (updateMode === 'PUT') {
          // Full update (PUT)
          const result = await updateProduct({
            id: product._id,
            ...productData,
          }).unwrap();
          console.log('PUT update result:', result);
          toast.success('Product updated successfully (PUT)!');
        } else {
          // Partial update (PATCH)
          // Only send changed fields
          const changedFields = {};
          Object.keys(formData).forEach((key) => {
            if (formData[key] !== product[key]) {
              changedFields[key] = key === 'price' ? parseFloat(formData[key]) : formData[key];
            }
          });

          if (Object.keys(changedFields).length === 0) {
            toast.info('No changes detected');
            onClose();
            return;
          }

          console.log('PATCH fields:', changedFields);
          const result = await patchProduct({
            id: product._id,
            ...changedFields,
          }).unwrap();
          console.log('PATCH update result:', result);
          toast.success('Product updated successfully (PATCH)!');
        }
      } else {
        // Create new product (POST)
        const result = await createProduct(productData).unwrap();
        console.log('Create product result:', result);
        toast.success('Product created successfully!');
      }

      // Reset form and close
      setFormData({
        title: '',
        price: '',
        description: '',
        image: '',
        category: '',
      });
      onClose();
    } catch (err) {
      console.error('Submit error:', err);
      toast.error(
        err?.data?.message || (isEditMode
          ? 'Failed to update product'
          : 'Failed to create product')
      );
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        {isEditMode ? 'Edit Product' : 'Create New Product'}
      </DialogTitle>
      <DialogContent>
        {isEditMode && (
          <Box sx={{ mb: 2, mt: 1 }}>
            <InputLabel sx={{ mb: 1, fontSize: '0.875rem' }}>Update Method:</InputLabel>
            <ToggleButtonGroup
              value={updateMode}
              exclusive
              onChange={handleUpdateModeChange}
              size="small"
              fullWidth
            >
              <ToggleButton value="PUT">
                PUT (Full Update)
              </ToggleButton>
              <ToggleButton value="PATCH">
                PATCH (Partial Update)
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>
        )}

        <Box component="form" onSubmit={handleSubmit} noValidate>
          <TextField
            margin="normal"
            required
            fullWidth
            id="title"
            label="Product Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            disabled={isLoading}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            id="price"
            label="Price"
            name="price"
            type="number"
            inputProps={{ step: '0.01', min: '0' }}
            value={formData.price}
            onChange={handleChange}
            disabled={isLoading}
          />

          <FormControl fullWidth margin="normal" required>
            <InputLabel>Category</InputLabel>
            <Select
              name="category"
              value={formData.category}
              label="Category"
              onChange={handleChange}
              disabled={isLoading || categoriesLoading}
            >
              {categoriesLoading ? (
                <MenuItem disabled>Loading categories...</MenuItem>
              ) : categories && categories.length > 0 ? (
                categories.map((cat) => (
                  <MenuItem key={cat} value={cat}>
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </MenuItem>
                ))
              ) : (
                <MenuItem disabled>No categories available</MenuItem>
              )}
            </Select>
          </FormControl>

          <TextField
            margin="normal"
            fullWidth
            id="description"
            label="Description"
            name="description"
            multiline
            rows={4}
            value={formData.description}
            onChange={handleChange}
            disabled={isLoading || uploading}
          />

          {/* Image Upload Section */}
          <Box sx={{ mt: 2, mb: 2 }}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              Product Image
            </Typography>
            
            <input
              accept="image/*"
              style={{ display: 'none' }}
              id="image-upload"
              type="file"
              onChange={handleImageChange}
            />
            
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
              <label htmlFor="image-upload">
                <Button
                  variant="outlined"
                  component="span"
                  startIcon={<UploadIcon />}
                  disabled={isLoading || uploading}
                >
                  {imageFile ? 'Change Image' : 'Upload Image'}
                </Button>
              </label>

              {imagePreview && (
                <IconButton
                  onClick={handleRemoveImage}
                  color="error"
                  disabled={isLoading || uploading}
                  size="small"
                >
                  <DeleteIcon />
                </IconButton>
              )}

              {uploading && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <CircularProgress size={20} />
                  <Typography variant="caption">Uploading...</Typography>
                </Box>
              )}
            </Box>

            {imagePreview && (
              <Box
                sx={{
                  mt: 2,
                  height: 200,
                  border: '2px dashed #ccc',
                  borderRadius: 2,
                  overflow: 'hidden',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#f5f5f5',
                }}
              >
                <img
                  src={imagePreview}
                  alt="Preview"
                  style={{
                    maxWidth: '100%',
                    maxHeight: '100%',
                    objectFit: 'contain',
                  }}
                />
              </Box>
            )}

            <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
              Supported formats: JPG, PNG, GIF, WebP (Max 5MB)
            </Typography>
          </Box>

          {/* Optional: Image URL input as fallback */}
          <TextField
            margin="normal"
            fullWidth
            id="image"
            label="Or paste Image URL"
            name="image"
            value={formData.image}
            onChange={handleChange}
            disabled={isLoading || uploading || !!imageFile}
            helperText={imageFile ? "Remove uploaded image to use URL" : ""}
          />
        </Box>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onClose} disabled={isLoading || uploading}>
          Cancel
        </Button>
        <Button
          onClick={(e) => {
            e.preventDefault();
            handleSubmit(e);
          }}
          variant="contained"
          disabled={isLoading || uploading}
        >
          {isLoading || uploading ? (
            <CircularProgress size={24} />
          ) : isEditMode ? (
            `Update (${updateMode})`
          ) : (
            'Create'
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProductModal;
