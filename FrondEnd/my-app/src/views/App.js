import NavBar from '../components/NavBar';
import ListProduct from '../components/ListProduct';
import 'bootstrap/dist/css/bootstrap.min.css';
import CarouselHomPage from '../components/CarouselHomepage';
import {Routes, Route  } from 'react-router-dom';


function App() {


  return (

  <div>
    <NavBar/>
    <Routes>
        <Route exact path='/' element={<><CarouselHomPage/><ListProduct/></>}/>
    </Routes>
      <Routes>
        <Route path='/sanpham' element={<><ListProduct /></>} />
      </Routes>
    
  </div>






  );
}

export default App;
