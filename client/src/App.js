import MyNavbar from './components/MyNavbar';
import WarehouseTable from './components/WarehouseTable';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import './App.css';

const App = () => {
  return (
    <div className="App">
      <MyNavbar />
      <WarehouseTable />
    </div>
  );
}

export default App;
