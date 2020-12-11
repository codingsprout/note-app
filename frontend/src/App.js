import { useState } from 'react';
const { Login, Notes } = require('./components');

function App() {
  const [isLogin, setIsLogin] = useState(false);
  return <div className='App'>{isLogin ? <Notes /> : <Login />}</div>;
}

export default App;
