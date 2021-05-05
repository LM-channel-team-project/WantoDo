import { v4 as uuidV4 } from 'uuid';

import { UserInfo } from '../../common/types';
import { users } from '../../models/user.model';
import { tasks } from '../../models/task.model';

interface ReqCreateTaskOptions {
	tags: string[];
	important: number | undefined;
	period: { start: number; end: number } | undefined;
}

interface ReqGetTasksOptions {
	year: number;
	month: number;
	day: number | undefined;
}

interface ReqUpdateTaskOptions extends ReqCreateTaskOptions {
	contents: string | undefined;
}

/**
 * @author 강성모(castleMo)
 * @since 2021/04/29
 *
 * @param user        						platform 유저 객체
 * @param contents    						투두 내용
 * @param options      						태그, 중요도, 시작 및 종료 기간
 * @param options.tags      			태그
 * @param options.tags.tagId      태그 id
 * @param options.tags.isMainTag  메인 태그 여부
 * @param options.important     	태그, 중요도, 시작 및 종료 기간
 * @param options.period      		시작 및 종료 기간 오브젝트
 * @param options.period.start		시작 시간 (timestamp)
 * @param options.period.end    	종료 시간 (timestamp)
 */
export const createTask = async (user: UserInfo, contents: string, options: ReqCreateTaskOptions) => {
	try {
		const wantodoUser = await users.findByPlatformIdAndPlatform({
			platformId: user.platformId,
			platform: user.platform,
		});

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

export const getTasks = async (user: UserInfo, options: ReqGetTasksOptions) => {
	try {
		// const wantodoUser = await users.findByPlatformIdAndPlatform({
		// 	platformId: user.platformId,
		// 	platform: user.platform,
		// });

		return {
			msg: 'getTasks',
		};
	} catch (err) {
		throw err;
	}
};

/**
 * @author 강성모(castleMo)
 * @since 2021/05/02
 *
 * @param user                		platform 유저 객체
 * @param taskId              		task Id
 * @param options              		투두의 내용, 중요도, 시작 & 종료 기간, 태그 객체
 * @param options.tags      			태그
 * @param options.tags.tagId      태그 id
 * @param options.tags.isMainTag  메인 태그 여부
 * @param options.important     	태그, 중요도, 시작 및 종료 기간
 * @param options.period      		시작 및 종료 기간 오브젝트
 * @param options.period.start		시작 시간 (timestamp)
 * @param options.period.end    	종료 시간 (timestamp)
 */
export const updateTask = async (user: UserInfo, taskId: string, options: ReqUpdateTaskOptions) => {
	try {
		const wantodoUser = await users.findByPlatformIdAndPlatform({
			platformId: user.platformId,
			platform: user.platform,
		});

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
		const wantodoUser = await users.findByPlatformIdAndPlatform({
			platformId: user.platformId,
			platform: user.platform,
		});

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
	getTasks,
	updateTask,
	deleteTask,
};
