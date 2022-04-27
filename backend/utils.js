const randomIntFromInterval = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// 인자로 받은 컬랙션에서 랜덤한 _id 반환하는 함수
const getRandomId = function(collection) {
    return new Promise((resolve, reject) => {
        collection.find().toArray((err, docs) => {
            if (err) {return reject(err)};

            const user = docs[randomIntFromInterval(0, docs.length-1)];
            return resolve(user._id);
        })
    })
}

// 완전한 게시물 형태의 payload 생성 함수
const makeFullPostPayload = function(posts, users, comments) {

    const result = posts.map(post => {
        const user = users.find(user => user._id.equals(post.user_id));
        const commentsOnPost = comments.filter(comment => comment.post_id.equals(post._id)).map(comment => {
            const commentUser = users.find(user => user._id.equals(comment.user_id));
            return {
                id: comment._id,
                userId: commentUser._id,
                userNickName: commentUser.nickName,
                contents: comment.contents,
                createdAt: comment.createdAt,
                updatedAt: comment.updatedAt,
            }
        })

        return {
            id: post._id,
            userId: post.user_id,
            userNickName: user.nickName,
            userAddress: user.address,
            ipfs: post.ipfs,
            title: post.title,
            contents: post.contents,
            createdAt: post.createdAt,
            updatedAt: post.updatedAt,
            comments: commentsOnPost
        }
    });

    return result;
}

module.exports = { randomIntFromInterval, getRandomId, makeFullPostPayload };