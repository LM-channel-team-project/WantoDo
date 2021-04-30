import { v4 as uuidV4 } from 'uuid';

import { UserInfo } from '../../common/types';
import { users } from '../../models/user.model';
import { tasks } from '../../models/task.model';

interface ReqOptions {
	tags: string[];
	important: number;
	period: { start: number; end: number };
}

/**
 * @author 강성모(castleMo)
 * @since 2021/04/29
 *
 * @param user			platform 유저 객체
 * @param contents	투두 내용
 * @param options		태그, 중요도, 시작 및 종료 기간
 */
export const createTask = async (user: UserInfo, contents: string, options: ReqOptions) => {
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
 * @since 2021/04/30
 *
 * @param user		platform 유저 객체
 * @param taskId	taskId
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
};
