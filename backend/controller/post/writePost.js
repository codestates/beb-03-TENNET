const {User, Post, Comment, ContractAddress} = require("../../models");

module.exports = {
    post: async (req, res) => {
        const { userId, ipfs, title, contents, contractAddress, tokenId } = req.body;
    // 요청 검증
        // 요청 body 필요한 값 전부 전달 받았는가?
        if (!userId || !ipfs || !title || !contents || !contractAddress || !tokenId) {
            return res.status(422).send("Validation Error");
        };
        // userId 유효한가? (DB에 존재하는 유저인가) (요청 전에 프론트에서 유저 정보를 받은 상태라면 필요없는 과정일까?)
        const user = await User.findOne({_id: userId});
        if (!user) {
            return res.status(422).send("userId is wrong! failed to find this user.");
        };
        // ipfs 유니크한가?
        const post = await Post.findOne({ipfs});
        if (post) {
            return res.status(422).send("Duplicated IPFS");
        };
        // contractAddress 유효한가?
        const ctAddr = await ContractAddress.findOne({contractAddress});
        if (!ctAddr || ctAddr.activation === false) {
            return res.status(422).send("unvalid contractAddress");
        };
        // tokenId 가 해당 컨트렉트에서 유일한가? (프론트에서 얼마나 검증되는지 확인후 구현하자)

    // 도큐먼트 생성하고 응답하기

        const newPost = new Post({
            user_id: userId,
            ipfs: ipfs,
            title: title,
            contents: contents,
            contractAddress: contractAddress,
            tokenId: tokenId,
        });

        try {
            await newPost.save();
            res.status(201).send({data: newPost, message: "success"});
        } catch (err) {
            res.status(500).send(err);
        };
    }
};