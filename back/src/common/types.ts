export type platform = 'google';

export interface UserInfo {
    platformId: string;
    email: string;
    profileImageUrl: string;
    platform: platform;
    name: string;
}