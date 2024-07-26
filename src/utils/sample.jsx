
export const SampleFunc = async (url, method, body, isFormData = false, set) => {
  
    const res = await fetch(`http://localhost/petshop/server/${url}`, {
        method: method,
        headers: isFormData ? {} : { 'Content-Type': 'application/json' },
        body: isFormData ? body : JSON.stringify(body),
    }) 
    set(await res.json());
};