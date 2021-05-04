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
}

const accountManager = new AccountManager();

export default accountManager;
