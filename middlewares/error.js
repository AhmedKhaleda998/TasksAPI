exports.notFound = (req, res, next) => {
    res.status(404).json({ error: 'Page not found' });
};

exports.internalServerError = (req, res, next) => {
    res.status(500).json({ error: 'Internal Server Error' });
};