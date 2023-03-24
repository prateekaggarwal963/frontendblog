import { privateAxios } from "./helper"

//create post function
export const createPost=(postData)=>{
    console.log(postData)
    return privateAxios.post('http://localhost:9090/api/user/1/category/1/post',postData,<Access-Control-Allow-Origin>" http://localhost:9090"</Access-Control-Allow-Origin>).then(response => console.log(response.data))
    .catch(error => console.error(error));

}