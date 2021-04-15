import React from 'react';
import { FiCalendar } from 'react-icons/fi';
import Button from './components/Button';
import IconButton from './components/IconButton';
import InputBox from './components/InputBox';

function App() {
  return (
    <div className="app">
      <InputBox labelText="시작" name="start" type="text" />
      <Button
        type="submit"
        styleName="calendar"
        onClick={event => console.log(event.target.type)}
      >
        일반 버튼1
      </Button>
      <Button onClick={event => console.log(event.target.type)}>
        일반 버튼2
      </Button>
      <IconButton
        Icon={FiCalendar}
        type="submit"
        onClick={event => console.log(event.target.type)}
      />
      <IconButton
        Icon={FiCalendar}
        type="submit"
        styleName="calendar"
        onClick={event => console.log(event.target.type)}
      >
        텍스트 있는 아이콘버튼
      </IconButton>
    </div>
  );
}

export default App;
