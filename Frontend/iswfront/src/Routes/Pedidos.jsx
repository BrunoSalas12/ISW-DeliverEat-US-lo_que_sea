import React from 'react'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'

const Pedidos = () => {
  return (
    <div>
      <Navbar/>
        <div className="flex flex-col items-center justify-center items-start h-screen">
          <h5 className='font-bold'>Pantalla para el pedido</h5>
        </div>
      <Footer/>
    </div>
  )
}

export default Pedidos