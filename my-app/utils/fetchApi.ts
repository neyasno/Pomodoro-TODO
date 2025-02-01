
type RequestMethod = "GET" | "POST" | "PUT" | "DELETE"

const fetchApi = async ( path : string , method : RequestMethod )=>{

    const token = localStorage.getItem('token')

    const response = await fetch( path , 
        {
            method , 
            headers : {
                authorization : `Bearer ${token}`
            }
        }
    );

    if(!response.ok){
        throw new Error("Fetch Error:");
    }
    
};


export default fetchApi