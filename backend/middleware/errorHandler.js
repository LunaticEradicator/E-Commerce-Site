function notFoundURL(req, res, next) {
  const error = new Error(`Not Found ${req.originalUrl}`);
  res.status(404);
  next(error);
}

function errorHandler(err, req, res, next) {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;

  // check for bad mongoose ObjectID or cast error
  if (err.name === "CastError" || err.type === "ObjectId") {
    message = "CastError: Resources Not Found";
    statusCode = 404;
  }

  //   res.status(404).json({ message: "Product Not Found" });

  res.status(statusCode).json({
    message,
    stack:
      process.env.NODE_ENV === "production"
        ? "We are in Production"
        : err.stack,
  });
}

export { notFoundURL, errorHandler };
