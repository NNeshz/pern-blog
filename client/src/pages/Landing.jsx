import { Container } from "../components/ui";
import { Link } from "react-router-dom";

function Landing() {
  return (
    <Container className="h-[calc(100vh-10rem)] flex items-center">
      <section>
        <h1 className="text-8xl font-bold py-4">This is RealBlog</h1>
        <p className=" text-xl pb-4">
          RealBlog is a place where you can get in touch with people around the
          world, <br/> take ideas about everithing and know the diferent cultures far
          from you.
        </p>
        <Link to="/register" className="bg-indigo-800 hover:bg-indigo-700 px-3 py-2 rounded-md text-xl font-semibold">
          Register now!
        </Link>
      </section>
    </Container>
  );
}

export default Landing;
