require("dotenv").config();
const { faker } = require('@faker-js/faker');
const { MongoClient, ServerApiVersion } = require('mongodb');
const { getRandomId } = require('./utils.js');

const { MONGO_ACC_URI } = process.env;

async function seedDB() {

    const client = new MongoClient(MONGO_ACC_URI, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

    try {
        await client.connect();
        console.log("DB connected!!");

        const commentsCollection = client.db("tennet").collection("comments");
        const postsCollection = client.db("tennet").collection("posts");
        const usersCollection = client.db("tennet").collection("users");

        // 삭제
        await commentsCollection.drop()
            .then(() => console.log("comments dropped!!"))

        // 더미 리스트 만들기
        let commentsData = [];
        for (let i = 0; i < 100; i++) {
            
            const user_id = await getRandomId(usersCollection); // 랜덤한 유저 _id 가져오기
            const post_id = await getRandomId(postsCollection); // 랜덤한 포스트 _id 가져오기
            const contents = faker.lorem.paragraph(nb_sentences=2);

            const comment = {
                post_id: post_id,
                user_id: user_id,
                contents: contents,
                createdAt: new Date(),
                updatedAt: new Date()
            }
            commentsData.push(comment);
        }

        // 삽입
        await commentsCollection.insertMany(commentsData)
            .then(() => console.log("Seeded Comments!!"))

        client.close();
    } catch (err) {
        console.log(err.stack);
    }
}

seedDB();