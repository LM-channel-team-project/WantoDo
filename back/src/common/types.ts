export type PlatformTypes = 'google';

export interface UserInfo {
	platformId: string;
	email: string;
	profileImageUrl: string;
	platform: PlatformTypes;
	name: string;
}

// tag정보 by 현빈 21/4/29
export interface TagInfo {
	tagId: string;
	content: string;
}
