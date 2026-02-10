import jwtAccess from "../services/jwt_Access.service.js";

export function tokenValidator(req, res, next)
{
    try{
        const header = req.headers.authorization;

        if(!header)
        {
            const error = new Error("Invalid header");
            error.status = 401;
            throw error;
        }
        const token = header.split(" ")[1];
        if(!token)
        {
            const error = new Error("Invalid Token");
            error.status = 401;
            throw error;
        }
        const decoded = jwtAccess.verify(token); 

        req.user = decoded;
        return next()
    }catch(err)
    {
        next(err);
    }
}