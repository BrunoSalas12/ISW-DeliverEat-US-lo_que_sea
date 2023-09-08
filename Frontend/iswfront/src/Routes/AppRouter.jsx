import React from 'react'
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Principal from './Principal';
import Pedidos from './Pedidos'
import ReactCards from '../Components/ReactCards';

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Principal/>}/>
        <Route path='/pedidos' element={<Pedidos/>}></Route>
        <Route path='/cards' element={<ReactCards/>}></Route>
      </Routes>
    </Router>
  )
}

export default AppRouter;