import {models, sequelize} from '../loader/mysql.js';
import * as dotenv from "dotenv";
import {validate} from "uuid";

dotenv.config();

const AlbumsService = {

    Albums : async (req,res)=>{
        await models.album.findAll().then((response) => {
            res.status(200);
            res.send({data: response});
        });
    },

    Listen : async (req,res)=>{
        try {
            const uuid = req.params.id;

            if (!validate(uuid)) {
                res.status(400);
                throw new Error("Invalid value!");
            }

            const album = await models.album.findByPk(uuid);

            if(album){
                res.status(200);
                res.send({ data: album });
            }else{
                res.status(404);
                throw new Error("Album doesn't exist!");
            }
        }catch (error) {
            res.json({ error: error.message });
        }
    },

    CreateAlbum : async (req, res) => {
        try {
            const name = req.body.name;
            const year = req.body.year;
            const artistId = req.body.artistId;

            if(!name || !year){
                res.status(400);
                res.send("name and year are required fields");
            }

            const newAlbum = await models.album.create({
                name: name,
                year: year,
                artistId: artistId ?? undefined,
            });
            res.status(201);
            res.send({data: newAlbum});
        } catch (error) {
            res.json({ error: error.message });
        }
    },

    UpdateAlbum : async (req,res)=>{
        try{
            const id = req.params.id;
            const name = req.body.name;
            const year = req.body.year;
            const artistId = req.body.artistId;

            if (!validate(id)) {
                res.status(400);
                throw new Error("Invalid value!");
            }

            const album = await models.album.findByPk(id);
            if(album){
                if(name){
                    album.name = name;
                }
                if(year){
                    album.year = year;
                }
                if(artistId){
                    await models.artist.findByPk(artistId, {rejectOnEmpty: new Error("Artist doesn't exist")});
                    album.artistId = artistId;
                }

                await album.save();
            }else{
                res.status(404);
                throw new Error("album doesn't exist!");
            }

            res.send("Updated album");
        }catch(error){
            res.json({ error: error.message });
        }

    },
    DeleteAlbum : async (req,res)=>{
        try{
            const id = req.params.id;

            if (!validate(id)) {
                res.status(400);
                throw new Error("Invalid value!");
            }

            await sequelize.transaction(async (t) => {
                try{
                    const setAlbumIsNullPromise = [];

                    //set albumId is null in table track
                    const trackAlbumId = await models.track.findAll({
                        where:{
                            albumId: id
                        }
                    })

                    for (let i = 0; i < trackAlbumId.length; i+=1) {
                        trackAlbumId[i].albumId = null;
                        setAlbumIsNullPromise.push(trackAlbumId[i].save({transaction: t}));
                    }

                    if(setAlbumIsNullPromise.length > 0)
                        await Promise.all(setAlbumIsNullPromise)


                    const deleteAlbum = await models.album.destroy({
                        where: {
                            id : id,
                        },
                        transaction: t,
                    })

                    if(deleteAlbum)
                        res.status(204).json("Deleted")
                    else
                        res.status(404).json("album doesn't exist")
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
export default AlbumsService;
