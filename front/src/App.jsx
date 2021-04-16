import React from 'react';
import { FiCalendar } from 'react-icons/fi';
import { RiShieldCheckLine } from 'react-icons/ri';
import { BsListCheck } from 'react-icons/bs';
import Button from './components/Button';
import IconButton from './components/IconButton';
import InputBox from './components/InputBox';
import MenuSelector from './components/MenuSelector';
import Navbar from './container/Navbar';
import ProfileModal from './components/ProfileModal';

function App() {
  const dumyProfile = {
    userName: 'WantoDo',
    email: 'WantoDo.@gmail.com',
    imageURL: '',
    motto: '고생 끝엔 치킨이 기다린다',
    goal: '프로젝트 끝나고 치킨 먹기🍗',
  };

  return (
    <div className="app">
      <Navbar />
      <InputBox labelText="시작" name="start" type="text" />
      <Button type="submit" styleName="calendar">
        일반 버튼1
      </Button>
      <Button>일반 버튼2</Button>
      <IconButton Icon={FiCalendar} type="submit" />
      <IconButton Icon={FiCalendar} type="submit" styleName="calendar">
        텍스트 있는 아이콘버튼
      </IconButton>
      <div>
        <MenuSelector
          iconList={{ FiCalendar, RiShieldCheckLine, BsListCheck }}
        />
      </div>
      <ProfileModal profile={dumyProfile} />
    </div>
  );
}

export default App;
