import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signupUser } from "../app/actions/user/userActions";

function RegisterPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const { errors } = useSelector((state) => state.user);
  console.log(errors)

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(signupUser({ username, email, password }));
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
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          onChange={(e) => setUsername(e.target.value)}
          className="bg-zinc-800 text-white"
        />
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

export default RegisterPage;
