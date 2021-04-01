import "reflect-metadata";
import { createConnection } from "typeorm";
import { User } from "./entity/User";
import { Monster } from "./entity/Monster";
import * as express from "express";
import * as cors from "cors";
import axios from "axios";
import { connect } from "net";

const app = express();
app.use(express.json());
app.use(cors());

createConnection()
  .then(async (connection) => {
    axios.defaults.headers.common["Authorization"] = process.env.API_KEY;
    const userRepo = connection.getRepository(User);

    app.post("/login", async (req, res) => {
      let apiFetch;
      try {
          apiFetch = await axios.get(
              "https://my-mizu-dev2-gen8n.ondigitalocean.app/dev-api/users/byUsername?username=" +
                req.body.username
            );
      } catch (err){
        return res.send({msg:"that user doesn't exist on the mymizu api"})
      }
      const dbQuery = await userRepo.findOne({
        username: apiFetch.data.username,
      });
      if (dbQuery === undefined) {
        const user = new User();
        const monster = new Monster();
        monster.currentHP = 25;
        monster.maxHP = 25;
        monster.startDate = new Date();
        user.username = req.body.username;
        user.level = 1;
        user.attackPower = 5;
        user.monster = monster;
        connection.manager.save(user);
        res.send({ msg: "new user created on our database" });
      } else res.send({ msg: "user exists on our database" });
    });

    app.get("/user/:username", async (req, res) => {
      const apiFetch = await axios.get(
        "https://my-mizu-dev2-gen8n.ondigitalocean.app/dev-api/users/byUsername?username=" +
          req.params.username
      );
      console.log(apiFetch.data);
      const user = await userRepo.findOne(
        { username: req.params.username },
        { relations: ["monster"] }
      );
      let apiUserPlus = Object.assign({}, user);
      apiUserPlus = Object.assign(apiUserPlus, apiFetch.data);
      res.send(apiUserPlus);
    });

    app.patch('/user/:username/attack', async (req,res)=>{
        const user = await userRepo.findOne({username: req.params.username}, {relations: ["monster"]});
        let monster = user.monster;
        const oldMonsterMaxHP = monster.maxHP;
        monster.currentHP -= user.attackPower * req.body.size;
        await connection.manager.save(user);
        if (monster.currentHP <= 0){
            user.level += 1;
            user.attackPower *= user.level;
            monster.maxHP = user.level * 25 + oldMonsterMaxHP;
            monster.currentHP = monster.maxHP;
            monster.startDate = new Date();
            await connection.manager.save(user);
            return res.send({msg:"monster is defeated", monsterHP: monster.currentHP});
        }
        res.send({msg:'monsters HP decreased by ' + user.attackPower * req.body.size, monsterHP: monster.currentHP});
    })
    
  })
  .catch((error) => console.log(error));

app.listen(process.env.PORT, () => {
  console.log("app is listening on port " + process.env.PORT);
});
