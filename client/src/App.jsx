import { useSelector } from "react-redux"

function App() {

  const state = useSelector(state => state.auth)
  console.log(state)

  return (
    <div>App</div>
  )
}

export default App