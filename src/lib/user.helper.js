class UserHelper {

    allFieldsFilledValidator(data)
    {
        const requiredFields =[ "name", "age", "occupation", "email", "username"];

        const update = data;
        for(const key of requiredFields)
        {
            if(update[key] === undefined || update[key] == null || update[key].toString().trim() === "")
            {
                return false
            }
        }

        return true;
    }
}

export default new UserHelper();