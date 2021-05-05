import { UserInfo } from '../../common/types';
import { users } from '../../models/user.model';

interface ReqUpdateProfileOptions {
	nickname: string;
	motto: string;
	profileImageUrl: string;
}

/**
 * @author 강성모(castleMo)
 * @since 21/05/04
 *
 * @param user platform 유저 객체
 */
export const getProfile = async (user: UserInfo) => {
	try {
		const wantodoUser = await users.findByPlatformIdAndPlatform({
			platformId: user.platformId,
			platform: user.platform,
		});

		return {
			msg: 'success',
			data: {
				email: wantodoUser.email,
				platform: wantodoUser.platform,
				nickname: wantodoUser.nickname || wantodoUser.name,
				motto: wantodoUser.motto,
				profileImageUrl: wantodoUser.profileImageUrl,
				settings: wantodoUser.settings,
			},
		};
	} catch (err) {
		throw err;
	}
};

/**
 * @author 강성모(castleMo)
 * @since 21/05/04
 *
 * @param user		platform 유저 객체
 * @param options 닉네임, 좌우명, 프로필 이미지 URL
 * @param options.nickname 닉네임
 * @param options.motto 좌우명
 * @param options.profileImageUrl 프로필 이미지 URL
 */
export const updateProfile = async (user: UserInfo, options: ReqUpdateProfileOptions) => {
	try {
		const { motto, nickname, profileImageUrl } = options;

		if (motto === undefined && nickname === undefined && profileImageUrl === undefined)
			throw new Error('다비어있음');

		const updateDoc: any = {};

		if (motto !== undefined) updateDoc.motto = motto;
		if (nickname !== undefined) updateDoc.nickname = nickname;
		if (profileImageUrl !== undefined) updateDoc.profileImageUrl = profileImageUrl;

		await users
			.updateOne(
				{
					platformId: user.platformId,
					platform: user.platform,
					isCloseAccount: false,
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

export default {
	getProfile,
	updateProfile,
};
