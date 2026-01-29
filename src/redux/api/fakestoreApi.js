import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const fakestoreApi = createApi({
  reducerPath: 'fakestoreApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: API_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Products', 'User'],
  refetchOnMountOrArgChange: true, // Always refetch on mount for fresh data
  endpoints: (builder) => ({
    // Authentication
    login: builder.mutation({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    
    // Signup
    signup: builder.mutation({
      query: (userData) => ({
        url: '/auth/signup',
        method: 'POST',
        body: userData,
      }),
    }),
    
    // Get current user
    getUser: builder.query({
      query: () => '/auth/profile',
      providesTags: ['User'],
    }),
    
    // Get all products
    getAllProducts: builder.query({
      query: () => '/products',
      providesTags: (result) =>
        result
          ? [...result.map(({ _id }) => ({ type: 'Products', id: _id })), { type: 'Products', id: 'LIST' }]
          : [{ type: 'Products', id: 'LIST' }],
    }),
    
    // Get product by ID
    getProductById: builder.query({
      query: (id) => `/products/${id}`,
      providesTags: (result, error, id) => [{ type: 'Products', id }],
    }),
    
    // Get products by category
    getProductsByCategory: builder.query({
      query: (category) => `/products/category/${category}`,
      providesTags: (result, error, category) =>
        result
          ? [...result.map(({ _id }) => ({ type: 'Products', id: _id })), { type: 'Products', id: 'LIST' }]
          : [{ type: 'Products', id: 'LIST' }],
    }),
    
    // Get all categories
    getAllCategories: builder.query({
      query: () => '/products/categories',
    }),
    
    // Create product (POST)
    createProduct: builder.mutation({
      query: (product) => ({
        url: '/products',
        method: 'POST',
        body: product,
      }),
      invalidatesTags: [{ type: 'Products', id: 'LIST' }],
    }),
    
    // Update product (PUT)
    updateProduct: builder.mutation({
      query: ({ id, ...product }) => ({
        url: `/products/${id}`,
        method: 'PUT',
        body: product,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Products', id }, { type: 'Products', id: 'LIST' }],
    }),
    
    // Partial update product (PATCH)
    patchProduct: builder.mutation({
      query: ({ id, ...updates }) => ({
        url: `/products/${id}`,
        method: 'PATCH',
        body: updates,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Products', id }, { type: 'Products', id: 'LIST' }],
    }),
    
    // Delete product (DELETE)
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/products/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [{ type: 'Products', id }, { type: 'Products', id: 'LIST' }],
    }),
  }),
});

export const {
  useLoginMutation,
  useSignupMutation,
  useGetUserQuery,
  useGetAllProductsQuery,
  useGetProductByIdQuery,
  useGetProductsByCategoryQuery,
  useGetAllCategoriesQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  usePatchProductMutation,
  useDeleteProductMutation,
} = fakestoreApi;

// Alias for compatibility
export const useGetProductsQuery = useGetAllProductsQuery;
