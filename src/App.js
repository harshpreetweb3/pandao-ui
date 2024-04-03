import './App.css'
import Header from './components/layout/header'
import Routers from './router';
import Footer from './components/layout/footer';
import {
  BrowserRouter
} from 'react-router-dom';



function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routers />
      <Footer />
    </BrowserRouter>
  );

}

export default App;