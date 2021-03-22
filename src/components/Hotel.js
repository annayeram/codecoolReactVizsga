import { useState } from 'react'

import Subscription from './Subscription'

export default function Hotel({ name, stars, city }) {
  const [showMore, setShowMore] = useState(false)
  const [showSubscription, setShowSubscripion] = useState(false)

  return (
    <div>
      <h2>{name}</h2>
      <button onClick={(e) => setShowMore(!showMore)}>{showMore ? 'Show less' : 'Show more'}</button>
      {showMore && <>
        <div>{city} ({stars})</div>
        <button onClick={(e) => setShowSubscripion(!showSubscription)}>Request more info about {name}</button> 
        {showSubscription && <Subscription name={name} />}
      </>} 
    </div>
  )
}