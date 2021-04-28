import { v4 as uuidV4 } from 'uuid';

import { UserInfo } from '../../common/types';
import { BeginningOfWeek, Theme, users } from '../../models/user.model';

// Created by 강성모 on 2021/04/25
export const isUserExist = async (user: UserInfo) => {
	try {
		// 유저 존재여부 체크를 위한 쿼리
		const count: number = await users.countDocuments({
			platformId: user.platformId,
			platform: user.platform,
			closeAccountFlag: false,
		});

		// true : 유저 존재함
		// false : 유저 존재하지 않음
		const existUserFlag: boolean = count > 0;

		return {
			msg: 'success',
			data: {
				existUserFlag,
			},
		};
	} catch (e) {
		throw e;
	}
};

// Created by 강성모 on 2021/04/13
export const loginUser = async (user: UserInfo) => {
	try {
		// 신규유저인지 로그인유저인지 확인을 위한 쿼리
		const count: number = await users.countDocuments({
			platformId: user.platformId,
			platform: user.platform,
			closeAccountFlag: false,
		});

		let returnToUser = {
			email: '',
			platform: '',
			nickname: '',
			motto: '',
			profileImageUrl: '',
			settings: {},
		};

		if (count < 1) {
			// create
			const { email, platform, name, motto, profileImageUrl, settings } = await users.create({
				userId: uuidV4(),
				email: user.email,
				platform: user.platform,
				platformId: user.platformId,
				name: user.name,
				profileImageUrl: user.profileImageUrl,
			});
			returnToUser = {
				email,
				platform,
				nickname: name,
				motto,
				profileImageUrl,
				settings,
			};
		} else {
			// find
			const dbUser = await users
				.findOne({
					platform: user.platform,
					platformId: user.platformId,
					closeAccountFlag: false,
				})
				.exec();

			// 존재하지않으면 에러를 던져줌
			if (!dbUser) throw new Error('');

			returnToUser = {
				email: dbUser.email,
				platform: dbUser.platform,
				nickname: dbUser.nickname || dbUser.name,
				motto: dbUser.motto,
				profileImageUrl: dbUser.profileImageUrl,
				settings: dbUser.settings,
			};
		}

		return {
			msg: 'success',
			data: returnToUser,
		};
	} catch (err) {
		throw err;
	}
};

// Created by 강성모 on 2021/04/14
export const updateUserSettings = async (
	user: UserInfo,
	theme: Theme,
	notificationFlag: boolean | undefined,
	beginningOfWeek: BeginningOfWeek | undefined,
) => {
	try {
		if (theme === undefined && notificationFlag === undefined && beginningOfWeek === undefined) {
			throw new Error('theme, notificationFlag, beginningOfWeek 모두 값이없습니다.');
		}

		let updateObj = {};

		if (theme !== undefined) {
			updateObj = { 'settings.theme': theme };
		} else if (notificationFlag !== undefined) {
			updateObj = { 'settings.notificationFlag': notificationFlag };
		} else {
			updateObj = { 'settings.beginningOfWeek': beginningOfWeek };
		}

		await users
			.updateOne(
				{
					platformId: user.platformId,
					platform: user.platform,
					closeAccountFlag: false,
				},
				{
					$set: updateObj,
					updatedTimestamp: Math.floor(+new Date()),
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

// Created by 강성모(castleMo) on 2021/04/15
export const withdrawUser = async (user: UserInfo) => {
	try {
		await users
			.updateOne(
				{
					platformId: user.platformId,
					platform: user.platform,
					closeAccountFlag: false,
				},
				{
					updatedTimestamp: Math.floor(+new Date()),
					closeAccountFlag: true,
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
	isUserExist,
	loginUser,
	updateUserSettings,
	withdrawUser,
};
