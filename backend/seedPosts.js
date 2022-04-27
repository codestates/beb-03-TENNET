require("dotenv").config();
const { faker } = require('@faker-js/faker');
const { MongoClient, ServerApiVersion } = require('mongodb');
const { randomIntFromInterval, getRandomId } = require('./utils.js');

const { MONGO_ACC_URI } = process.env;

async function seedDB() {

    const client = new MongoClient(MONGO_ACC_URI, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

    try {
        await client.connect();
        console.log("DB connected!!");

        const postsCollection = client.db("tennet").collection("posts");
        const usersCollection = client.db("tennet").collection("users");

        // 삭제
        await postsCollection.drop()
            .then(() => console.log("posts dropped!!"))

        // 더미 리스트 만들기
        let postsData = [];
        for (let i = 0; i < 50; i++) {
            
            const user_id = await getRandomId(usersCollection); // 랜덤한 유저 _id 가져오기
            const ipfs = "https://ipfs.io/ipfs/fakehash" + `${i}`;
            const title = faker.lorem.text(max_nb_chars=80);
            
            // 랜덤한 길이의 구절을 요소로 가지는 랜덤한 길이의 리스트 만들기
            let contents = [];
            for (let j = 0; j < randomIntFromInterval(10, 30); j++) {
                const lineBreakVar = randomIntFromInterval(0, 2);
                if (lineBreakVar === 0) {
                    contents.push("<br>");
                }
                else {
                    contents.push(faker.lorem.paragraph(nb_sentences=5));
                }
            }

            const post = {
                user_id: user_id,
                ipfs: ipfs,
                title: title,
                contents: contents,
                contractAddress: "0x0000000000000000000000000000000000TENNET",
                tokenId: `${i}`,
                editList: [],
                parentId: null,
                childrenIds: [],
                createdAt: new Date(),
                updatedAt: new Date()
            }
            postsData.push(post);
        }

        // 삽입
        await postsCollection.insertMany(postsData)
            .then(() => console.log("Seeded Posts!!"))

        client.close();
    } catch (err) {
        console.log(err.stack);
    }
}

seedDB();