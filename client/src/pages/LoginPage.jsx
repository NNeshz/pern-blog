import { useForm } from "react-hook-form";
import { useUser } from "../context/userContext";
import { useNavigate, Link } from "react-router-dom";

import { Card, Label, Input, Container, Button } from "../components/ui";

function LoginPage() {
  const { handleSubmit, register } = useForm();
  const { signin } = useUser();
  const navigate = useNavigate();

  const onSubmit = handleSubmit(async (data) => {
    const user = await signin(data);
    if (user) navigate("/");
  });

  return (
    <Container className="h-[calc(100vh-10rem)] flex items-center justify-center">
      <Card>
        <form onSubmit={onSubmit}>
          <h1 className="text-xl font-bold my-2">Login in RealBlog</h1>
          <Label>Email:</Label>
          <Input
            type="email"
            placeholder="Enter yout email..."
            {...register("email", {
              required: true,
            })}
          />
          <Label>Password:</Label>
          <Input
            type="password"
            placeholder="Enter yout password..."
            {...register("password", {
              required: true,
            })}
          />
          <Button>Login</Button>
          <p className="mt-2">
            Don&apos;t have an account?{" "}
            <Link to="/register" className="text-blue-600">
              Register
            </Link>
          </p>
        </form>
      </Card>
    </Container>
  );
}

export default LoginPage;
