import { v4 as uuidV4 } from 'uuid';
import { UserInfo } from '../../common/types';
import { users } from '../../models/user.model';
import { tags } from '../../models/tag.model';

/**
 * @author 강성모(castleMo)
 * @since 21/05/03
 *
 * @param user	platform 유저 객체
 * @param name	태그 이름
 * @param color	태그 색
 */
export const createTag = async (user: UserInfo, name: string, color: string) => {
	try {
		const wantodoUser = await users.findByPlatformIdAndPlatform(user.platformId, user.platform);

		await tags.create({
			userId: wantodoUser.userId,
			tagId: uuidV4(),
			name,
			color,
		});

		return {
			msg: 'createTag',
		};
	} catch (err) {
		throw err;
	}
};

// 태그 수정

// 태그 삭제
export const deleteTag = async () => {
	try {
		// await users
		// 	.updateOne(
		// 		// filter
		// 		{
		// 			userId: user.name,
		// 			tagId: {},
		// 			isDeleted: false,
		// 		},
		// 		// update 내용
		// 		{
		// 			updatedTimestamp: Math.floor(+new Date()),
		// 			isDeleted: true,
		// 		},
		// 	)
		// 	.exec();

		return {
			msg: 'deleteTag',
		};
	} catch (err) {
		throw err;
	}
};

export default {
	createTag,
	deleteTag,
};
