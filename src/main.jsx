
import React from 'react';
import { createRoot } from 'react-dom/client';

function App() {
  return (
    <main style={{ fontFamily: 'Arial', padding: '40px' }}>
      <h1>Docker Multi-stage Build</h1>
      <p>React + Vite đang chạy thành công!</p>
      <p>Bài thực hành Session 10 - Exercise 3</p>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
