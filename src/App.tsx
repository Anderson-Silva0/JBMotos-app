import 'bootstrap/dist/css/bootstrap.min.css';
import { NavBar } from "./components/navbar"
import 'toastr/build/toastr.css'
import 'toastr/build/toastr.min.js'
import { Rotas } from './components/rotas';

function App() {
  return (
    <div>
      <NavBar />
      <Rotas />
    </div>
  )
}

export default App
