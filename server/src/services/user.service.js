import bcrypt from "bcrypt";
import {models} from '../loader/mysql.js';
import * as dotenv from "dotenv";
import {validate} from "uuid";

dotenv.config();

const usersService = {

    Users : async (req,res)=>{
        const users = await models.user.findAll();
        const respone = users.map((user)=> {
            return {
                id: user.id,
                login: user.login,
                version: user.version,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
            }
        })

        res.status(200);
        res.send({data:respone});
    },

    listen : async (req,res)=>{
        try {
            const uuid = req.params.id;

            if (!validate(uuid)) {
                res.status(400);
                throw new Error("Invalid value!");
            }

            const userExist = await models.user.findByPk(uuid);

            if(userExist){
                res.status(200);
                res.send({
                    data: {
                        id: userExist.id,
                        login: userExist.login,
                        version: userExist.version,
                        createdAt: userExist.createdAt,
                        updatedAt: userExist.updatedAt,
                    }
                });
            }else{
                res.status(404);
                throw new Error("User doesn't exist!");
            }
        }catch (error) {
            res.json({ error: error.message });
        }
    },

    CreateUserDto : async (req, res) => {
        try {
            let login = req.body.login;
            let password = req.body.password;
            const userExist = await models.user.findOne({
                where: { login: login },
            });
            if (userExist || !password) {
                res.status(400);
                throw new Error("User already exists or request `body` does not contain required fields");
            }
            const salt = await bcrypt.genSalt(10);
            let hashPassword = await bcrypt.hash(password, salt);

            const newUser = await models.user.create({
                login: login,
                password: hashPassword,
                version: 1,
            });
            res.status(201);
            res.send({data: newUser});
        } catch (error) {
            res.json({ error: error.message });
        }
    },

    UpdatePasswordDto : async (req,res)=>{
        try{
            const id = req.params.id;
            const oldPassword = req.body.oldPassword;
            const newPassword = req.body.newPassword;

            if (!validate(id)) {
                res.status(400);
                throw new Error("Invalid value!");
            }

            const user = await models.user.findByPk(id);

            if(user){
                const validPassword = await bcrypt.compare(
                    oldPassword,
                    user.password
                );

                if(validPassword){
                    const salt = await bcrypt.genSalt(10);
                    user.version += 1;
                    user.password = await bcrypt.hash(newPassword, salt);
                    await user.save()
                    res.status(200).json("pass changed successfully");
                }else{
                    res.status(200).json("oldPassword is wrong");
                }
            }else{
                res.status(404);
                throw new Error("User doesn't exist!");
            }
        }catch(error){
            res.json({ error: error.message });
        }

    },
    deleteUser : async (req,res)=>{
        try{
            const id = req.params.id;

            if (!validate(id)) {
                res.status(400);
                throw new Error("Invalid value!");
            }

            const deleteUser = await models.user.destroy({
                where: {
                    id : id,
                }
            });

            if(deleteUser){
                res.status(204);
                res.send("Deleted");
            }
            else
                res.status(404).json("User doesn't exist");

        }catch(error){
            res.json({ error: error.message });
        }
    },
}
export default usersService;
