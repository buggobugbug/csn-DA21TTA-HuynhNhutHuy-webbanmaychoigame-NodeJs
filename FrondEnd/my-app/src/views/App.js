import NavBar from '../components/NavBar';
import ListProduct from '../components/ListProduct';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter,
  Switch,
  Route,
  Link
} from "react-router-dom";
import CarouselHomPage from '../components/CarouselHomepage';
import DetailUser from '../components/DetailUser';
import Footer from '../components/Footer';
import Thongtindathang from '../components/Thongtindathang';


function App() {


  return (
    <BrowserRouter>
  <div className='App'>
      <NavBar/>
        <Switch>
          <Route path="/" exact>
            <CarouselHomPage />
            <ListProduct/>
          </Route>
          <Route path="/sanpham" exact>
            <ListProduct />
          </Route>
          <Route path="/sanpham/:MaSanPham">
            <DetailUser/>
          </Route>
          <Route path="/muahang/:MaSanPham" exact>
            <Thongtindathang/>
          </Route>
        </Switch>

    
  </div>
    </BrowserRouter>





  );
}

export default App;
