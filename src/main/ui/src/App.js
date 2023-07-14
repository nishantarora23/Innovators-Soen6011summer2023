import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
    const [htmlContent, setHtmlContent] = useState('');

    const callServlet = () => {
      axios.get('http://localhost:8080/careerconnect/Welcome')
        .then(response => {
          // Handle the response from the servlet
          setHtmlContent(response.data);
        })
        .catch(error => {
          // Handle any error that occurred during the request
          console.error(error);
        });
    };

  return (
    <div>
      <button type="button" onClick={callServlet}>
        CareerConnect
      </button>
      <div dangerouslySetInnerHTML={{ __html: htmlContent }}></div>
    </div>
  );
};

export default App;