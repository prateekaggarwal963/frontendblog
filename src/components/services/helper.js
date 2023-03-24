import axios from "axios";
import { getToken } from "../../auth";

export const BASE_URL='http://localhost:9090';
fetch('http://localhost:9090', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': BASE_URL
  }
})
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error));




export const myAxios=axios.create({
    baseURL:BASE_URL
});

export const privateAxios=axios.create({
    baseURL:BASE_URL
    

})
//jo bhi request private axios se jaye gi wo hame yha mile gi
privateAxios.interceptors.request.use(config=>{
    const token=getToken();
    console.log(token);
    if(token){
      //  console.log("ye dekho"+config.headers.Authorization+"  "+token);
        config.headers.Authorization='Bearer ${token}';
        console.log(config)
        const { url, method, headers, data } = config;
        const options = {
            method,
            headers,
          //  body: data ? JSON.stringify(data) : undefined
            };
            return fetch(url, options)
    .then(response => {
      const { status, headers } = response;
      return response.text().then(data => ({
        data: response.data,
        status,
        headers
      }));
    })
    .then(response => ({
      ...config,
      data: response.data,
      status: response.status,
      headers: response.headers        
    }))
}})