import{Form,FormGroup,Input,Label,Button} from'reactstrap';
function LoginAdmin(){
    return(
    <>
        
       <div className='login-form'>
        <Form>
            <FormGroup>
                <Label
                    for="exampleEmail"
                    hidden
                >
                     Email
                </Label>
                 <Input
                    id="exampleEmail"
                    name="email"
                    placeholder="Email"
                    type="email"
                />
            </FormGroup>
                {' '}
            <FormGroup>
                 <Label
                     for="examplePassword"
                     hidden
                >
                    Password
                </Label>
                 <Input
                    id="examplePassword"
                    name="password"
                    placeholder="Password"
                    type="password"
                />
            </FormGroup>
                {' '}
            <Button>
                 Submit
            </Button>
        </Form>
        </div> 
    </>
    );
}
export default LoginAdmin;