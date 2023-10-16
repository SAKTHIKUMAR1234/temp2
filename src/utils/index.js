import axios from "axios"

export const fetch_get=async(url)=>{

  
    const response=await axios(url, {
      method: "GET",
      headers : {
        Authorization:"Bearer "+JSON.parse(sessionStorage.getItem("AuthHead")).Authorization
      }
    });

    return response
}

export const create_User = async (url,data)=>{
  const response = await fetch (url,{
    method: "POST",
    headers : {
      Authorization:"Bearer "+JSON.parse(sessionStorage.getItem("AuthHead")).Authorization
    },
    body:JSON.stringify(data)
  });
  // console.log(response.json())
  return response;
}
