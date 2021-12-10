import MyNavbar from './components/MyNavbar';
import WarehouseTable from './components/WarehouseTable';
import ProductTable from './components/ProductTable';
import  { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import 'bootstrap/dist/css/bootstrap.min.css'; 
import './App.css';

const App = () => {
  return (
    <Router>
      <div className="App">
        <MyNavbar />
        <Routes>
          <Route path="/" element={<WarehouseTable />} />
          <Route path="product/:id" element={<ProductTable />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
