// 태그 생성
export const createTag = (name: string, color: string) => {
	console.log(name, color);
	return {
		msg: 'createTag',
	};
};

// 태그 수정

// 태그 삭제
export const deleteTag = async () => {
	try {
		// await users
		// 	.updateOne(
		// 		// filter
		// 		{
		// 			userId: user.name,
		// 			tagId: {},
		// 			isDeleted: false,
		// 		},
		// 		// update 내용
		// 		{
		// 			updatedTimestamp: Math.floor(+new Date()),
		// 			isDeleted: true,
		// 		},
		// 	)
		// 	.exec();

		return {
			msg: 'deleteTag',
		};
	} catch (err) {
		throw err;
	}
};

export default {
	createTag,
	deleteTag,
};
