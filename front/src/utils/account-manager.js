import axios from 'axios';

class AccountManager {
  // 사용자 식별 정보를 서버에 보내고 사용자의 가입 상태와 프로필 정보를 받아오는 메서드
  getUserData = async (token) => {
    const url = `${process.env.REACT_APP_SERVER_URL}/api/v1/accounts/login`;

    let userData;
    try {
      const response = await axios({
        method: 'post',
        url,
        headers: { Authorization: token },
      });

      const { data } = response.data;

      const profile = {
        userName: data.nickname,
        email: data.email,
        imageURL: data.profileImageUrl,
        motto: data.motto,
        platform: data.platform,
      };

      userData = { profile, isTutorial: data.isTutorial };
    } catch (error) {
      throw new Error(error);
    }

    return userData;
  };

  // 최초 로그인한 사용자가 초기 프로필 제출할 때 서버에 튜토리얼 완료 상태 전송
  completeTutorial = async (token) => {
    const url = `${process.env.REACT_APP_SERVER_URL}/api/v1/accounts/tutorial`;

    const response = await axios({
      method: 'post',
      url,
      headers: { Authorization: token },
    });
    return response;
  };

  getUserProfile = async (token) => {
    const url = `${process.env.REACT_APP_SERVER_URL}/api/v1/profiles`;

    let profile;
    try {
      const response = await axios({
        method: 'get',
        url,
        headers: { Authorization: token },
      });

      const { data } = response.data;

      profile = {
        userName: data.nickname,
        email: data.email,
        imageURL: data.profileImageUrl,
        motto: data.motto,
        platform: data.platform,
      };
    } catch (error) {
      throw new Error(error);
    }

    return profile;
  };

  // 서버에 프로필 수정 요청
  updateUserProfile = async (token, profile) => {
    const url = `${process.env.REACT_APP_SERVER_URL}/api/v1/profiles`;

    // 수정 데이터만 전송
    const updated = Object.keys(profile).reduce((obj, key) => {
      const copied = { ...obj };
      copied[key] = profile[key];
      return copied;
    }, {});

    await axios.patch(url, updated, {
      headers: {
        Authorization: token,
      },
    });

    // 추후에 응답 핸들링 추가
  };

  getUserTasks = async (token, time, handleTasks) => {
    const url = `${process.env.REACT_APP_SERVER_URL}/api/v1/tasks`;

    // time 객체에 존재하는 값만 객체로 만듦
    const params = Object.keys(time).reduce((timeObj, key) => {
      const copied = { ...timeObj };
      if (key) copied[key] = time[key];
      return copied;
    }, {});

    let tasks;
    try {
      const response = await axios({
        method: 'get',
        url,
        headers: { Authorization: token },
        params,
      });

      const { data } = response.data;

      tasks = data.tasks.reduce((tasksObj, task) => {
        const copied = { ...tasksObj };
        const { taskId, contents, important, isChecked, tags, period } = task;
        copied[taskId] = {
          level: important,
          checked: isChecked,
          content: contents,
          periods: period,
          tags,
        };
        return copied;
      }, {});
    } catch (error) {
      throw new Error(error);
    }

    try {
      if (handleTasks instanceof Function) handleTasks(tasks);
    } catch (error) {
      throw new Error(error);
    }
  };

  addTask = async (token, task) => {
    const url = `${process.env.REACT_APP_SERVER_URL}/api/v1/tasks`;

    const matchingKeys = {
      level: 'important',
      tags: 'tags',
      content: 'contents',
      periods: 'period',
    };

    // task에 존재하는 값만 객체로 만듦
    const data = Object.keys(task).reduce((taskObj, key) => {
      const copied = { ...taskObj };

      if (key === 'tags') {
        copied[key] = task.tags.map((tag) => ({ tagId: tag.id, isMainTag: tag.isMainTag }));
        return copied;
      }

      if (task[key]) copied[matchingKeys[key]] = task[key];
      return copied;
    }, {});

    const response = await axios({
      method: 'post',
      url,
      headers: { Authorization: token },
      data,
    });

    // 추후에 서버에서 태스크 id 받아와서 반환하는 것으로 변경
    return response.data.msg;
  };

  updateTask = async (token, taskId, task) => {
    const url = `${process.env.REACT_APP_SERVER_URL}/api/v1/tasks/${taskId}`;

    const matchingKeys = {
      level: 'important',
      tags: 'tags',
      content: 'contents',
      periods: 'period',
      checked: 'checked',
    };

    // task에 존재하는 값만 객체로 만듦
    const data = Object.keys(task).reduce((taskObj, key) => {
      const copied = { ...taskObj };

      // 서버에서 사용하는 필드명으로 변환하고 값 매칭
      if (task[key]) copied[matchingKeys[key]] = task[key];
      return copied;
    }, {});

    await axios({
      method: 'patch',
      url,
      headers: { Authorization: token },
      data,
    });
  };

  addTag = async (token, tag) => {
    const url = `${process.env.REACT_APP_SERVER_URL}/api/v1/tags`;

    const { data } = await axios({
      method: 'post',
      url,
      headers: { Authorization: token },
      data: tag,
    });

    return data.data.tag.tagId;
  };
}

const accountManager = new AccountManager();

export default accountManager;
