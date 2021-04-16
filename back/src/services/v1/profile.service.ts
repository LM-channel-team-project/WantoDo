import { v4 as uuidV4 } from 'uuid';

import * as Types from "../../common/types";
import { users, theme } from '../../models/user.model';


// 21/4/13, 21/4/16 by 현빈
// 로그인 유저인지는 models/goolge에서 확인함
// => 로그인 유저 플랫폼, 닉네임, 토큰? 정기결제 확인해줌.
export const getProfile = async (user: {
    platformId: string,
    email: string,
    profileImageUrl: string,
    platform: Types.platform,
    name: string,
}) => {
    try {

        // 21/4/16 Db에서 유저 찾기 + 정보 가져오기 by 현빈
        const findDatabaseUser = await users.findOne({
            platform: user.platform,
            platformId: user.platformId,
            closeAccountFlag: false,
        }).exec();

        if (!findDatabaseUser) throw new Error('');

        const returnToUser = {
            email: findDatabaseUser.email,
            platform: findDatabaseUser.platform,
            motto: findDatabaseUser.motto,
            profileImageUrl: findDatabaseUser.profileImageUrl,
            nickname: findDatabaseUser.nickname || findDatabaseUser.name,
        }

        return {
            msg: "Success",
            data: { nickname: returnToUser.nickname }
            // data: {nickname: "sungmo"} 라고 해야되나요? - 유저 반환으로 하면 되는건가용..?
        }
    } catch (err) {
        throw err;
    }

};



