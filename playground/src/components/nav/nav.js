import {
    BrowserRouter as Router,
    Routes, //replaces "Switch" used till v5
    Route,
    Link
  } from "react-router-dom";
  import Shapes from '../shapes/shapes'
  import Water from '../water/water'

  
  export default function Nav() {
    return (
      <>
      <Router>
          <Routes>
              <Route path="/shapes" element={<Shapes />} />
              <Route path="/water" element={<Water />} />
          </Routes>
          <header>
            <nav className='App-header'>
              <Link to="/shapes">Nike Jordans particles</Link> 
              <Link to="/water">Floating effect</Link>
            </nav>
          </header>
    </Router>  
       
      </>
       
        
    );
  }
  
  