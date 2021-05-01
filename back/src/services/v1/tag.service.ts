import { stringify, v4 as uuidV4 } from 'uuid';

import { TagInfo, UserInfo } from '../../common/types';
import { users } from '../../models/user.model';

// 21/4/29 by 현빈



// 태그 생성
export const createTag = (tag: TagInfo) => {
    return tag;
};

// 태그 수정

// 태그 삭제
export const deleteTag = async (user: UserInfo, tagId: string) => {
    try {
        await users
            .updateOne(
                //filter 
                {
                    userId: user.name,
                    tagId: {},
                    isDeleted: false,
                },
                //update 내용
                {
                    updatedTimestamp: Math.floor(+new Date()),
                    isDeleted: true,

                },
            ).exec();

        return {
            msg: 'success'
        };
    } catch (err) {
        throw err;
    }
};



export default {
    createTag,
    deleteTag,
}
