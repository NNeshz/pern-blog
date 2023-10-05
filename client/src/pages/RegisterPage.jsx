import { useForm } from "react-hook-form";
import { useUser } from "../context/userContext";
import { useNavigate, Link } from "react-router-dom";

import { Card, Label, Input, Container, Button } from "../components/ui";

function RegisterPage() {
  const { handleSubmit, register, formState: { errors } } = useForm();
  const { signup, errors: RegisterErrors } = useUser();
  const navigate = useNavigate();

  console.log("RegisterErrors", RegisterErrors)

  const onSubmit = handleSubmit(async (data) => {
    const user = await signup(data);
    if(user) navigate("/home");
  });

  return (
    <Container className="h-[calc(100vh-10rem)] flex items-center justify-center">
      <Card>
        <form onSubmit={onSubmit}>
          {
            RegisterErrors && RegisterErrors.map((error, i) => (
              <p className="text-red-500" key={i}>{error}</p>
            ))
          }
          <h1 className="text-xl font-bold my-2">Register in RealBlog</h1>
          <Label>Username:</Label>
          <Input
            placeholder="Enter yout username..."
            {...register("username", {
              required: true,
            })}
          />
          {
            errors.username && <p className="text-red-500">Username is required</p>
          }
          <Label>Email:</Label>
          <Input
            type="email"
            placeholder="Enter yout email..."
            {...register("email", {
              required: true,
            })}
          />
          {
            errors.email && <p className="text-red-500">Email is required</p>
          }
          <Label>Password:</Label>
          <Input
            type="password"
            placeholder="Enter yout password..."
            {...register("password", {
              required: true,
            })}
          />
          {
            errors.password && <p className="text-red-500">Password is required</p>
          }
          <Button>Register</Button>
          <p className="mt-2">
            Already have an account? <Link to="/login" className="text-indigo-800">Login</Link>
          </p>
        </form>
      </Card>
    </Container>
  );
}

export default RegisterPage;
