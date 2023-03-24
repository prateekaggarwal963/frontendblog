import { useState } from "react";
import { signUp } from "../components/services/user-service";
import {Button,  Card,  CardBody,  CardHeader,Col,  Container,  Form,  FormGroup,  Input,  Label,Row,} from "reactstrap";
import Base from "../components/Base";
const Signup = () => {

  const [data,setData]=useState({
    name:"",
    email:"",
    password:"",
    about:""
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

  //reseting the form
  const resetData=()=>{
    setData({
      
    })
  };

  //submit the form
  const submitForm=(event)=>{
    event.preventDefault();
    console.log(data);

    //data validate

    //call server api for sending data
    signUp(data).then((resp)=>{
      console.log(resp);
      console.log("success log");
    }).catch((error)=>{
      console.log(error);
      console.log('Error log');
    })
  }

  return (
    <Base>
      <Container>
        {JSON.stringify(data)};
        <Row className="mt-4">
            <Col sm={{size:6,offset:3}}>
            <Card color="dark" inverse>
          <CardHeader>
            Fill Information to Register!
            <CardBody>
              <Form onSubmit={submitForm} >
                {/*Name field*/}
                <FormGroup>
                  <Label for="name">Enter Name</Label>
                  <Input type="text" placeholder="Enter here" id="name" onChange={(e)=>handlechange(e,'name')} value={data.name}/>
                </FormGroup>

                {/*Email field*/}
                <FormGroup>
                  <Label for="email">Enter Email</Label>
                  <Input type="email" placeholder="Enter here" id="email" onChange={(e)=>handlechange(e,'email')} value={data.email}/>
                </FormGroup>

                {/*Password field*/}
                <FormGroup>
                  <Label for="password">Enter Password</Label>
                  <Input
                    type="password"
                    placeholder="Enter here"
                    id="password"
                    onChange={(e)=>handlechange(e,'password')}
                    value={data.password}
                  />
                </FormGroup>

                {/*about field*/}
                <FormGroup>
                  <Label for="about">Text Area</Label>
                  <Input id="about" type="textarea" placeholder="about" style={{height:"250px"}} onChange={(e)=>handlechange(e,'about')}
                  value={data.about}/>
                </FormGroup>

                <Container className="text-center">
                    <Button color="light" >Register</Button>
                    <Button color="secondary" type="reset" className="ms-2" onClick={resetData}>Reset</Button>
                </Container>
              </Form>
            </CardBody>
          </CardHeader>
        </Card>
     </Col>
        </Row>
       </Container>
    </Base>
  );
};

export default Signup;
