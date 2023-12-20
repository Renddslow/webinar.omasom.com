export const notFound = (_, res, next) => {
  res.notFound = () => {
    res.statusCode = 404;
    // TODO: Add a 404 page
    res.end("Not found");
  };
  next();
};
