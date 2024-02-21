import {models, sequelize} from '../loader/mysql.js';
import * as dotenv from "dotenv";
import {validate} from "uuid";

dotenv.config();

const ArtistsService = {

    Artists : async (req,res)=>{
        await models.artist.findAll().then((response) => res.send({ data: response }));
    },

    Listen : async (req,res)=>{
        try {
            const uuid = req.params.id;

            if (!validate(uuid)) {
                res.status(400);
                throw new Error("Invalid value!");
            }

            const artist = await models.artist.findByPk(uuid);

            if(artist){
                res.status(200);
                res.send({ data: artist });
            }else{
                res.status(404);
                throw new Error("Artist doesn't exist!");
            }
        }catch (error) {
            res.json({ error: error.message });
        }
    },

    CreateArtist : async (req, res) => {
        try {
            const name = req.body.name;
            const grammy = req.body.grammy;

            if(!name || !grammy){
                res.status(400);
                res.send("name and grammy are required fields");
            }

            const newArtist = await models.artist.create({
                name: name,
                grammy: grammy
            });
            res.status(201);
            res.send({data: newArtist});
        } catch (error) {
            res.json({ error: error.message });
        }
    },

    UpdateArtist : async (req,res)=>{
        try{
            const id = req.params.id;
            const name = req.body.name;
            const grammy = req.body.grammy;

            if (!validate(id)) {
                res.status(400);
                throw new Error("Invalid value!");
            }

            const artist = await models.artist.findByPk(id);
            if(artist){
                if(name){
                    artist.name = name
                }
                if(grammy){
                    artist.grammy = grammy
                }

                await artist.save()
            }else{
                res.status(404);
                throw new Error("artist doesn't exist!");
            }
            res.send("Updated artist");
        }catch(error){
            res.json({ error: error.message });
        }

    },
    DeleteArtist : async (req,res)=>{
        try{
            const id = req.params.id;

            if (!validate(id)) {
                res.status(400);
                throw new Error("Invalid value!");
            }

            await sequelize.transaction(async (t) => {
                try{
                    const setArtistIdIsNullPromise = [];

                    const albumList = await models.album.findAll({
                        where:{
                            artistId: id,
                        }
                    })

                    const trackList = await models.track.findAll({
                        where:{
                            artistId: id,
                        }
                    })

                    for (let i = 0; i < albumList.length; i++) {
                        albumList[i].artistId = null;
                        setArtistIdIsNullPromise.push(albumList[i].save({transaction: t}))
                    }

                    for (let i = 0; i < trackList.length; i++) {
                        trackList[i].artistId = null;
                        setArtistIdIsNullPromise.push(trackList[i].save({transaction: t}))
                    }

                    if(setArtistIdIsNullPromise.length > 0)
                        await Promise.all(setArtistIdIsNullPromise)

                    const deleteArtist = await models.artist.destroy({
                        where: {
                            id : id,
                        },
                        transaction: t,
                    })

                    if(deleteArtist)
                        res.status(204).json("Deleted");
                    else
                        res.status(404).json("artist doesn't exist");
                }catch (error) {
                    await t.rollback();
                    throw new Error(`Abnormal error when operating in the database: ${error}`);
                }
            })

        }catch(error){
            res.json({ error: error.message });
        }
    },
}
export default ArtistsService;
