import { useEffect, useState } from 'react';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('/api/hello') // No need for localhost because of proxy
      .then((res) => res.json())
      .then((data) => setMessage(data.message));
  }, []);

  return <h1>{message}</h1>;
}

export default App;
