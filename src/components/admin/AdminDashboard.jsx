import React, { useState, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { FaEye, FaEdit, FaTrash, FaPlus, FaCloudUploadAlt, FaTimes } from 'react-icons/fa';
import { 
  MdDashboard, MdInventory, MdShoppingBag, MdPerson, 
  MdAddPhotoAlternate, MdDelete, MdClose
} from 'react-icons/md';
import { label } from 'framer-motion/client';
import { FiLogOut } from "react-icons/fi";
import { useNavigate } from 'react-router-dom';
import { useProductContext } from '../../context/ProductContext';
import { useOrderContext } from '../../context/OrderContext';

const AdminDashboard = () => {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState('overview');
  const { products, loading, error, addProduct, editProduct, deleteProduct } = useProductContext();
  const { orders: contextOrders, loading: ordersLoading, fetchAllOrders, updateOrder, deleteOrder } = useOrderContext();
  const [editingProduct, setEditingProduct] = useState(null);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [adminProfile, setAdminProfile] = useState({
    name: 'Admin User',
    email: 'admin@example.com',
    password: '',
    confirmPassword: ''
  });
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  
  // State for new product form
  const [newProduct, setNewProduct] = useState({
    name: '',
    brand: '',
    type: 'men',
    category: '',
    price: '',
    description: '',
    variants: [],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    availableSizes: [],
    inStock: true
  });
  
  // State for current variant being edited/added
  const [currentVariant, setCurrentVariant] = useState({
    color: '',
    images: [],
    availableSizes: []
  });
  
  // State for image uploads
  const [uploadingImages, setUploadingImages] = useState(false);

  // Fetch orders when orders tab is active
  useEffect(() => {
    if (activeTab === 'orders') {
      fetchAllOrders();
    }
  }, [activeTab, fetchAllOrders]);

  // Handle view order details
  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setShowOrderDetails(true);
  };

  // Handle adding a variant to the product
  const addVariant = () => {
    if (!currentVariant.color) {
      alert('Please specify a color for the variant');
      return;
    }
    
    if (currentVariant.images.length === 0) {
      alert('Please add at least one image for the variant');
      return;
    }
    
    if (currentVariant.availableSizes.length === 0) {
      alert('Please select available sizes for the variant');
      return;
    }
    
    const newVariant = {
      color: currentVariant.color,
      images: [...currentVariant.images],
      availableSizes: [...currentVariant.availableSizes],
      _id: `variant-${Date.now()}`
    };
    
    setNewProduct({
      ...newProduct,
      variants: [...newProduct.variants, newVariant],
      availableSizes: [...new Set([...newProduct.availableSizes, ...currentVariant.availableSizes])]
    });
    
    // Reset current variant
    setCurrentVariant({
      color: '',
      images: [],
      availableSizes: []
    });
  };

  // Handle image upload (simulated)
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (!files || files.length === 0) return;
    
    setUploadingImages(true);
    
    // Store the file objects for later upload to backend
    setCurrentVariant({
      ...currentVariant,
      images: [...currentVariant.images, ...files]
    });
    
    // Create preview URLs
    const previewUrls = files.map(file => URL.createObjectURL(file));
    setCurrentVariant(prev => ({
      ...prev,
      imagePreviews: [...(prev.imagePreviews || []), ...previewUrls]
    }));
    
    setUploadingImages(false);
  };

  // Remove image from variant
  const removeImage = (index) => {
    const updatedImages = [...currentVariant.images];
    const updatedPreviews = [...(currentVariant.imagePreviews || [])];
    
    updatedImages.splice(index, 1);
    updatedPreviews.splice(index, 1);
    
    setCurrentVariant({
      ...currentVariant,
      images: updatedImages,
      imagePreviews: updatedPreviews
    });
  };

  // Toggle size selection for variant
  const toggleSize = (size) => {
    const updatedSizes = [...currentVariant.availableSizes];
    const index = updatedSizes.indexOf(size);
    
    if (index > -1) {
      updatedSizes.splice(index, 1);
    } else {
      updatedSizes.push(size);
    }
    
    setCurrentVariant({
      ...currentVariant,
      availableSizes: updatedSizes
    });
  };

  // Remove variant from product
  const removeVariant = (index) => {
    const updatedVariants = [...newProduct.variants];
    updatedVariants.splice(index, 1);
    setNewProduct({
      ...newProduct,
      variants: updatedVariants
    });
  };

  // Helper function to reset product form
  const resetProductForm = () => {
    setNewProduct({
      name: '',
      brand: '',
      type: 'men',
      category: '',
      price: '',
      description: '',
      variants: [],
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      availableSizes: [],
      inStock: true
    });
    setCurrentVariant({
      color: '',
      images: [],
      availableSizes: []
    });
  };

  // Handle product form submission
  const handleProductSubmit = async (e) => {
    e.preventDefault();
    
    if (newProduct.variants.length === 0) {
      alert('Please add at least one variant');
      return;
    }
    
    try {
      const formData = new FormData();
      
      // Add product data
      formData.append('name', newProduct.name);
      formData.append('brand', newProduct.brand);
      formData.append('type', newProduct.type);
      formData.append('category', newProduct.category);
      formData.append('price', newProduct.price);
      formData.append('description', newProduct.description);
      formData.append('inStock', newProduct.inStock);
      formData.append('sizes', JSON.stringify(newProduct.sizes));
      formData.append('availableSizes', JSON.stringify(newProduct.availableSizes));
      
      // Process variants
      const variantsData = [];
      let imageCounter = 0;
      
      for (const variant of newProduct.variants) {
        const variantData = {
          color: variant.color,
          availableSizes: variant.availableSizes,
          images: [] // Will be populated with image identifiers
        };
        
        // Process each image in the variant
        for (const image of variant.images) {
          if (typeof image === 'string' && image.startsWith('http')) {
            // This is an existing image URL from the database
            variantData.images.push(image);
          } else {
            // This is a new File object that needs to be uploaded
            const fieldName = `image-${imageCounter}`;
            formData.append(fieldName, image);
            variantData.images.push(fieldName);
            imageCounter++;
          }
        }
        
        variantsData.push(variantData);
      }
      
      formData.append('variants', JSON.stringify(variantsData));
      
      if (editingProduct) {
        // Use context's editProduct function with formData
        await editProduct(editingProduct._id, formData);
        setEditingProduct(null);
      } else {
        // Use context's addProduct function with formData
        await addProduct(formData);
      }
      
      setShowAddProduct(false);
      resetProductForm();
      
    } catch (err) {
      alert('Failed to save product: ' + (err.message || 'Unknown error'));
    }
  };

  // Handle delete product
  const handleDeleteProduct = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProduct(id);
        // Products will be automatically updated via context
      } catch (err) {
        alert('Failed to delete product: ' + (err.message || 'Unknown error'));
      }
    }
  };

  // Handle order status update
  const handleOrderStatusUpdate = async (orderId, status) => {
    try {
      await updateOrder(orderId, { status });
      // The context will automatically update the orders list
    } catch (err) {
      alert('Failed to update order status: ' + (err.message || 'Unknown error'));
    }
  };

  // Handle order deletion
  const handleOrderDelete = async (orderId) => {
    if (window.confirm('Are you sure you want to delete this order?')) {
      try {
        await deleteOrder(orderId);
        // The context will automatically update the orders list
      } catch (err) {
        alert('Failed to delete order: ' + (err.message || 'Unknown error'));
      }
    }
  };

  // Handle profile update
  const handleProfileUpdate = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    setAdminProfile({
      ...adminProfile,
      name: formData.get('name'),
      email: formData.get('email')
    });
    alert('Profile updated successfully!');
  };
  
  const navigate = useNavigate();
  const doLogout = ()=>{
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  }

  // Render the dashboard content based on active tab
  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div>
            <h2 className="text-xl font-semibold mb-4" style={{ color: theme.textPrimary }}>Dashboard Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="p-4 rounded-lg shadow" style={{ backgroundColor: theme.bgSecondary }}>
                <h3 className="text-lg font-medium mb-2 flex items-center" style={{ color: theme.textPrimary }}>
                  <MdInventory className="mr-2" /> Total Products
                </h3>
                <p className="text-3xl font-bold" style={{ color: theme.accent }}>{products.length}</p>
              </div>
              <div className="p-4 rounded-lg shadow" style={{ backgroundColor: theme.bgSecondary }}>
                <h3 className="text-lg font-medium mb-2 flex items-center" style={{ color: theme.textPrimary }}>
                  <MdShoppingBag className="mr-2" /> Total Orders
                </h3>
                <p className="text-3xl font-bold" style={{ color: theme.accent }}>{contextOrders.length}</p>
              </div>
              <div className="p-4 rounded-lg shadow" style={{ backgroundColor: theme.bgSecondary }}>
                <h3 className="text-lg font-medium mb-2 flex items-center" style={{ color: theme.textPrimary }}>
                  <MdShoppingBag className="mr-2" /> Pending Orders
                </h3>
                <p className="text-3xl font-bold" style={{ color: theme.accent }}>
                  {contextOrders.filter(order => order.status === 'pending').length}
                </p>
              </div>
            </div>
          </div>
        );
      
      case 'products':
        return (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold flex items-center" style={{ color: theme.textPrimary }}>
                <MdInventory className="mr-2" /> Product Management
              </h2>
              <button 
                onClick={() => setShowAddProduct(true)}
                className="px-4 py-2 rounded font-medium flex items-center"
                style={{ backgroundColor: theme.accent, color: '#fff' }}
              >
                <FaPlus className="mr-2" /> Add New Product
              </button>
            </div>
            
            {showAddProduct || editingProduct ? (
              <div className="mb-6 p-4 rounded-lg shadow" style={{ backgroundColor: theme.bgSecondary }}>
                <h3 className="text-lg font-medium mb-4" style={{ color: theme.textPrimary }}>
                  {editingProduct ? 'Edit Product' : 'Add New Product'}
                </h3>
                <form onSubmit={handleProductSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div>
                      <label className="block mb-2" style={{ color: theme.textPrimary }}>Product Name</label>
                      <input 
                        type="text" 
                        value={newProduct.name}
                        onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                        className="w-full p-2 rounded"
                        style={{ backgroundColor: theme.bgPrimary, color: theme.textPrimary, border: `1px solid ${theme.border}` }}
                        required 
                      />
                    </div>
                    <div>
                      <label className="block mb-2" style={{ color: theme.textPrimary }}>Brand</label>
                      <input 
                        type="text" 
                        value={newProduct.brand}
                        onChange={(e) => setNewProduct({...newProduct, brand: e.target.value})}
                        className="w-full p-2 rounded"
                        style={{ backgroundColor: theme.bgPrimary, color: theme.textPrimary, border: `1px solid ${theme.border}` }}
                        required 
                      />
                    </div>
                    <div>
                      <label className="block mb-2" style={{ color: theme.textPrimary }}>Type</label>
                      <select 
                        value={newProduct.type}
                        onChange={(e) => setNewProduct({...newProduct, type: e.target.value})}
                        className="w-full p-2 rounded"
                        style={{ backgroundColor: theme.bgPrimary, color: theme.textPrimary, border: `1px solid ${theme.border}` }}
                      >
                        <option value="men">Men</option>
                        <option value="women">Women</option>
                        <option value="kids">Kid's</option>
                        <option value="unisex">Unisex</option>
                      </select>
                    </div>
                    <div>
                      <label className="block mb-2" style={{ color: theme.textPrimary }}>Category</label>
                      <input 
                        type="text" 
                        value={newProduct.category}
                        onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                        className="w-full p-2 rounded"
                        style={{ backgroundColor: theme.bgPrimary, color: theme.textPrimary, border: `1px solid ${theme.border}` }}
                        required 
                      />
                      <p className='text-red-600'>&nbsp;write category carefully otherwise it will effect to add product</p>
                    </div>
                    <div>
                      <label className="block mb-2" style={{ color: theme.textPrimary }}>Price</label>
                      <input 
                        type="number" 
                        value={newProduct.price}
                        onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                        className="w-full p-2 rounded"
                        style={{ backgroundColor: theme.bgPrimary, color: theme.textPrimary, border: `1px solid ${theme.border}` }}
                        required 
                      />
                    </div>
                    <div>
                      <label className="block mb-2" style={{ color: theme.textPrimary }}>In Stock</label>
                      <select 
                        value={newProduct.inStock}
                        onChange={(e) => setNewProduct({...newProduct, inStock: e.target.value === 'true'})}
                        className="w-full p-2 rounded"
                        style={{ backgroundColor: theme.bgPrimary, color: theme.textPrimary, border: `1px solid ${theme.border}` }}
                      >
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                      </select>
                    </div>
                    <div className="md:col-span-2">
                      <label className="block mb-2" style={{ color: theme.textPrimary }}>Description</label>
                      <textarea 
                        value={newProduct.description}
                        onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                        rows="3"
                        className="w-full p-2 rounded"
                        style={{ backgroundColor: theme.bgPrimary, color: theme.textPrimary, border: `1px solid ${theme.border}` }}
                        required 
                      ></textarea>
                    </div>
                  </div>
                  
                  {/* Variants Section */}
                  <div className="mb-6">
                    <h4 className="text-lg font-medium mb-4" style={{ color: theme.textPrimary }}>Product Variants</h4>
                    
                    {/* Current Variant Form */}
                    <div className="p-4 rounded-lg mb-4" style={{ backgroundColor: theme.bgPrimary, border: `1px solid ${theme.border}` }}>
                      <h5 className="font-medium mb-3" style={{ color: theme.textPrimary }}>Add New Variant</h5>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <label className="block mb-2" style={{ color: theme.textPrimary }}>Color</label>
                          <input 
                            type="text" 
                            value={currentVariant.color}
                            onChange={(e) => setCurrentVariant({...currentVariant, color: e.target.value})}
                            className="w-full p-2 rounded"
                            style={{ backgroundColor: theme.bgSecondary, color: theme.textPrimary, border: `1px solid ${theme.border}` }}
                            placeholder="e.g., Blue, Red, Black"
                          />
                        </div>
                        <div>
                          <label className="block mb-2" style={{ color: theme.textPrimary }}>Available Sizes</label>
                          <div className="flex flex-wrap gap-2">
                            {newProduct.sizes.map(size => (
                              <button
                                key={size}
                                type="button"
                                onClick={() => toggleSize(size)}
                                className={`px-3 py-1 rounded-full text-sm ${
                                  currentVariant.availableSizes.includes(size) 
                                    ? 'text-white' 
                                    : 'bg-gray-200 text-gray-800'
                                }`}
                                style={{ 
                                  backgroundColor: currentVariant.availableSizes.includes(size) 
                                    ? theme.accent 
                                    : '' 
                                }}
                              >
                                {size}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      {/* Image Upload */}
                      <div className="mb-4">
                        <label className="block mb-2" style={{ color: theme.textPrimary }}>Images</label>
                        <div className="flex items-center gap-4 mb-2">
                          <label className="flex items-center px-4 py-2 rounded cursor-pointer" style={{ backgroundColor: theme.accent, color: '#fff' }}>
                            <FaCloudUploadAlt className="mr-2" />
                            Upload Images
                            <input 
                              type="file" 
                              multiple 
                              className="hidden" 
                              onChange={handleImageUpload}
                              accept="image/*"
                            />
                          </label>
                          {uploadingImages && <span style={{ color: theme.textPrimary }}>Uploading...</span>}
                        </div>
                        
                        <div className="flex flex-wrap gap-2 mt-2">
                          {currentVariant.imagePreviews?.map((img, index) => (
                            <div key={index} className="relative">
                              <img src={img} alt={`Variant ${index}`} className="w-16 h-16 object-cover rounded" />
                              <button 
                                type="button"
                                onClick={() => removeImage(index)}
                                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                              >
                                <FaTimes size={12} />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <button 
                        type="button"
                        onClick={addVariant}
                        className="px-4 py-2 rounded font-medium flex items-center"
                        style={{ backgroundColor: theme.accent, color: '#fff' }}
                      >
                        <FaPlus className="mr-2" /> Add Variant
                      </button>
                    </div>
                    
                    {/* Added Variants List */}
                    {newProduct.variants.length > 0 && (
                      <div>
                        <h5 className="font-medium mb-3" style={{ color: theme.textPrimary }}>Added Variants</h5>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {newProduct.variants.map((variant, index) => (
                            <div key={variant._id} className="p-3 rounded-lg relative" style={{ backgroundColor: theme.bgPrimary, border: `1px solid ${theme.border}` }}>
                              <button 
                                type="button"
                                onClick={() => removeVariant(index)}
                                className="absolute top-2 right-2 text-red-500"
                              >
                                <FaTrash />
                              </button>
                              <p className="font-medium" style={{ color: theme.textPrimary }}>Color: {variant.color}</p>
                              <p className="text-sm" style={{ color: theme.textSecondary }}>
                                Sizes: {(variant.availableSizes || []).join(', ')}
                              </p>
                              <div className="flex mt-2 gap-1">
                                {variant.images.slice(0, 3).map((img, imgIndex) => (
                                  <img key={imgIndex} src={img} alt={`Variant ${index}`} className="w-10 h-10 object-cover rounded" />
                                ))}
                                {variant.images.length > 3 && (
                                  <div className="w-10 h-10 flex items-center justify-center rounded" style={{ backgroundColor: theme.bgSecondary }}>
                                    +{variant.images.length - 3}
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex justify-end mt-4 space-x-2">
                    <button 
                      type="button" 
                      onClick={() => {
                        setShowAddProduct(false);
                        setEditingProduct(null);
                        resetProductForm();
                      }}
                      className="px-4 py-2 rounded font-medium flex items-center"
                      style={{ backgroundColor: theme.bgPrimary, color: theme.textPrimary, border: `1px solid ${theme.border}` }}
                    >
                      <FaTimes className="mr-2" /> Cancel
                    </button>
                    <button 
                      type="submit"
                      className="px-4 py-2 rounded font-medium flex items-center"
                      style={{ backgroundColor: theme.accent, color: '#fff' }}
                    >
                      <FaPlus className="mr-2" /> {editingProduct ? 'Update Product' : 'Add Product'}
                    </button>
                  </div>
                </form>
              </div>
            ) : null}
            
            <div className="overflow-x-auto">
              <table className="min-w-full rounded-lg overflow-hidden" style={{ backgroundColor: theme.bgSecondary }}>
                <thead>
                  <tr style={{ backgroundColor: theme.bgPrimary }}>
                    <th className="py-3 px-4 text-left" style={{ color: theme.textPrimary }}>Product</th>
                    <th className="py-3 px-4 text-left" style={{ color: theme.textPrimary }}>Brand</th>
                    <th className="py-3 px-4 text-left" style={{ color: theme.textPrimary }}>Category</th>
                    <th className="py-3 px-4 text-left" style={{ color: theme.textPrimary }}>Price</th>
                    <th className="py-3 px-4 text-left" style={{ color: theme.textPrimary }}>Variants</th>
                    <th className="py-3 px-4 text-left" style={{ color: theme.textPrimary }}>Stock</th>
                    <th className="py-3 px-4 text-left" style={{ color: theme.textPrimary }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map(product => (
                    <tr key={product._id} style={{ borderBottom: `1px solid ${theme.border}` }}>
                      <td className="py-3 px-4" style={{ color: theme.textPrimary }}>{product.name}</td>
                      <td className="py-3 px-4" style={{ color: theme.textPrimary }}>{product.brand}</td>
                      <td className="py-3 px-4" style={{ color: theme.textPrimary }}>{product.category}</td>
                      <td className="py-3 px-4" style={{ color: theme.textPrimary }}>{product.price}</td>
                      <td className="py-3 px-4" style={{ color: theme.textPrimary }}>{product.variants?.length || 0}</td>
                      <td className="py-3 px-4">
                        <span 
                          className="px-2 py-1 rounded-full text-xs"
                          style={{ 
                            backgroundColor: product.inStock ? '#10B981' : '#EF4444', 
                            color: '#fff' 
                          }}
                        >
                          {product.inStock ? 'In Stock' : 'Out of Stock'}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex space-x-2">
                          <button 
                            onClick={() => {
                              setEditingProduct(product);
                              setNewProduct({
                                ...product,
                                price: product.price.toString(),
                                variants: product.variants.map(variant => ({
                                  ...variant,
                                  images: variant.images
                                }))
                              });
                              setShowAddProduct(true);
                            }}
                            className="p-2 rounded"
                            style={{ backgroundColor: theme.accent, color: '#fff' }}
                            title="Edit"
                          >
                            <FaEdit />
                          </button>
                          <button 
                            onClick={() => handleDeleteProduct(product._id)}
                            className="p-2 rounded"
                            style={{ backgroundColor: '#EF4444', color: '#fff' }}
                            title="Delete"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      
      case 'orders':
        return (
          <div>
            <h2 className="text-xl font-semibold mb-4 flex items-center" style={{ color: theme.textPrimary }}>
              <MdShoppingBag className="mr-2" /> Order Management
            </h2>
            {ordersLoading && <div className="mb-4" style={{ color: theme.textPrimary }}>Loading orders...</div>}
            <div className="overflow-x-auto">
              <table className="min-w-full rounded-lg overflow-hidden" style={{ backgroundColor: theme.bgSecondary }}>
                <thead>
                  <tr style={{ backgroundColor: theme.bgPrimary }}>
                    <th className="py-3 px-4 text-left" style={{ color: theme.textPrimary }}>Order ID</th>
                    <th className="py-3 px-4 text-left" style={{ color: theme.textPrimary }}>Customer</th>
                    <th className="py-3 px-4 text-left" style={{ color: theme.textPrimary }}>Email</th>
                    <th className="py-3 px-4 text-left" style={{ color: theme.textPrimary }}>Phone</th>
                    <th className="py-3 px-4 text-left" style={{ color: theme.textPrimary }}>Date</th>
                    <th className="py-3 px-4 text-left" style={{ color: theme.textPrimary }}>Quantity</th>
                    <th className="py-3 px-4 text-left" style={{ color: theme.textPrimary }}>Status</th>
                    <th className="py-3 px-4 text-left" style={{ color: theme.textPrimary }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {contextOrders.map(order => (
                    <tr key={order._id} style={{ borderBottom: `1px solid ${theme.border}` }}>
                      <td className="py-3 px-4" style={{ color: theme.textPrimary }}>#{order._id?.substring(0, 8)}</td>
                      <td className="py-3 px-4" style={{ color: theme.textPrimary }}>{order.name}</td>
                      <td className="py-3 px-4" style={{ color: theme.textPrimary }}>{order.email}</td>
                      <td className="py-3 px-4" style={{ color: theme.textPrimary }}>{order.phone}</td>
                      <td className="py-3 px-4" style={{ color: theme.textPrimary }}>
                        {new Date(order.createdAt).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-4" style={{ color: theme.textPrimary }}>{order.quantity}</td>
                      <td className="py-3 px-4">
                        <select 
                          value={order.status}
                          onChange={(e) => handleOrderStatusUpdate(order._id, e.target.value)}
                          className="px-2 py-1 rounded"
                          style={{ backgroundColor: theme.bgPrimary, color: theme.textPrimary, border: `1px solid ${theme.border}` }}
                        >
                          <option value="pending">Pending</option>
                          <option value="processing">Processing</option>
                          <option value="shipped">Shipped</option>
                          <option value="delivered">Delivered</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex space-x-2">
                          <button 
                            onClick={() => handleViewOrder(order)}
                            className="p-2 rounded"
                            style={{ backgroundColor: theme.accent, color: '#fff' }}
                            title="View Details"
                          >
                            <FaEye />
                          </button>
                          <button 
                            onClick={() => handleOrderDelete(order._id)}
                            className="p-2 rounded"
                            style={{ backgroundColor: '#EF4444', color: '#fff' }}
                            title="Delete Order"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {contextOrders.length === 0 && !ordersLoading && (
                <div className="text-center py-8" style={{ color: theme.textSecondary }}>
                  No orders found
                </div>
              )}
            </div>
          </div>
        );
      
      case 'profile':
        return (
          <div>
            <h2 className="text-xl font-semibold mb-4 flex items-center" style={{ color: theme.textPrimary }}>
              <MdPerson className="mr-2" /> Admin Profile
            </h2>
            <div className="p-4 rounded-lg shadow" style={{ backgroundColor: theme.bgSecondary }}>
              <form onSubmit={handleProfileUpdate}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-2" style={{ color: theme.textPrimary }}>Name</label>
                    <input 
                      type="text" 
                      name="name"
                      defaultValue={adminProfile.name}
                      className="w-full p-2 rounded"
                      style={{ backgroundColor: theme.bgPrimary, color: theme.textPrimary, border: `1px solid ${theme.border}` }}
                      required 
                    />
                  </div>
                  <div>
                    <label className="block mb-2" style={{ color: theme.textPrimary }}>Email</label>
                    <input 
                      type="email" 
                      name="email"
                      defaultValue={adminProfile.email}
                      className="w-full p-2 rounded"
                      style={{ backgroundColor: theme.bgPrimary, color: theme.textPrimary, border: `1px solid ${theme.border}` }}
                      required 
                    />
                  </div>
                  <div>
                    <label className="block mb-2" style={{ color: theme.textPrimary }}>New Password</label>
                    <input 
                      type="password" 
                      name="password"
                      className="w-full p-2 rounded"
                      style={{ backgroundColor: theme.bgPrimary, color: theme.textPrimary, border: `1px solid ${theme.border}` }}
                    />
                  </div>
                  <div>
                    <label className="block mb-2" style={{ color: theme.textPrimary }}>Confirm Password</label>
                    <input 
                      type="password" 
                      name="confirmPassword"
                      className="w-full p-2 rounded"
                      style={{ backgroundColor: theme.bgPrimary, color: theme.textPrimary, border: `1px solid ${theme.border}` }}
                    />
                  </div>
                </div>
                <div className="mt-6">
                  <button 
                    type="submit"
                    className="px-4 py-2 rounded font-medium flex items-center"
                    style={{ backgroundColor: theme.accent, color: '#fff' }}
                  >
                    <FaEdit className="mr-2" /> Update Profile
                  </button>
                </div>
              </form>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen p-6 overflow-hidden" style={{ backgroundColor: theme.bgPrimary, color: theme.textPrimary }}>
      {/* Order Details Modal */}
      {showOrderDetails && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto" style={{ backgroundColor: theme.bgSecondary }}>
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold" style={{ color: theme.accent }}>
                  Order Details - #{selectedOrder._id?.substring(0, 8)}
                </h2>
                <button
                  onClick={() => setShowOrderDetails(false)}
                  className="text-3xl p-1 rounded-full hover:bg-gray-200 transition-colors"
                  style={{ color: theme.textSecondary }}
                >
                  <MdClose />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Customer Information */}
                <div className="p-4 rounded-md" style={{ backgroundColor: theme.bgPrimary, border: `1px solid ${theme.border}` }}>
                  <h3 className="text-lg font-semibold mb-4" style={{ color: theme.textPrimary }}>Customer Information</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium mb-1" style={{ color: theme.textSecondary }}>Name</label>
                      <p className="text-sm" style={{ color: theme.textPrimary }}>{selectedOrder.name}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1" style={{ color: theme.textSecondary }}>Email</label>
                      <p className="text-sm" style={{ color: theme.textPrimary }}>{selectedOrder.email}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1" style={{ color: theme.textSecondary }}>Phone</label>
                      <p className="text-sm" style={{ color: theme.textPrimary }}>{selectedOrder.phone}</p>
                    </div>
                  </div>
                </div>

                {/* Order Information */}
                <div className="p-4 rounded-md" style={{ backgroundColor: theme.bgPrimary, border: `1px solid ${theme.border}` }}>
                  <h3 className="text-lg font-semibold mb-4" style={{ color: theme.textPrimary }}>Order Information</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium mb-1" style={{ color: theme.textSecondary }}>Order Date</label>
                      <p className="text-sm" style={{ color: theme.textPrimary }}>
                        {new Date(selectedOrder.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1" style={{ color: theme.textSecondary }}>Status</label>
                      <p className="text-sm" style={{ color: theme.textPrimary }}>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          selectedOrder.status === 'delivered' ? 'bg-green-500' :
                          selectedOrder.status === 'cancelled' ? 'bg-red-500' :
                          selectedOrder.status === 'shipped' ? 'bg-blue-500' :
                          selectedOrder.status === 'processing' ? 'bg-yellow-500' :
                          'bg-gray-500'
                        } text-white`}>
                          {selectedOrder.status?.charAt(0).toUpperCase() + selectedOrder.status?.slice(1)}
                        </span>
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1" style={{ color: theme.textSecondary }}>Quantity</label>
                      <p className="text-sm" style={{ color: theme.textPrimary }}>{selectedOrder.quantity}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Delivery Address */}
              <div className="p-4 rounded-md mb-6" style={{ backgroundColor: theme.bgPrimary, border: `1px solid ${theme.border}` }}>
                <h3 className="text-lg font-semibold mb-4" style={{ color: theme.textPrimary }}>Delivery Address</h3>
                <p className="text-sm" style={{ color: theme.textPrimary }}>{selectedOrder.deliveryAddress}</p>
              </div>

              {/* Product Information */}
              {selectedOrder.productName && (
                <div className="p-4 rounded-md mb-6" style={{ backgroundColor: theme.bgPrimary, border: `1px solid ${theme.border}` }}>
                  <h3 className="text-lg font-semibold mb-4" style={{ color: theme.textPrimary }}>Product Information</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium mb-1" style={{ color: theme.textSecondary }}>Product Name</label>
                      <p className="text-sm" style={{ color: theme.textPrimary }}>{selectedOrder.productName}</p>
                    </div>
                    {selectedOrder.productBrand && (
                      <div>
                        <label className="block text-sm font-medium mb-1" style={{ color: theme.textSecondary }}>Brand</label>
                        <p className="text-sm" style={{ color: theme.textPrimary }}>{selectedOrder.productBrand}</p>
                      </div>
                    )}
                    {selectedOrder.productVariant && (
                      <div>
                        <label className="block text-sm font-medium mb-1" style={{ color: theme.textSecondary }}>Variant</label>
                        <p className="text-sm" style={{ color: theme.textPrimary }}>{selectedOrder.productVariant}</p>
                      </div>
                    )}
                    {selectedOrder.productSize && (
                      <div>
                        <label className="block text-sm font-medium mb-1" style={{ color: theme.textSecondary }}>Size</label>
                        <p className="text-sm" style={{ color: theme.textPrimary }}>{selectedOrder.productSize}</p>
                      </div>
                    )}
                    {selectedOrder.productPrice && (
                      <div>
                        <label className="block text-sm font-medium mb-1" style={{ color: theme.textSecondary }}>Price per piece</label>
                        <p className="text-sm" style={{ color: theme.textPrimary }}>₹{selectedOrder.productPrice?.toLocaleString()}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Additional Description */}
              {selectedOrder.description && (
                <div className="p-4 rounded-md mb-6" style={{ backgroundColor: theme.bgPrimary, border: `1px solid ${theme.border}` }}>
                  <h3 className="text-lg font-semibold mb-4" style={{ color: theme.textPrimary }}>Additional Description</h3>
                  <p className="text-sm" style={{ color: theme.textPrimary }}>{selectedOrder.description}</p>
                </div>
              )}

              {/* Order Summary */}
              <div className="p-4 rounded-md" style={{ backgroundColor: theme.bgPrimary, border: `1px solid ${theme.border}` }}>
                <h3 className="text-lg font-semibold mb-4" style={{ color: theme.textPrimary }}>Order Summary</h3>
                <div className="flex justify-between items-center">
                  <span style={{ color: theme.textSecondary }}>Total Amount:</span>
                  <span className="text-xl font-bold" style={{ color: theme.accent }}>
                    ₹{selectedOrder.totalAmount?.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold flex items-center">
          <MdDashboard className="mr-2" /> Welcome Admin 🎉
        </h1>
        <p>You are logged in and can manage products here.</p>
      </div>

      {/* Loading and Error Indicators */}
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="text-white">Saving product...</div>
        </div>
      )}
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
          {error}
          <button 
            onClick={clearError}
            className="absolute top-0 right-0 p-2"
          >
            <FaTimes />
          </button>
        </div>
      )}
      
      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar Navigation */}
        <div className="w-full md:w-64 flex-shrink-0">
          <div className="rounded-lg shadow p-4" style={{ backgroundColor: theme.bgSecondary }}>
            <h2 className="text-lg font-semibold mb-4 flex items-center" style={{ color: theme.textPrimary }}>
              <MdDashboard className="mr-2" /> Admin Panel
            </h2>
            <nav>
              <ul className="space-y-2">
                {[
                  { id: 'overview', label: 'Dashboard Overview', icon: <MdDashboard /> },
                  { id: 'products', label: 'Products', icon: <MdInventory /> },
                  { id: 'orders', label: 'Orders', icon: <MdShoppingBag /> },
                  { id: 'profile', label: 'Profile', icon: <MdPerson /> }
                ].map(item => (
                  <li key={item.id}>
                    <button
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full text-left px-4 py-2 rounded flex items-center space-x-2 ${
                        activeTab === item.id ? 'font-semibold' : ''
                      }`}
                      style={{
                        backgroundColor: activeTab === item.id ? theme.accent : 'transparent',
                        color: activeTab === item.id ? '#fff' : theme.textPrimary
                      }}
                    >
                      <span>{item.icon}</span>
                      <span>{item.label}</span>
                    </button>
                  </li>
                ))}
                <li key="logout">
                  <button
                    onClick={doLogout}
                    className={`w-full text-left px-4 py-2 rounded flex items-center space-x-2 hover:bg-red-600`}
                  >
                    <FiLogOut/> Logout
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="flex-1">
          <div className="rounded-lg shadow p-6 w-[97%]" style={{ backgroundColor: theme.bgSecondary }}>
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;