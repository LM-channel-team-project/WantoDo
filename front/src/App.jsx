import React from 'react';
import { FiCalendar } from 'react-icons/fi';
import { RiShieldCheckLine } from 'react-icons/ri';
import { BsListCheck } from 'react-icons/bs';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Button from './components/Button';
import IconButton from './components/IconButton';
import InputBox from './components/InputBox';
import MenuSelector from './components/MenuSelector';
import Navbar from './container/Navbar';
import QuickButton from './components/QuickButton';
import ProfileModal from './components/ProfileModal';
import TaskList from './components/TaskList';
import TagButton from './components/TagButton';
import Tag from './components/Tag';
import TagInputBox from './components/TagInputBox';
import Calendar from './components/Calendar';

const ROOT_PATH = process.env.PUBLIC_URL;

function App() {
  return (
    <Router>
      <Route path={`${ROOT_PATH}/`} exact>
        <TestPage />
      </Route>
      <Route path={`${ROOT_PATH}/login`}>
        <h1>LoginPage</h1>
      </Route>
    </Router>
  );
}

const TestPage = () => {
  const dumyProfile = {
    userName: 'WantoDo',
    email: 'WantoDo.@gmail.com',
    imageURL: '',
    motto: '고생 끝엔 치킨이 기다린다',
    goal: '프로젝트 끝나고 치킨 먹기🍗',
  };

  const dumyTasks = {
    '4k1g2435hk': {
      level: 0,
      checked: true,
      content: '투두리스트 만들기',
      periods: [Date.now()],
    },
    '4f5j76k2d1': {
      level: 1,
      checked: false,
      content: '컴포넌트 전부 완성하기',
      periods: [new Date('2021-04-21T16:30:00'), new Date('2021-04-22T16:30:00')],
    },
    '3ds45h63o5': {
      level: 2,
      checked: false,
      content: '비즈니스 로직 짜기',
      periods: [new Date('2021-04-21T16:30:00'), new Date('2021-04-23T16:30:00')],
    },
    '16wh4rk43w': {
      level: 3,
      checked: false,
      content: '프로젝트 마치고 치킨 먹기',
      periods: [new Date('2021-04-23T16:30:00'), new Date('2021-04-24T16:30:00')],
    },
  };

  const dumyTags = [
    {
      id: 'jhd84hjg7dhe234',
      name: '개발',
      color: 'blue',
    },
    {
      id: 'f8rj489rheof9we',
      name: '취미',
      color: 'yellow',
    },
    {
      id: 'j4832843enbhfi2',
      name: '중요',
      color: 'pink',
    },
  ];

  return (
    <div className="app">
      <div>
        <TagInputBox tags={dumyTags} />
      </div>
      <div>
        <TagButton name="tag1" />
        <TagButton name="tag2" />
        <TagButton name="tag3" />
      </div>
      <div>
        <Tag name="tag4" color="blue" />
        <Tag name="tag5" color="gree" />
        <Tag name="tag6" color="pink" />
      </div>
      <div>
        <TaskList tasks={dumyTasks} />
      </div>

      <div
        style={{
          width: '54px',
          height: '100vh',
        }}
      >
        <Navbar />
      </div>
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
        <MenuSelector iconList={{ FiCalendar, RiShieldCheckLine, BsListCheck }} />
      </div>
      <QuickButton />
      <ProfileModal profile={dumyProfile} />
      <div>
        <section className="hero is-primary">
          <div className="hero-body">
            <div className="Container">
              <h1 className="CalendarTitle">Calendar</h1>
            </div>
          </div>
        </section>
        <div className="CalendarContainer">
          <Calendar />
        </div>
      </div>
    </div>
  );
};

export default App;
