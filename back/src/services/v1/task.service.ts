import { v4 as uuidV4 } from 'uuid';

import { UserInfo } from '../../common/types';
import { users } from '../../models/user.model';
import { tasks } from '../../models/task.model';

interface ReqOptions {
	tags: string[];
	important: number;
	period: { start: number; end: number };
}

export const createTask = async (user: UserInfo, contents: string, options: ReqOptions) => {
	try {
		const wantodoUser = await users.findByPlatformId(user.platformId, user.platform);

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

export default {
	createTask,
};
