import { v4 as uuidV4 } from 'uuid';

import { UserInfo } from '../../common/types';
import { users } from '../../models/user.model';
import { tasks } from '../../models/task.model';
import Exceptions from '../../exceptions';

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
 * @param user                    platform 유저 객체
 * @param contents                투두 내용
 * @param options                  태그, 중요도, 시작 및 종료 기간
 * @param options.tags            태그
 * @param options.tags.tagId      태그 id
 * @param options.tags.isMainTag  메인 태그 여부
 * @param options.important      태그, 중요도, 시작 및 종료 기간
 * @param options.period          시작 및 종료 기간 오브젝트
 * @param options.period.start    시작 시간 (timestamp)
 * @param options.period.end      종료 시간 (timestamp)
 */
export const createTask = async (user: UserInfo, contents: string, options: ReqCreateTaskOptions) => {
	try {
		const wantodoUser = await users
			.findByPlatformIdAndPlatform({
				platformId: user.platformId,
				platform: user.platform,
			})
			.catch((err) => {
				throw new Exceptions.MongoException(err);
			});

		await tasks
			.create({
				userId: wantodoUser.userId,
				taskId: uuidV4(),
				contents,
				...options,
			})
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
 * @since 2021/04/29
 *
 * @param user					platform 유저 객체
 * @param options				년, 월, 일
 * @param options.year	년
 * @param options.month	월
 * @param options.day		일
 */
export const getTasks = async (user: UserInfo, options: ReqGetTasksOptions) => {
	try {
		const wantodoUser = await users
			.findByPlatformIdAndPlatform({
				platformId: user.platformId,
				platform: user.platform,
			})
			.catch((err) => {
				throw new Exceptions.MongoException(err);
			});

		const { year, month, day } = options;

		// 조회할 시작과 끝 시간
		let startTimestamp = 0;
		let endTimestamp = 0;

		if (Number.isNaN(day)) {
			// day 값이 들어오지 않으면 한달 조회
			startTimestamp = +new Date(year, month - 1, 1, 0, 0, 0);
			endTimestamp = +new Date(year, month, 0, 23, 59, 59);
		} else {
			// day 값이 들어오면 하루 조회
			startTimestamp = +new Date(year, month - 1, day, 0, 0, 0);
			endTimestamp = +new Date(year, month - 1, day, 23, 59, 59);
		}

		const returnToTasks = await tasks
			.find(
				{
					userId: wantodoUser.userId,
					isDeleted: false,
					'period.start': { $gte: startTimestamp },
					'period.end': { $lte: endTimestamp },
				},
				{
					_id: 0,
					__v: 0,
					userId: 0,
					isDeleted: 0,
				},
			)
			// Task 시작시간에 맞춰 sorting
			.sort({
				'period.start': 1,
			})
			.exec()
			.catch((err) => {
				throw new Exceptions.MongoException(err);
			});

		return {
			msg: 'success',
			data: {
				tasks: returnToTasks,
			},
		};
	} catch (err) {
		throw err;
	}
};

/**
 * @author 강성모(castleMo)
 * @since 2021/05/02
 *
 * @param user                    platform 유저 객체
 * @param taskId                  task Id
 * @param options                 투두의 내용, 중요도, 시작 & 종료 기간, 태그 객체
 * @param options.tags            태그
 * @param options.tags.tagId      태그 id
 * @param options.tags.isMainTag  메인 태그 여부
 * @param options.important      	태그, 중요도, 시작 및 종료 기간
 * @param options.period          시작 및 종료 기간 오브젝트
 * @param options.period.start    시작 시간 (timestamp)
 * @param options.period.end      종료 시간 (timestamp)
 */
export const updateTask = async (user: UserInfo, taskId: string, options: ReqUpdateTaskOptions) => {
	try {
		const wantodoUser = await users
			.findByPlatformIdAndPlatform({
				platformId: user.platformId,
				platform: user.platform,
			})
			.catch((err) => {
				throw new Exceptions.MongoException(err);
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
 * @since 2021/05/05
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
	createTask,
	getTasks,
	updateTask,
	deleteTask,
};
