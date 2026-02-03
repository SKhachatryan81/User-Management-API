import { db } from "../config/index.js"

class UserValidator{

    async uniqueValidator(req, res, next)
    {
        try{
            
            const username = req.body.username;
            const email = req.body.email;

            const user1 = await db.userModel.findOne({
                where: { username }
            });
            const user2 = await db.userModel.findOne({
                where: { email }
            });

            if(user1)
            {
                return res.status(400).json({ok: false, message: "username already in use"});
            }
            if(user2)
            {
                return res.status(400).json({ok: false, message: "email already in use"});
            }

            next();

        }catch(err)
        {
            next(err);
        }
    }

    async allFieldsFilledValidator(req, res, next)
    {
        try{
            const requiredFields =[ "name", "age", "occupation", "email", "username"];

            const update = req.body;
            for(const key of requiredFields)
            {
                if(update[key] === undefined || update[key] == null || update[key].toString().trim() === "")
                {
                    return res.status(400).json({ok: false, message: "no field must remain empty"})
                }
            }
            next()

        }catch(err)
        {
            next(err);
        }
    }

    async allFieldsEmptyValidator(req, res, next)
    {
        try{
            const update = req.body;

            if(!update || Object.keys(update).length === 0)
            {
                return res.status(400).json({ok: false, message: "body must not remain empty"});
            }
            for(const key in update)
            {  
                if(update[key] === undefined || update[key] === null || update[key].toString().trim() === "")
                {
                    return res.status(400).json({ok: false, message: "body must not remain empty"});
                }
            }
            next();
        }catch(err)
        {
            next(err);
        }
    }
}

export default new UserValidator();