import { Plan } from './Component/Plan';
import { Login } from './Component/Login';
import { Signin } from './Component/Signin';
import {BrowserRouter as Router , Routes , Route} from 'react-router-dom'
import './App.css';

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path='/plan' element={<Plan/>} />
          <Route path='/login' element={<Login/>}/>
          <Route path='/' element={<Signin/>}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
