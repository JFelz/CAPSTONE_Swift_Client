import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { FormLabel } from '@mui/material';
import { getAllProducts } from '../../api/productData';
import ClientProductCard from './ClientProductCard';

export default function CategoryBar() {
  const [productType, setProductType] = useState('all');
  const [products, setProducts] = useState();

  const displayProducts = () => {
    getAllProducts().then(setProducts);
  };

  useEffect(() => {
    displayProducts();
  }, []);

  const handleChange = (e) => {
    setProductType(e.target.value);
    console.log(productType);
  };

  return (
    <>
      <Box sx={{ width: '50%', display: 'flex', flexDirection: 'column' }}>
        <FormControl sx={{ width: '50%', margin: '20px' }}>
          <FormLabel>Category</FormLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={productType}
            label={productType}
            onChange={handleChange}
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="beginner">Beginner</MenuItem>
            <MenuItem value="carving">Carving</MenuItem>
            <MenuItem value="cruiser">Cruiser</MenuItem>
            <MenuItem value="dance">Dance</MenuItem>
            <MenuItem value="downhill">Downhill</MenuItem>
            <MenuItem value="electric">Electric</MenuItem>
            <MenuItem value="freeride">Freeride</MenuItem>
            <MenuItem value="pintail">Pintail</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box>
        <div className="d-flex flex-wrap justify-content-center">
          {products?.map((product) => (product.category === productType ? <ClientProductCard key={product.id} prodObj={product} onUpdate={displayProducts} /> : ''))}
        </div>
        <div className="d-flex flex-wrap justify-content-center">
          {products?.map((product) => (productType === 'all' ? <ClientProductCard key={product.id} prodObj={product} onUpdate={displayProducts} /> : ''))}
        </div>
      </Box>
    </>
  );
}
