import jwt from "jsonwebtoken"

class JWTService {

    sign(id)
    {
        return jwt.sign({userId: id}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRES_IN});
    }

    verify(token)
    {
        try{
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            return decoded;
        }catch(err)
        {
            const error = new Error("Invalid token");
            error.status = 401;
            throw error;
        }
    }

}

export default new JWTService();