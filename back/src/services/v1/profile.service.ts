import { UserInfo } from '../../common/types';
import { users } from '../../models/user.model';

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

export const updateProfile = async (user: UserInfo) => {};

export default {
	getProfile,
	updateProfile,
};
