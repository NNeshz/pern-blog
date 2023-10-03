import { Card, Button, Input, Label } from "../components/ui";

import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { signUp } from "../app/actions/authActions.js";

function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const onSubmit = (data) => {
    dispatch(signUp(data));
    if (user) {
      navigate("/home");
    }
  };

  return (
    <div className="px-10 h-[calc(100vh-68px)] flex items-center">
      <section className="flex-1 pr-2">
        <div className="mx-12">
          <h3 className="text-2xl">Why you should use RealBlog?</h3>
          <p>
            Discover the Future of Blogging! 🚀 Dive into a world of fresh,
            updated content that brings millions together. Stay ahead of the
            curve with the latest insights, stories, and connections. Join the
            revolution today!
          </p>
        </div>
      </section>
      <section className="flex-1 pr-2">
        <div className="mx-12">
          <Card>
            <h1 className="text-2xl font-bold my-2">Register in RealBlog</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Label htmlFor="username">Username:</Label>
              <Input
                placeholder="Enter an username..."
                {...register("username", {
                  required: true,
                })}
              />
              {errors.username && (
                <p className="text-red-600">Username is required</p>
              )}
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
              <Button>Register</Button>
            </form>
          </Card>
        </div>
      </section>
    </div>
  );
}

export default RegisterPage;
