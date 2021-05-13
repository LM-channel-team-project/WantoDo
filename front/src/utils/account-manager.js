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

  getUserTasks = async (token, { year, month, day = '' }, handleTasks) => {
    const url = `${process.env.REACT_APP_SERVER_URL}/api/v1/tasks`;

    let tasks;
    try {
      const response = await axios({
        method: 'get',
        url,
        headers: { Authorization: token },
        params: { year: String(year), month: String(month) },
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
}

const accountManager = new AccountManager();

export default accountManager;
