import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
  } from "react-router-dom";
  import Shapes from '../shapes/shapes'
  import Water from '../water/water'
  import Tensor from '../tensorflow/tensor'
  import Gucci from '../gucci/gucci'
  import Lego from '../Lego/lego'
  import Ball from '../ball/ball'
  import Data from '../data/data'
  import Map from '../map/map'
  import Portal from '../portal/portal'


  export default function Nav() {
    return (
      <>
      <Router>
          <Routes>
              <Route path="/shapes" element={<Shapes />} />
              <Route path="/water" element={<Water />} />
              <Route path="/tensor" element={<Tensor />} />
              <Route path="/gucci" element={<Gucci />} />
              <Route path="/lego" element={<Lego />} />
              <Route path="/ball" element={<Ball />} />
              <Route path="/data" element={<Data />} />
              <Route path="/map" element={<Map />} />
              <Route path="/portal" element={<Portal />} />
          </Routes>
          <header>
            <nav className='App-header'>
              <Link to="/shapes">Nike Jordans particles</Link> 
              <Link to="/water">Floating effect</Link>
              <Link to="/tensor">Tensorflow</Link>
              <Link to="/gucci">Gucci</Link>
              <Link to="/lego">Gucci shoe 2.0</Link>
              <Link to="/ball">Ball animation</Link>
              <Link to="/data">Data Vis</Link>
              <Link to="/map">Maps</Link>
              <Link to="/portal">Porral</Link>
              
            </nav>
          </header>
    </Router>  
       
      </>
       
        
    );
  }
  
  