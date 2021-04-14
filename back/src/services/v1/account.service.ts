import { v4 as uuidV4 } from 'uuid';

import * as Types from "../../common/types";
import { UserInfo } from "../../common/types";
import { beginningOfWeek, theme, users } from '../../models/user.model';


export const loginUser = async (user: {
    platformId: string,
    email: string,
    profileImageUrl: string,
    platform: Types.platform,
    name: string,
}) => {
    try {

        // 신규유저인지 로그인유저인지 확인을 위한 쿼리
        const count: number = await users.count({
            platformId: user.platformId,
            platform: user.platform,
            closeAccountFlag: false,
        });

        let returnUser = {
            email: '',
            platform: '',
            nickname: '',
            motto: '',
            profileImageUrl: '',
        };

        if (count < 1) {
            // create
            const {
                email,
                platform,
                name,
                motto,
                profileImageUrl
            } = await users.create({
                userId: uuidV4(),
                email: user.email,
                platform: user.platform,
                platformId: user.platformId,
                name: user.name,
                profileImageUrl: user.profileImageUrl
            });
            returnUser = {
                email,
                platform,
                nickname: name,
                motto,
                profileImageUrl,
            }
        } else {
            // find
            const dbUser = await users.findOne({
                platform: user.platform,
                platformId: user.platformId,
                closeAccountFlag: false,
            }).exec();

            // 존재하지않으면 에러를 던져줌
            if (!dbUser) throw new Error('');

            returnUser = {
                email: dbUser.email,
                platform: dbUser.platform,
                nickname: dbUser.nickname || dbUser.name,
                motto: dbUser.motto,
                profileImageUrl: dbUser.profileImageUrl,
            }
        }

        return {
            message: 'testing',
            user: returnUser,
        }
    } catch (e) {
        throw e;
    }
}

export const updateUserSettings = async (user: UserInfo, theme: theme, notificationFlag: boolean | undefined, beginningOfWeek: beginningOfWeek | undefined) => {
    try {

        const updateThemeObj = {'settings.theme': theme}
        const updateNotificationFlagObj = {'settings.notificationFlag': notificationFlag}
        const updateBeginningOfWeekObj = {'settings.beginningOfWeek': beginningOfWeek}

        const updateObj = theme !== undefined ? updateThemeObj : notificationFlag !== undefined ? updateNotificationFlagObj : updateBeginningOfWeekObj;

        await users.updateOne({
                platformId: user.platformId,
                platform: user.platform,
                closeAccountFlag: false,
            },
            {
                $set: updateObj,
                updatedTimestamp: Math.floor(+new Date()),
            }
        ).exec();

        return {
            msg: 'test'
        }
    } catch (err) {
        throw err;
    }
}