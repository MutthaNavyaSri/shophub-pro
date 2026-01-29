# API Documentation

## Fakestore API Integration

Base URL: `https://fakestoreapi.com`

### Authentication

#### Login
```
POST /auth/login
Content-Type: application/json

{
  "username": "mor_2314",
  "password": "83r5^_"
}

Response:
{
  "token": "eyJhbGciOiJIUzI1NiIsInR..."
}
```

### Users

#### Get User by ID
```
GET /users/{id}

Response:
{
  "id": 1,
  "email": "john@gmail.com",
  "username": "johnd",
  "password": "m38rmF$",
  "name": {
    "firstname": "john",
    "lastname": "doe"
  },
  "address": {...},
  "phone": "1-570-236-7033"
}
```

### Products

#### Get All Products
```
GET /products

Response: Array of products
```

#### Get Single Product
```
GET /products/{id}

Response:
{
  "id": 1,
  "title": "Fjallraven - Foldsack No. 1 Backpack",
  "price": 109.95,
  "description": "Your perfect pack...",
  "category": "men's clothing",
  "image": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
  "rating": {
    "rate": 3.9,
    "count": 120
  }
}
```

#### Get Products by Category
```
GET /products/category/{category}

Categories:
- electronics
- jewelery
- men's clothing
- women's clothing
```

#### Get All Categories
```
GET /products/categories

Response: ["electronics", "jewelery", "men's clothing", "women's clothing"]
```

#### Create Product
```
POST /products
Content-Type: application/json

{
  "title": "test product",
  "price": 13.5,
  "description": "lorem ipsum set",
  "image": "https://i.pravatar.cc",
  "category": "electronic"
}

Response:
{
  "id": 21,
  ...productData
}
```

#### Update Product (PUT - Full Update)
```
PUT /products/{id}
Content-Type: application/json

{
  "title": "updated product",
  "price": 99.99,
  "description": "updated description",
  "image": "https://i.pravatar.cc",
  "category": "electronic"
}

Response: Updated product object
```

#### Update Product (PATCH - Partial Update)
```
PATCH /products/{id}
Content-Type: application/json

{
  "price": 99.99
}

Response: Updated product object with only specified fields changed
```

#### Delete Product
```
DELETE /products/{id}

Response:
{
  "id": 1,
  "title": "...",
  ...deletedProductData
}
```

## Redux RTK Query Hooks

### Queries (Data Fetching)
- `useGetAllProductsQuery()` - Fetch all products
- `useGetProductByIdQuery(id)` - Fetch single product
- `useGetProductsByCategoryQuery(category)` - Fetch by category
- `useGetAllCategoriesQuery()` - Fetch categories
- `useGetUserQuery(userId)` - Fetch user data

### Mutations (Data Modification)
- `useLoginMutation()` - Login user
- `useCreateProductMutation()` - Create product (POST)
- `useUpdateProductMutation()` - Update product (PUT)
- `usePatchProductMutation()` - Partial update (PATCH)
- `useDeleteProductMutation()` - Delete product (DELETE)

## Example Usage

### In Components
```javascript
import { useGetAllProductsQuery, useDeleteProductMutation } from '../redux/api/fakestoreApi';

function ProductList() {
  const { data: products, isLoading, error } = useGetAllProductsQuery();
  const [deleteProduct] = useDeleteProductMutation();

  const handleDelete = async (id) => {
    try {
      await deleteProduct(id).unwrap();
      toast.success('Deleted!');
    } catch (err) {
      toast.error('Failed!');
    }
  };

  if (isLoading) return <CircularProgress />;
  if (error) return <Alert>Error!</Alert>;

  return products.map(product => (
    <ProductCard key={product.id} product={product} onDelete={handleDelete} />
  ));
}
```

## Important Notes

⚠️ **Fakestore API Limitations:**
1. All POST/PUT/PATCH/DELETE operations are simulated
2. Data is not actually stored in a database
3. API returns realistic responses for testing
4. Perfect for frontend development and testing
5. For production, replace with real backend API

## Error Handling

All API calls include automatic error handling:
- Network errors
- Server errors (500+)
- Client errors (400+)
- Timeout errors

RTK Query automatically retries failed requests and provides loading/error states.
