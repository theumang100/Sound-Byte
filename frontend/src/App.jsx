import Signup from './Signup'
import Login from './Login'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import CreateRoom from './CreateRoom'
import ShowBarcode from './ShowBarcode'


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/register" element={<Signup />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/create_room" element={<ShowBarcode />}></Route>
        <Route path="/show_barcode" element={<ShowBarcode />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
