import './App.css'
import { useEffect, useState } from 'react'

import LoadingMask from './components/LoadingMask'
import Hotel from './components/Hotel'

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    async function loadHotels() {
      const response = await fetch('/api/hotels');
      const body = await response.json()
      setHotels(body);
      setIsLoading(false);
    }
    loadHotels();
  }, [])

  return (
    <div className="App">
      {isLoading
        ? <LoadingMask />
        : hotels.map(h => 
          <Hotel key={h.name} name={h.name} stars={h.stars} city={h.city} />
        )
      }
    </div>
  )
}



export default App
