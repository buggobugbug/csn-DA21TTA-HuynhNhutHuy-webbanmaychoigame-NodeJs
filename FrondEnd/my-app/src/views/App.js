import NavBar from '../components/NavBar';
import ListProduct from '../components/ListProduct';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import CarouselHomPage from '../components/CarouselHomepage';


import axios from 'axios';

function App() {


  return (
    
      <div className='body'>

      <NavBar/>
      <CarouselHomPage/>
      <ListProduct/>
      </div>






  );
}

export default App;
