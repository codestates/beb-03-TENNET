require("dotenv").config();
const { faker } = require('@faker-js/faker');
const { MongoClient, ServerApiVersion } = require('mongodb');

const { MONGO_ACC_URI } = process.env;

async function seedDB() {

    const client = new MongoClient(MONGO_ACC_URI, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

    try {
        await client.connect();
        console.log("DB connected!!");

        const usersCollection = client.db("tennet").collection("users");

        // 삭제
        await usersCollection.drop()
            .then(() => console.log("users dropped!!"))

        // 더미 리스트 만들기
        let usersData = [];
        for (let i = 0; i < 10; i++) {
            const nickName = faker.name.firstName();
            const address = "0x000000000000000000000000000000000000000" + `${i}`;
            const image = faker.image.avatar();
            // const privateKey = "0x000000000000000000000000000000000000000000000000000000000000000" + `${i}`;
            
            const user = {
                nickName: nickName,
                address: address,
                image: image,
                // privateKey: privateKey,
                createdAt: new Date(),
                updatedAt: new Date()
            }
            usersData.push(user);
        }

        // 삽입
        await usersCollection.insertMany(usersData)
            .then(() => console.log("Seeded Users!!"))

        client.close();
    } catch (err) {
        console.log(err.stack);
    }
}

seedDB();