import React from 'react';
import { Pagination, Box } from '@mui/material';

const CardPagination = ({ totalItems, itemsPerPage, currentPage, onPageChange }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (event, value) => {
    onPageChange(value); 
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      marginTop={3}
      padding={2}  
      sx={{
        borderRadius: 2,  
        boxShadow: 3,    
        backgroundColor: '#f5f5f5', 
        width: '100%',  
        maxWidth: 600,  
      }}
    >
      <Pagination
        count={totalPages} 
        page={currentPage} 
        onChange={handlePageChange} 
        color="primary"
        size="large" 
        siblingCount={1} 
        boundaryCount={2} 
      />
    </Box>
  );
};

export default CardPagination;
