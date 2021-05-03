import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './container/Navbar';
import QuickButton from './components/QuickButton';
import ProfileModal from './components/ProfileModal';
import TaskList from './components/TaskList';
import TagButton from './components/TagButton';
import Tag from './components/Tag';
import TagInputBox from './components/TagInputBox';
import Calendar from './components/Calendar';
import Login from './page/Login';
import Main from './page/Main';

const ROOT_PATH = process.env.PUBLIC_URL;

function App() {
  return (
    <div className="container">
      <Router>
        <Switch>
          <Route path={`${ROOT_PATH}/`} exact>
            <Main />
          </Route>
          <Route path={`${ROOT_PATH}/login`}>
            <Login />
          </Route>
          <Route path={`${ROOT_PATH}/test`}>
            <TestPage />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;

// 테스트 및 스타일링 위한 임시 코드
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
    color: 'red',
  },
];

const TestPage = () => {
  return (
    <div className="app">
      <div>
        <TagInputBox tags={dumyTags} />
      </div>
      <div>
        <TagButton name="tag1" color="red" />
        <TagButton name="tag2" color="orenge" />
        <TagButton name="tag3" color="yellow" />
      </div>
      <div>
        <Tag name="tag4" color="green" />
        <Tag name="tag5" color="blue" />
        <Tag name="tag6" color="purple" />
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
