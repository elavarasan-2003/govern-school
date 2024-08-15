import {BrowserRouter,Routes,Route} from 'react-router-dom'
import HomePage from './pages/HomePage';
import Register from './pages/Register';
import Query1 from './pages/query1';
import Query2 from './pages/query2';
import Query3 from './pages/query3';
import Query4 from './pages/query4';
import Query5 from './pages/query5';
import Query6 from './pages/query6';
import Query7 from './pages/query7';
import Login from './pages/Login';


function App() {
  return (
    <>
      <BrowserRouter>
      <Routes>
          <Route path ='/' element = {<HomePage/>}/>
          <Route path ='/register' element = {<Register/>}/>
          <Route path ='/login' element = {<Login/>}/>
          <Route path='/query1' element={<Query1/>}/>
          <Route path='/query2' element={<Query2/>}/>
          <Route path='/query3' element={<Query3/>}/>
          <Route path='/query4' element={<Query4/>}/>
          <Route path='/query5' element={<Query5/>}/>
          <Route path='/query6' element={<Query6/>}/>
          <Route path='/query7' element={<Query7/>}/>
      </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
