const parseId = (req, res, next) => {
    const rawId = req.params.id;
    const id = Number(rawId);

    if (!Number.isInteger(id) || id < 1 || String(id) !== String(rawId).trim()) {
        return res.status(400).json({
            status: 'error',
            message: 'Format id tidak valid, harus berupa bilangan bulat positif',
        });
    }

    req.parsedId = id;
    next();
};

module.exports = parseId;