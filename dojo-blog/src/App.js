// import logo from './logo.svg';
import './App.css';
// import Step from '@mui/material/Step'
// import StepLabel from '@mui/material/StepLabel'
// import StepContent from '@mui/material/StepContent'
//Swicth ->Routes
import Navbar from './Navbar';
import Home from './Home';
import Create from './Create'
import {BrowserRouter as Router , Route, Routes} from 'react-router-dom';
import BlogDetails from './BlogDetails';



 function App() {

  return (
    <Router>
    <div className="App">
      <Navbar/>
      <div className="content">
       

        <Routes>
          <Route exact path="/" element={<Home/>}>
          </Route>
          <Route path="/create" element={<Create/>}></Route>
          <Route path="/blogs/:id" element={<BlogDetails/>}></Route>

        </Routes>
        
      </div>
    </div>
    </Router>
  );
}

export default App;
