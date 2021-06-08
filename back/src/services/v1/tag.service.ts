import { v4 as uuidV4 } from 'uuid';
import { UserInfo } from '../../common/types';
import { users } from '../../models/user.model';
import { ITagDocument, tags } from '../../models/tag.model';
import Exceptions from '../../exceptions';
import { ITask, tasks } from '../../models/task.model';

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
		const wantodoUser = await users
			.findByPlatformIdAndPlatform({
				platformId: user.platformId,
				platform: user.platform,
			})
			.catch((err) => {
				throw new Exceptions.MongoException(err);
			});

		const tag: ITagDocument = await tags
			.create({
				userId: wantodoUser.userId,
				tagId: uuidV4(),
				name,
				color,
			})
			.catch((err) => {
				throw new Exceptions.MongoException(err);
			});

		return {
			msg: 'createTag',
			data: {
				tag: {
					tagId: tag.tagId,
					name: tag.name,
					color: tag.color,
				},
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
 * @param user platform 유저 객체
 */
export const getTags = async (user: UserInfo) => {
	try {
		const wantodoUser = await users
			.findByPlatformIdAndPlatform({
				platformId: user.platformId,
				platform: user.platform,
			})
			.catch((err) => {
				throw new Exceptions.MongoException(err);
			});

		const returnTags = await tags
			.find(
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
			)
			.catch((err) => {
				throw new Exceptions.MongoException(err);
			});

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

		const wantodoUser = await users
			.findByPlatformIdAndPlatform({
				platformId: user.platformId,
				platform: user.platform,
			})
			.catch((err) => {
				throw new Exceptions.MongoException(err);
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
			.exec()
			.catch((err) => {
				throw new Exceptions.MongoException(err);
			});

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

		// 태그가 속한 task 찾아서 태그 지우기
		await tasks
			.updateMany(
				{
					userId: wantodoUser.userId,
					'tags.tagId': tagId,
				},
				{
					$pull: { tags: { tagId } },
					updatedTimestamp: Math.floor(+new Date()),
				},
			)
			.exec();

		// 태그 지우기
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
			.exec()
			.catch((err) => {
				throw new Exceptions.MongoException(err);
			});

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
