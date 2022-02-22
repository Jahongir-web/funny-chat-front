import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { BrowserRouter } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'

ReactDOM.render(

    <React.StrictMode>
      <BrowserRouter>
        <React.Suspense fallback={() => <h1>Loading...</h1>}>
          <App />          
        </React.Suspense>
      </BrowserRouter>
    </React.StrictMode>
  ,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
