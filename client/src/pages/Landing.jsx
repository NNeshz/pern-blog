import { Link } from "react-router-dom"

function Landing() {
  return (
    <div className="px-10 flex h-[calc(100vh-68px)] items-center">
      <section>
        <h1 className="text-8xl font-bold">A REAL BLOG,<br/>FOR REAL PEOPLE</h1>
        <p className="text-2xl mb-4 ml-2">Contact with people around the world and know about any topic</p>
        <Link to='/login' className="bg-gradient-to-r from-indigo-600 to-indigo-800  px-4 py-2 text-2xl rounded-md ml-2">
          Getting Started
        </Link>
      </section>
    </div>
  )
}

export default Landing;