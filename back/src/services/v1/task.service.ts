import { v4 as uuidV4 } from 'uuid';

import { UserInfo } from '../../common/types';
import { users } from '../../models/user.model';
import { tasks } from '../../models/task.model';

interface ReqCreateTaskOptions {
	tags: string[];
	important: number | undefined;
	period: { start: number; end: number } | undefined;
}

interface ReqUpdateTaskOptions extends ReqCreateTaskOptions {
	contents: string | undefined;
}

/**
 * @author 강성모(castleMo)
 * @since 2021/04/29
 *
 * @param user				platform 유저 객체
 * @param contents  	투두 내용
 * @param options			태그, 중요도, 시작 및 종료 기간
 */
export const createTask = async (user: UserInfo, contents: string, options: ReqCreateTaskOptions) => {
	try {
		const wantodoUser = await users.findByPlatformIdAndPlatform(user.platformId, user.platform);

		await tasks.create({
			userId: wantodoUser.userId,
			taskId: uuidV4(),
			contents,
			...options,
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
 * @since 2021/05/02
 *
 * @param user              	platform 유저 객체
 * @param taskId            	task Id
 * @param options            	투두의 내용, 중요도, 시작 & 종료 기간, 태그 객체
 * @param options.contents		task 내용
 * @param options.important		중요도
 * @param options.period			시작 & 종료 기간
 * @param options.tags				태그
 */
export const updateTask = async (user: UserInfo, taskId: string, options: ReqUpdateTaskOptions) => {
	try {
		const wantodoUser = await users.findByPlatformIdAndPlatform(user.platformId, user.platform);
		const { contents, important, period, tags } = options;

		const updateDoc: any = {
			updatedTimestamp: Math.floor(+new Date()),
		};

		if (contents !== undefined) updateDoc.contents = contents;
		if (important !== undefined) updateDoc.important = important;
		if (period !== undefined) updateDoc.period = period;
		if (tags !== undefined) updateDoc.tags = tags;

		await tasks
			.updateOne(
				{
					userId: wantodoUser.userId,
					taskId,
					isDeleted: false,
				},
				updateDoc,
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
 * @since 2021/04/30
 *
 * @param user    platform 유저 객체
 * @param taskId  taskId
 */
export const deleteTask = async (user: UserInfo, taskId: string) => {
	try {
		const wantodoUser = await users.findByPlatformIdAndPlatform(user.platformId, user.platform);

		await tasks
			.updateOne(
				{
					userId: wantodoUser.userId,
					taskId,
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
	createTask,
	deleteTask,
	updateTask,
};
