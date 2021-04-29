import { v4 as uuidV4 } from 'uuid';

import { TagInfo } from '../../common/types';
import { Tags } from '../../models/tag.model';

// 21/4/29 by 현빈



// 태그 생성
export const createTag = (tag: TagInfo) => {
    return tag;
};

// 태그 수정

// 태그 삭제
export const deleteTag = async (tag: TagInfo) => {
    try {
        await Tags
            .updateOne(
                {
                    tagId: tag.tagId,
                    content: tag.content,
                    whetherDeleteTag: false,
                },
                {
                    updatedTimestamp: Math.floor(+new Date()),
                    whetherDeleteTag: true,
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
