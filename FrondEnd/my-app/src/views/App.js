import Components from './Example/Components';
import ListoDo from './Todos/ListoDo';
import NavBar from '../components/NavBar';
import CarouselSlide from '../components/CarouselSlide';
import ListProduct from '../components/ListProduct';
function App() {
  return (
    
      
      <div>
      {/* <Components/> */}
      {/* <ListoDo/>

      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      /> */}

      <NavBar />
      <CarouselSlide/>
      <ListProduct/>
      {/* Các thành phần khác của ứng dụng */}
      </div>






  );
}

export default App;
