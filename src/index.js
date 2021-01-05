import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Calculator from './App';
// import reportWebVitals from './reportWebVitals';

const Title = () => {
  return (
      <h1>Simple React Calculator</h1>
  )
}



ReactDOM.render(
  <React.StrictMode>
    <Title />
    <Calculator />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
