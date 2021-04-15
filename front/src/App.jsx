import React from 'react';
import Button from './components/Button';
import InputBox from './components/InputBox';

function App() {
  return (
    <div className="app">
      <InputBox labelText="시작" name="start" type="text" />
      <Button type="submit" onClick={event => console.log(event.target.type)}>
        일반 버튼1
      </Button>
      <Button onClick={event => console.log(event.target.type)}>
        일반 버튼2
      </Button>
    </div>
  );
}

export default App;
