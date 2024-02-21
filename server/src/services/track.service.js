import {models} from '../loader/mysql.js';
import * as dotenv from "dotenv";
import {validate} from "uuid";

dotenv.config();

const tracksService = {

    tracks : async (req,res)=>{
        await models.track.findAll().then((response) => res.send({ data: response }));
    },

    listen : async (req,res)=>{
        try {
            const uuid = req.params.id;

            if (!validate(uuid)) {
                res.status(400);
                throw new Error("Invalid value!");
            }

            const track = await models.track.findByPk(uuid);

            if(track){
                res.status(200);
                res.send({ data: track });
            }else{
                res.status(404);
                throw new Error("Track doesn't exist!");
            }
        }catch (error) {
            res.json({ error: error.message });
        }
    },

    CreateTrack : async (req, res) => {
        try {
            const name = req.body.name;
            const artistId = req.body.artistId;
            const albumId = req.body.albumId;
            const duration = req.body.duration;

            if(!name || !duration){
                res.status(400);
                res.send("name and duration are require fields");
            }

            // check artistId and albumId
            if(artistId){
                await models.artist.findByPk(artistId, {rejectOnEmpty: new Error("artist doesn't exist")})
            }
            if(albumId){
                await models.album.findByPk(artistId, {rejectOnEmpty: new Error("album doesn't exist")})
            }

            const newTrack = await models.track.create({
                name: name,
                artistId: artistId ?? undefined,
                albumId: albumId ?? undefined,
                duration: duration
            });
            res.status(201);
            res.send({data: newTrack});
        } catch (error) {
            res.json({ error: error.message });
        }
    },

    UpdateTrack : async (req,res)=>{
        try{
            const id = req.params.id;
            const name = req.body.name;
            const artistId = req.body.artistId;
            const albumId = req.body.albumId;
            const duration = req.body.duration;

            if (!validate(id)) {
                res.status(400);
                throw new Error("Invalid value!");
            }

            const track = await models.track.findByPk(id);
            if(track){
                if(name)
                    track.name = name
               if(artistId){
                   await models.artist.findByPk(artistId, {rejectOnEmpty: new Error("artist doesn't exist")})
                   track.artistId = artistId;
               }
               if(albumId){
                   await models.album.findByPk(artistId, {rejectOnEmpty: new Error("album doesn't exist")})
                   track.albumId = albumId;
               }
               if(duration){
                   track.duration = duration
               }

               await track.save()
            }else{
                res.status(404);
                throw new Error("track doesn't exist!");
            }
            res.send("Updated track");
        }catch(error){
            res.json({ error: error.message });
        }
    },
    deleteTrack : async (req,res)=>{
        try{
            const id = req.params.id;

            if (!validate(id)) {
                res.status(400);
                throw new Error("Invalid value!");
            }

            const deleteTrack = await models.track.destroy({
                where: {
                    id : id,
                }
            })

            if(deleteTrack){
                res.status(204);
                res.send("Deleted");
            }
            else
                res.status(404).json("track doesn't exist")

        }catch(error){
            res.json({ error: error.message });
        }
    },
}
export default tracksService;
