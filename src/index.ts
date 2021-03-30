import "reflect-metadata";
import { createConnection } from "typeorm";
import { User } from "./entity/User";
import { Monster } from "./entity/Monster";
import * as express from "express";
import * as cors from "cors";
import axios from "axios";

const app = express();
app.use(express.json());
app.use(cors());


createConnection()
.then(async (connection) => {
    axios.defaults.headers.common["Authorization"] = process.env.API_KEY;
    const userRepo = connection.getRepository(User);
    // const monsterRepo = connection.getRepository(Monster);

    app.post("/login", async (req, res) => {
      //we fetch the user data from the mymizu api
      //if no username is in our database we create one
      //we return the userinfo
    });

    app.get("/user/:username", async (req, res) => {
      const apiFetch = await axios.get(
        "https://my-mizu-dev2-gen8n.ondigitalocean.app/dev-api/users/byUsername?username=" +
          req.params.username
      );
      console.log('api fetch data ', apiFetch.data)
      const user = await userRepo.findOne(
        { username: req.params.username },
        { relations: ["monster"] }
      );
      console.log('database data ', user)
      let apiUserPlus = Object.assign({}, user);
      apiUserPlus = Object.assign(apiUserPlus, apiFetch.data)
      console.log('merged object', apiUserPlus)
      res.send(apiUserPlus);
    });

    // api/user/:username/newMonster


    // console.log("Inserting a new user into the database...");
    // const user = new User();
    // const monster = new Monster();
    // user.username = "Bryson";
    // user.level = 1;
    // user.attackPower = 25;
    // monster.currentHP = 25;
    // monster.maxHP = 25;
    // monster.startDate = new Date();
    // user.monster = monster;

    // await connection.manager.save(user);
    // console.log("Saved a new user with id: " + user.id);

    // console.log("Loading users from the database...");
    // const users = await connection.manager.find(User, {
    //   relations: ["monster"],
    // });
    // console.log("Loaded users: ", users);

    // console.log("Here you can setup and run express/koa/any other framework.");
  })
  .catch((error) => console.log(error));

app.listen(process.env.PORT, () => {
  console.log("app is listening on port " + process.env.PORT);
});
