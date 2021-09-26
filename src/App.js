import './App.css';
import {BrowserRouter, Route} from 'react-router-dom';
import Home from './Components/Home';

function App() {
  return (
    <>
      <BrowserRouter>
        <Route path="/" component={Home} />
      </BrowserRouter>
    </>
  );
}

export default App;