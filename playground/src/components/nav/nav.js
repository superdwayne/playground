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
          </Routes>
          <header>
            <nav className='App-header'>
              <Link to="/shapes">Nike Jordans particles</Link> 
              <Link to="/water">Floating effect</Link>
              <Link to="/tensor">Tensorflow</Link>
              <Link to="/gucci">Gucci</Link>
              <Link to="/lego">Lego</Link>
            </nav>
          </header>
    </Router>  
       
      </>
       
        
    );
  }
  
  