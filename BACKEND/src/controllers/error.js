exports.get404 = (req, res, next) => {
    const e = new Error('Not found.');
    e.statusCode = 404;
    next(e);
};
  
exports.get500 = (e, req, res, next) => {
    const data = e.data;
    res.status(e.statusCode || 500);
    res.json({
      e: {
        message: e.message,
        data: data,
      },
    });
};