import { v4 as uuidV4 } from 'uuid';
import { UserInfo } from '../../common/types';
import { users } from '../../models/user.model';
import { tags } from '../../models/tag.model';

/**
 * @author 강성모(castleMo)
 * @since 21/05/03
 *
 * @param user  platform 유저 객체
 * @param name  태그 이름
 * @param color  태그 색
 */
export const createTag = async (user: UserInfo, name: string, color: string) => {
	try {
		const wantodoUser = await users.findByPlatformIdAndPlatform({
			platformId: user.platformId,
			platform: user.platform,
		});

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

/**
 * @author 강성모(castleMo)
 * @since 21/05/03
 *
 * @param user platform 유저 객체
 */
export const getTags = async (user: UserInfo) => {
	try {
		const wantodoUser = await users.findByPlatformIdAndPlatform({
			platformId: user.platformId,
			platform: user.platform,
		});

		const returnTags = await tags.find(
			{
				userId: wantodoUser.userId,
				isDeleted: false,
			},
			{
				_id: 0,
				tagId: 1,
				name: 1,
				color: 1,
			},
		);

		return {
			msg: 'success',
			data: {
				tags: returnTags,
			},
		};
	} catch (err) {
		throw err;
	}
};

/**
 * @author 강성모(castleMo)
 * @since 21/05/03
 *
 * @param user  platform 유저 객체
 * @param tagId  태그 id
 * @param name  태그 이름
 * @param color  태그 색
 */
export const updateTag = async (user: UserInfo, tagId: string, name: string, color: string) => {
	try {
		// todo: Error model 정의하기
		if (name === undefined && color === undefined) throw new Error('둘다 비어있음');

		const wantodoUser = await users.findByPlatformIdAndPlatform({
			platformId: user.platformId,
			platform: user.platform,
		});

		const updateTagDoc: any = {
			updatedTimestamp: Math.floor(+new Date()),
		};

		if (name !== undefined) updateTagDoc.name = name;
		if (color !== undefined) updateTagDoc.color = color;

		await tags
			.updateOne(
				{
					userId: wantodoUser.userId,
					tagId,
					isDeleted: false,
				},
				updateTagDoc,
			)
			.exec();

		return {
			msg: 'success',
		};
	} catch (err) {
		throw err;
	}
};

/**
 * @author 강성모(castleMo)
 * @since 21/05/03
 *
 * @param user  platform 유저 객체
 * @param tagId  태그 id
 */
export const deleteTag = async (user: UserInfo, tagId: string) => {
	try {
		const wantodoUser = await users.findByPlatformIdAndPlatform({
			platformId: user.platformId,
			platform: user.platform,
		});

		await tags
			.updateOne(
				{
					userId: wantodoUser.userId,
					tagId,
					isDeleted: false,
				},
				{
					updatedTimestamp: Math.floor(+new Date()),
					isDeleted: true,
				},
			)
			.exec();

		return {
			msg: 'success',
		};
	} catch (err) {
		throw err;
	}
};

export default {
	createTag,
	getTags,
	updateTag,
	deleteTag,
};
