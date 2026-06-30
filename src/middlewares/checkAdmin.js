
export const checkAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(403).json({
            message: "cannot access the route because you are not an admin sire."
        });
    }
};