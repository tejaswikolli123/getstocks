import React from 'react';
import { Pagination, Box } from '@mui/material';

const CardPagination = ({ totalItems, itemsPerPage, currentPage, onPageChange }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (event, value) => {
    onPageChange(value); // Update the current page in the parent component
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      marginTop={3}
      padding={2}  // Added padding around the pagination
      sx={{
        borderRadius: 2,  // Border radius for a smoother edge
        boxShadow: 3,     // Adding shadow effect for better visual depth
        backgroundColor: '#f5f5f5', // Light gray background color
        width: '100%',  // Ensure it takes the full width of its container
        maxWidth: 600,  // Limit max width to 600px for better responsiveness
      }}
    >
      <Pagination
        count={totalPages} // Total number of pages
        page={currentPage} // Current active page
        onChange={handlePageChange} // Handle page change
        color="primary"
        size="large"  // Use a larger pagination size for better visibility
        siblingCount={1} // Show one sibling page number on each side for more context
        boundaryCount={2} // Show 2 boundary page numbers (first and last)
      />
    </Box>
  );
};

export default CardPagination;
