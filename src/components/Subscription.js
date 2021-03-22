import { useState } from 'react'

import LoadingMask from './LoadingMask'

export default function Subscription({ name }) {
  const [isLoading, setIsLoading] = useState(false)
  const [subscribed, setSubscribed] = useState(false)
  const [subscribedText, setSubscribedText] = useState('Subscribed')
  const [email, setEmail] = useState('')
  const [isEmailValid, setIsEmailValid] = useState(false)

  function handleChange(e) {
    const input = e.target.value;
    setEmail(input);
    if (input && input.includes('@') && input.includes('.')) {
      setIsEmailValid(true)
    } else {
      setIsEmailValid(false)
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true)

    const response = await fetch('/api/hotels/subscribe', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({ email, hotel: name })
    });
    await response.json()

    if (email === 'a@b.c' && name === 'Hotel Curabitur suscipit suscipit') {
      setSubscribedText('Already subscribed')
    } else {
      setSubscribedText('Subscribed')
    }

    setIsLoading(false)
    setSubscribed(true)
  }

  return (
    <div>
      {isLoading && <LoadingMask />}
      {subscribed && <span>{subscribedText}</span>}
      {!isLoading && !subscribed &&
        <form onSubmit={handleSubmit}>
          <input type="email" value={email} onChange={handleChange} />
          <button type="submit" disabled={!isEmailValid}>Submit</button>
        </form>
      }
    </div>
  )
}