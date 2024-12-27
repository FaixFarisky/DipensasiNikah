import { Route, Routes } from 'react-router-dom'
import EventHandling from './components/EventHandling'
import Home from './pages/Home'
import Sidebar from './components/Sidebar'
import Detail from './pages/Detail'
import Detail_pimpinan from './pages/Detail_Pimpinan'
import Pimpinan from './pages/Pimpinan'
import Add_data from './pages/Add_Data'
import Edit_data from './pages/Edit_Data'
import Add_pimpinan from './pages/Add_Pimpinan'
import Edit_pimpinan from './pages/Edit_Pimpinan'
import Transaksi from './pages/Transaksi'
import Register from './components/Register'
import Login from './components/Login'
import Transaksic from './pages/Transaksi_Cetak'
import CalonSuami from './pages/CalonSuami'
import CalonIstri from './pages/CalonIstri'
import DataWali from './pages/DataWali'
import Riwayat from './pages/Riwayat'
import Catin from './pages/Catin'
import ProtectedRoute from './components/ProtectedRoute';

function App() {

  return (
    // <div className="app">
    //   < EventHandling/>
    // </div>>
      <Routes>
      {/* <Route path='/' element={ <EventHandling /> } /> */ }
      <Route/>
      <Route path='/' element={ <Login/> } />
      <Route element={<ProtectedRoute/>}>
          <Route path='/home' element={<Home/>}/>
          <Route path='/sidebar' element={ <Sidebar /> } />
          <Route path='/detail/:id' element={ <Detail /> } />
          <Route path='/edit_data/:id' element={ <Edit_data /> } />
          <Route path='/detail_pimpinan/:id' element={ <Detail_pimpinan /> } />
          <Route path='/edit_pimpinan/:id' element={ <Edit_pimpinan /> } />
          <Route path='/pimpinan' element={ <Pimpinan /> } />
          <Route path='/add_data' element={ <Add_data /> } />
          <Route path='/add_pimpinan' element={ <Add_pimpinan /> } />
          <Route path='/transaksi' element={ <Transaksi/> } />
          <Route path='/register' element={ <Register/> } />

          <Route path='/transaksic' element={ <Transaksic/> } />
          <Route path='/calonsuami' element={ <CalonSuami/> } />
          <Route path='/calonistri' element={ <CalonIstri/> } />
          <Route path='/datawali' element={ <DataWali/> } />
          <Route path='/riwayat' element={ <Riwayat/> } />
          <Route path='/catin' element={ <Catin/> } />
      </Route>
    </Routes>
  )
}

export default App
