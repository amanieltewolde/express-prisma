function notFound(req, res, next) {
    res.status(404).json({
        error: 'Endpoint not found',
    })
}

export default notFound;