import { Card, Button, Input, Label } from "../components/ui";

import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { signIn } from "../app/actions/authActions";

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const onSubmit = (data) => {
    dispatch(signIn(data));
    if (user) {
      navigate("/home");
    }
  }

  return (
    <div className="px-10 h-[calc(100vh-68px)] flex items-center">
      <section className="flex-1 pr-2">
        <div className="mx-12">
          <h3 className="text-2xl">Are you OK with RealBlog?</h3>
          <p>
            In RealBlog you can create your own blog and share your ideas with
            the world. You can also read other blogs and comment on them. You
            can also follow other users and see their posts. You can also like
            and dislike posts and comments. You can also edit and delete your
            posts and comments.
          </p>
        </div>
      </section>
      <section className="flex-1 pr-2">
        <div className="mx-12">
          <Card>
            <h1 className="text-2xl font-bold my-2">Login in RealBlog</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Label htmlFor="email">Email:</Label>
              <Input
                placeholder="Enter an email..."
                {...register("email", {
                  required: true,
                })}
              />
              {errors.email && (
                <p className="text-red-600">Email is required</p>
              )}
              <Label htmlFor="password">Password:</Label>
              <Input
                type="password"
                placeholder="Create a password..."
                {...register("password", {
                  required: true,
                })}
              />
              {errors.password && (
                <p className="text-red-600">Password is required</p>
              )}
              <Button>Login</Button>
            </form>
          </Card>
        </div>
      </section>
    </div>
    )
}

export default LoginPage