export type PlatformTypes = 'google';

export interface UserInfo {
	platformId: string;
	email: string;
	profileImageUrl: string;
	platform: PlatformTypes;
	name: string;
}
