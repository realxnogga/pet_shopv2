
// helper function for connecting to php

export const HelperThunkFunction = async (url, method, body, isFormData = false,) => {

        const res = await fetch(`http://localhost/petshop/server/${url}`, {
            method: method,
            headers: isFormData ? {} : { 'Content-Type': 'application/json' },
            body: isFormData ? body : JSON.stringify(body),
        }) 

        return await res.json();
};
