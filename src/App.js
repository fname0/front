// import logo from './logo.svg';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Auth from './auth/auth';
import Main from './components/Main';
import Graph from './components/Graph';
import Comment from './components/Comment';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
                <Routes>
                    <Route
                        exact
                        path="/"
                        element={<Auth/>}
                    />
                    <Route
                      exact
                      path='/main'
                      element={<Main />}
                    />
                    <Route
                    exact
                    path='/graph'
                    element={<Graph/>}
                    />
                    <Route
                    exact
                    path='/comment'
                    element={<Comment/>}
                    />
                </Routes>
            </BrowserRouter>
    </div>
  );
}

export default App;
