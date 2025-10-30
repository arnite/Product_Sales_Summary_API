import app from './app';

// Set port from .env or default
const port = process.env.PORT || 3000;

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
