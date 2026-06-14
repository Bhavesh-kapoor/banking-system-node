

const ValidateRequest = async (schema , requestBody)=>{
    const validate = await schema.safeParse(requestBody ?? {})
    if(!validate.success){
            // check the code 
            let code = validate.error.issues[0].code;
            console.log(validate)
            if(code =='invalid_type'){
                console.log(validate.error.issues[0])
                let path =validate.error.issues[0].path[0];
                return {
                    'status':false,
                    "message":`${path?.charAt(0).toUpperCase() + path?.slice(1)} is required!`
                }
            }
            return {
                "success":false,
                "error":validate.error.issues[0].message
            }
    }
    return {
        "success":true
    }
}


export default ValidateRequest