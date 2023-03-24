import React, { useEffect,useRef,useState } from 'react'
import { Card, CardBody,Container,Form, Input, Label,Button } from 'reactstrap'
import { loadAllCategories } from './services/category-service'
import JoditEditor from 'jodit-react'
import { createPost as doCreatePost } from './services/post-service'
import { getCurrentUserDetail } from '../auth'
const AddPost=()=> {
    const editor=useRef(null);
    const[categories,setCategories] = useState([]);
    const[user,setUser]=useState(undefined);

    const[post,setPost]=useState({
        "title":"",
        "content":"",
        "categoryId":""
    })

    useEffect(()=>{
        setUser(getCurrentUserDetail)
        loadAllCategories().then((data)=>{
            console.log(data);
            setCategories(data);
        }).catch(error=>{
            console.log(error)
        })
    },[])

    //field changed fuction
    const fieldChanged=(event)=>{
        console.log(event.target.value);

        setPost({...post,[event.target.name]:event.target.value});
    }

    //for text area
    const contentFieldChanged=(data)=>{
        setPost({...post,'content':data})
    }

    //create post function
    const createPost=(event)=>{
        event.preventDefault();
        console.log(post);

        //validation
        if(post.title.trim()==='')
        {
            alert("post is required");
            return;
        }
        if(post.content.trim()==='')
        {
            alert("post content is required");
            return;
        }
        if(post.categoryId==='')
        {
            alert("select some category");
            return;
        }
        //submit the form
        post['userId']=user.id;
        doCreatePost(post).then(data=>{
            alert("post created");
            console.log(post);
        }).catch((error)=>{
            alert("error");
            console.error(error);
        })


    }

  return (
    <div className='wrapper'>
        <Card className='shadow-sm border-0 mt-2'>
            <CardBody>
                {JSON.stringify(post)}
                <h3>What going in your mind</h3>
                <Form onSubmit={createPost}>
                    {/*title*/}
                    <div className='my-3'>
                        <Label for='title'>Post title</Label>
                        <Input type='text' id='title' placeholder='Enter here' className='rounded-0' name='title'
                             onChange={fieldChanged}/>
                    </div>
                    {/*content*/}
                    <div className='my-3'>
                        <Label for='content'>Post Content</Label>
                      {/*  <Input type='textarea' id='content' placeholder='Enter here' className='rounded-0' style={{height:'200px'}}/>*/}
                        <JoditEditor
                            ref={editor}
                            value={post.content}
                            //newContent=>setContent(newContent)
                            onChange={contentFieldChanged}
                        />
                    </div>
                    {/*category*/}
                    <div className='my-3'>
                        <Label for='category'>Post title</Label>
                        <Input type='select' id='category' placeholder='Enter here' className='rounded-0'
                                name='categoryId' onChange={fieldChanged} defaultValue={0}>
                                    <option disabled value={0}>--select category--</option>
                            {
                                categories.map((category)=>(
                                    <option value={category.categoryId} key={category.id}>
                                        {category.categoryTitle}
                                    </option>
                                ))
                            }
                        </Input>
                    </div>
                    <Container className='text-center'>
                        <Button className='rounded-0' color="primary" type='submit'> Create Post</Button>
                        <Button className='rounded-0 ms-2' color="danger">Reset Content</Button>
                    
                    </Container>
                </Form>
            </CardBody>
        </Card>        
    </div>
  )
}

export default AddPost