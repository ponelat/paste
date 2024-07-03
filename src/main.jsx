import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { ErrorBoundary } from "react-error-boundary";

function Fallback({ error, resetErrorBoundary }) {
  return (
    <div role="alert" className="p-8 bg-red-100 text-red-800" >
      <p className="text-lg" >Something went wrong, try resetting the caches.</p>
      <div className="mt-8" >
        <button className="bg-red-600"  onClick={resetErrorBoundary}>Reset Cache</button>
      </div>
      <h2 className="mt-8 text-2xl" >Error:</h2>
      <pre className="mt-1" >{error.message}</pre>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary
      FallbackComponent={Fallback}
      onReset={(details) => {
        localStorage.clear()
      }}
    >
    <App />
    </ErrorBoundary>
  </React.StrictMode>,
)
