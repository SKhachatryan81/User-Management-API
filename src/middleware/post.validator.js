import { db } from "../config/index.js"

class PostValidator {

    async userExistsValidator(req, res, next)
    {
        try{
            const user_id = Number(req.body.user_id);
            const user = await db.userModel.findOne({
                where: {id: user_id}
            });

            if(!user)
            {
                return res.status(404).json({ok: false, message: "user not found"});
            }
            next()
        }catch(err)
        {
            next(err);
        }
    }

    async useridChangeValidator(req, res, next)
    {
        try{
            const update = req.body;
            if("user_id" in update)
            {
                return res.status(403).json({ok: false, message: "changing user ID is forbidden"});
            }
            next();
        }catch(err)
        {
            next(err);
        }
    }

    async properParameters(req, res, next)
    {
        try{
            const id = Number(req.params.id);
            if(isNaN(id))
            {
                const error = new Error("Invalid ID parameter");
                error.status = 400;
                throw error;
            }
            return next();
        }catch(err)
        {
            next(err);
        }
    }
}

export default new PostValidator();