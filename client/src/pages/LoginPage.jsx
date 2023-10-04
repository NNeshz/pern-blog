import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signinUser } from "../app/actions/user/userActions";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const { errors } = useSelector((state) => state.user);

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(signinUser({ email, password }));
  };

  return (
    <div>
      <form onSubmit={onSubmit} className="flex">
        {errors &&
          errors.map((err, i) => (
            <p key={i} className="bg-red-600 text-white px-3 py-2">
              {err}
            </p>
          ))}
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          onChange={(e) => setEmail(e.target.value)}
          className="bg-zinc-800 text-white"
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          onChange={(e) => setPassword(e.target.value)}
          className="bg-zinc-800 text-white"
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default LoginPage;
