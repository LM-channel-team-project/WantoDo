import { v4 as uuidV4 } from 'uuid';

import * as Types from "../../common/types";
import { users } from '../../models/user.model';


// 21//4/13 by 현빈
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
        const user = await users.findOne({
            platform: users.platform,
            platformId: user.platformId,
            closeAccountFlag: false

        })
    }


}



