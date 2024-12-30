import React, { useState, useEffect } from 'react';
import { Grid, Card, CardContent, Typography, CircularProgress, Alert, Box } from '@mui/material';
import CardPagination from './CardPagination';

const FetchCard = () => {
  const [data, setData] = useState([]); // State to store fetched data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [currentPage, setCurrentPage] = useState(1); // Current page state
  const itemsPerPage = 3; // Number of cards per page

  // Fetch data from API when component mounts
  useEffect(() => {
    const fetchData = async () => {
      const url = 'https://api.freeapi.app/api/v1/public/stocks';
      const options = { method: 'GET', headers: { accept: 'application/json' } };
      try {
        const response = await fetch(url, options);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        setData(result.data.data); // Update data with API response
        setLoading(false);
      } catch (error) {
        setError(error.message); // Handle errors
        setLoading(false);
      }
    };
    fetchData();
  }, []); // Empty dependency array means this runs once when component mounts

  // Calculate data for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = data.slice(startIndex, endIndex);

  if (loading) return <CircularProgress className="loading" />; // Show loading spinner
  if (error) return <Alert severity="error" className="error">Error: {error}</Alert>; // Show error message

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      padding={2}
      sx={{
        backgroundImage: 'url("https://images.moneycontrol.com/static-mcnews/2021/05/stocks_sensex_nifty_stockmarket3-770x433.jpg?impolicy=website&width=770&height=431")', // Set your background image URL here
        backgroundSize: 'cover', // Ensures the image covers the entire area
        backgroundPosition: 'center', // Centers the image
        backgroundRepeat: 'no-repeat', // Prevents the image from repeating
        minHeight: '100vh', // Ensures full viewport height
      }}
    >
      <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: 'bold', color: '#ffffff' }}>
        Stocks Data
      </Typography>
      <Grid container justifyContent="center" alignItems="center" spacing={3}>
        {currentItems.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              className="stock-card"
              elevation={3}
              sx={{
                borderRadius: '8px', // Rounded corners
                backgroundColor: '#ffffff', // White background for the card
                boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)', // Soft shadow
                '&:hover': { boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.2)' }, // Hover effect
              }}
            >
              <CardContent>
                <Typography variant="h6" color="primary" gutterBottom sx={{ fontWeight: 'bold' }}>
                  {item.Name} ({item.Symbol})
                </Typography>
                <Typography variant="body2" sx={{ marginBottom: 1 }}>
                  <strong>Listing Date:</strong> {item.ListingDate}
                </Typography>
                <Typography variant="body2" sx={{ marginBottom: 1 }}>
                  <strong>ISIN:</strong> {item.ISIN}
                </Typography>
                <Typography variant="body2" sx={{ marginBottom: 1 }}>
                  <strong>Market Cap:</strong> {item.MarketCap}
                </Typography>
                <Typography variant="body2" sx={{ marginBottom: 1 }}>
                  <strong>Current Price:</strong> {item.CurrentPrice}
                </Typography>
                <Typography variant="body2" sx={{ marginBottom: 1 }}>
                  <strong>High/Low:</strong> {item.HighLow}
                </Typography>
                <Typography variant="body2" sx={{ marginBottom: 1 }}>
                  <strong>Stock PE:</strong> {item.StockPE}
                </Typography>
                <Typography variant="body2" sx={{ marginBottom: 1 }}>
                  <strong>Book Value:</strong> {item.BookValue}
                </Typography>
                <Typography variant="body2" sx={{ marginBottom: 1 }}>
                  <strong>Dividend Yield:</strong> {item.DividendYield}
                </Typography>
                <Typography variant="body2" sx={{ marginBottom: 1 }}>
                  <strong>ROCE:</strong> {item.ROCE}
                </Typography>
                <Typography variant="body2" sx={{ marginBottom: 1 }}>
                  <strong>ROE:</strong> {item.ROE}
                </Typography>
                <Typography variant="body2" sx={{ marginBottom: 1 }}>
                  <strong>Face Value:</strong> {item.FaceValue}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <CardPagination
        totalItems={data.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        sx={{ marginTop: 3 }} // Space between cards and pagination
      />
    </Box>
  );
};

export default FetchCard;
