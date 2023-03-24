
import { useState } from "react";
import { toast } from "react-toastify";
import { Card, CardBody, CardHeader, Col, Container, FormGroup, Input, Label, Row,Form, Button } from "reactstrap";
import Base from "../components/Base";
import { signUp } from "../components/services/user-service";
import { doLogin } from "../auth";
import { useNavigate } from "react-router-dom";
const Login=()=>{

  const navigate=useNavigate();

    const [data,setData]=useState({
        username:"",
        password:"",
      })
      
  const [error,setError]=useState({
    errors:{},
    isError:false
  })
//handle change
const handlechange=(event,property)=>{
    console.log(event.target.value);
    setData({...data,[property]:event.target.value})
  }
    //submit the form
  const submitForm=(event)=>{
    event.preventDefault();
    console.log(data);
    //data validate

    //call server api for sending data
    signUp(data).then((data)=>{
      console.log(data);

      //save the data to localStorage
      doLogin(data,()=>{
        console.log("login detail is saved to localstorage")
        //save data to user dashboard page

        //redirect to user dashboard
        navigate("/user/dashboard")

      })
      console.log("success log");
      toast.success("login Success");
    }).catch((error)=>{
      console.log(error);
      console.log('Error log');
    })
  }


    return(
        <Base>
        <Container>
            <Row className="mt-4">
                <Col sm={{size:6,offset:3}}>
                    <Card color="dark" inverse>
                        <CardHeader>
                            <h3>Login Here</h3>
                        </CardHeader>
                        <CardBody>
                            <Form onSubmit={submitForm}>
                                {/*Email*/}
                                <FormGroup>
                                    <Label for="email">Enter Email</Label>
                                    <Input id="username" type="text" placeholder="username" onChange={(e)=>handlechange(e,'username')} value={data.username}/>
                                </FormGroup>
                                
                                {/*Password*/}
                                <FormGroup>
                                    <Label for="password">Enter Password</Label>
                                    <Input id="password" type="text" placeholder="password" 
                    onChange={(e)=>handlechange(e,'password')}
                    value={data.password}/>
                                </FormGroup>

                                {/*button*/}
                                <Container className="text-center">
                                <Button color="light" outline>Login</Button>
                                <Button color="secondary" type="reset" className="ms-2">Reset</Button>
                                    
                                </Container>
                            </Form>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Container>
        </Base>
    );
};

export default Login;