import * as React from 'react';
import {useState, useEffect} from 'react';
import {motion} from 'framer-motion';
import './App.css'

export default function App() {
  const [response, setResponse] = useState(null);
  const [postMessage, setPostMessage] = useState(null);
  const [responseToPost, setResponseToPost] = useState(null);
  
  const callAPI = async () => {
    const response = await fetch('/api/hello');
    const body = await response.json();
    if(response.status !== 200) throw Error(body.message);
    return body;
  } 

  const handleSubmit = async e => {
    e.preventDefault();
    const res = await fetch('/api/world', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({post: postMessage})
    })
    const body = await res.text();
    setResponseToPost(body);
  }

  useEffect(() => {
    callAPI()
      .then(res => {
        console.log(res);
        setResponse(res.express)
      })
      .catch(err => console.log(err))
  },[])

  return(
    <>
      <p>{response}</p>
      <form onSubmit={handleSubmit}>
        <label for="postMessage">
          <span className="inputLabel">Post to server</span>
          <input type="text" id="postMessage" onChange={e => setPostMessage(e.target.value)}></input>
        </label>
        <button type="submit">Submit</button>
      </form>
      <p>{responseToPost}</p>
    </>
  )
}