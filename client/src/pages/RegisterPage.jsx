import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signupUser } from "../app/actions/user/userActions";

import { Card } from "../components/ui";

function RegisterPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const { errors, isAuth } = useSelector((state) => state.user);

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(signupUser({ username, email, password }))
    // console.log(isAuth)
  };

  return (
    <div>
      <Card>
        <form onSubmit={onSubmit} className="">
          {errors &&
            errors.map((err, i) => (
              <p key={i} className="bg-red-600 text-white px-3 py-2">
                {err}
              </p>
            ))}
          <label htmlFor="username" className="block">
            Username:
          </label>
          <input
            type="text"
            id="username"
            onChange={(e) => setUsername(e.target.value)}
            className="bg-zinc-800 text-white block"
          />
          <label htmlFor="email" className="block">
            Email:
          </label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            className="bg-zinc-800 text-white block"
          />
          <label htmlFor="password" className="block">
            Password:
          </label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            className="bg-zinc-800 text-white block"
          />
          <button type="submit">Register</button>
        </form>
      </Card>
    </div>
  );
}

export default RegisterPage;
