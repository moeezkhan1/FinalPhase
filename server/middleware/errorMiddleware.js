const errorHandler = (err, req, res, next) => {
    console.error(err.stack); // Log the error details (optional)
    res.status(err.status || 500).json({
      message: err.message || 'Internal Server Error',
      stack: process.env.NODE_ENV === 'development' ? err.stack : undefined, // Show stack trace only in development
    });
  };
  
  module.exports = errorHandler;
  