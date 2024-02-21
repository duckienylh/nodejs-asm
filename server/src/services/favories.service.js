import {models} from '../loader/mysql.js';
import * as dotenv from "dotenv";
import {validate} from "uuid";

dotenv.config();

const FavoritesService = {

    Favorites : async (req,res)=>{
        const favs = await models.favorites.findAll();

        if(favs.length > 0){
            res.status(200);
            res.send({data: {
                    artists: favs[0].artists,
                    albums: favs[0].albums,
                    tracks: favs[0].tracks,
                }});
        }else{
            res.status(200);
            res.send({data: []});
        }
    },

    // track
    AddTrackId : async (req, res) => {
        try {
            const id = req.params.id;

            if (!validate(id)) {
                res.status(400);
                throw new Error("Invalid value!");
            }

            const track = await models.track.findByPk(id);

            const favoriteTrack = await models.favorites.findAll();

            if(favoriteTrack.length > 0){
                if(track){
                    if([...favoriteTrack[0].tracks].includes(id)){
                        res.status(404);
                        throw new Error("Track does exist in favorites")
                    }

                    const arrRemoveNull = [...favoriteTrack[0].tracks];
                    const index = arrRemoveNull.indexOf("");
                    if (index !== -1) {
                        arrRemoveNull.splice(index, 1);
                    }

                    res.status(201);
                    favoriteTrack[0].tracks = [...arrRemoveNull,...[id]];
                    await favoriteTrack[0].save()
                    res.send({data: {
                            artists: favoriteTrack[0].artists,
                            albums: favoriteTrack[0].albums,
                            tracks: favoriteTrack[0].tracks,
                        }});
                }else{
                    res.status(422);
                    throw new Error("Track doesn't exist")
                }
            }else{
                res.status(201);
                const newFavorites = await models.favorites.create({
                    artists: [],
                    albums: [],
                    tracks: [id],
                });

                res.send({data: {
                        artists: newFavorites.artists,
                        albums: newFavorites.albums,
                        tracks: newFavorites.tracks,
                    }});
            }
        } catch (error) {
            res.json({ error: error.message });
        }
    },

    RemoveTrackId : async (req, res) => {
        try {
            const id = req.params.id;

            if (!validate(id)) {
                res.status(400);
                throw new Error("Invalid value!");
            }

            const favoriteTrack = await models.favorites.findAll();

            if(favoriteTrack.length > 0) {
                if ([...favoriteTrack[0].tracks].includes(id)) {
                    res.status(201);
                    const removeTrackId = [...favoriteTrack[0].tracks]
                    const index = removeTrackId.indexOf(id);
                    if (index > -1) {
                        removeTrackId.splice(index, 1);
                    }

                    favoriteTrack[0].tracks = removeTrackId;
                    await favoriteTrack[0].save()
                    res.send("Deleted trackId");
                } else {
                    res.status(404);
                    throw new Error("Track does exist in favorites")
                }

            }
        } catch (error) {
            res.json({ error: error.message });
        }
    },

    // album
    AddAlbumId : async (req, res) => {
        try {
            const id = req.params.id;

            if (!validate(id)) {
                res.status(400);
                throw new Error("Invalid value!");
            }

            const album = await models.album.findByPk(id);

            const favoriteAlbum = await models.favorites.findAll();

            if(favoriteAlbum.length > 0){
                if(album){
                    if([...favoriteAlbum[0].albums].includes(id)){
                        res.status(404);
                        throw new Error("Albums does exist in favorites")
                    }

                    const arrRemoveNull = [...favoriteAlbum[0].albums];
                    const index = arrRemoveNull.indexOf("");
                    if (index !== -1) {
                        arrRemoveNull.splice(index, 1);
                    }

                    res.status(201);
                    favoriteAlbum[0].albums = [...arrRemoveNull,...[id]];
                    await favoriteAlbum[0].save()
                    res.send({data: {
                            artists: favoriteAlbum[0].artists,
                            albums: favoriteAlbum[0].albums,
                            tracks: favoriteAlbum[0].tracks,
                        }});
                }else{
                    res.status(422);
                    throw new Error("Track doesn't exist")
                }
            }else{
                res.status(201);
                const newFavorites = await models.favorites.create({
                    artists: [],
                    albums: [id],
                    tracks: [],
                });

                res.send({data: {
                        artists: newFavorites.artists,
                        albums: newFavorites.albums,
                        tracks: newFavorites.tracks,
                    }});
            }
        } catch (error) {
            res.json({ error: error.message });
        }
    },

    RemoveAlbumId : async (req, res) => {
        try {
            const id = req.params.id;

            if (!validate(id)) {
                res.status(400);
                throw new Error("Invalid value!");
            }

            const favoriteAlbum = await models.favorites.findAll();

            if(favoriteAlbum.length > 0) {
                if ([...favoriteAlbum[0].albums].includes(id)) {
                    res.status(201);
                    const removeAlbumId = [...favoriteAlbum[0].albums]
                    const index = removeAlbumId.indexOf(id);
                    if (index > -1) {
                        removeAlbumId.splice(index, 1);
                    }

                    favoriteAlbum[0].albums = removeAlbumId;
                    await favoriteAlbum[0].save()
                    res.send("Deleted albumId");
                } else {
                    res.status(404);
                    throw new Error("Albums does exist in favorites")
                }

            }
        } catch (error) {
            res.json({ error: error.message });
        }
    },

    // artist
    AddArtistId : async (req, res) => {
        try {
            const id = req.params.id;

            if (!validate(id)) {
                res.status(400);
                throw new Error("Invalid value!");
            }

            const artist = await models.artist.findByPk(id);

            const favoriteArtist = await models.favorites.findAll();

            if(favoriteArtist.length > 0){
                if(artist){
                    if([...favoriteArtist[0].artists].includes(id)){
                        res.status(404);
                        throw new Error("Artists does exist in favorites")
                    }

                    const arrRemoveNull = [...favoriteArtist[0].artists];
                    const index = arrRemoveNull.indexOf("");
                    if (index !== -1) {
                        arrRemoveNull.splice(index, 1);
                    }

                    res.status(201);
                    favoriteArtist[0].artists = [...arrRemoveNull,...[id]];
                    await favoriteArtist[0].save()
                    res.send({data: {
                            artists: favoriteArtist[0].artists,
                            albums: favoriteArtist[0].albums,
                            tracks: favoriteArtist[0].tracks,
                        }});
                }else{
                    res.status(422);
                    throw new Error("Artist doesn't exist")
                }
            }else{
                res.status(201);
                const newFavorites = await models.favorites.create({
                    artists: [id],
                    albums: [],
                    tracks: [],
                });

                res.send({data: {
                        artists: newFavorites.artists,
                        albums: newFavorites.albums,
                        tracks: newFavorites.tracks,
                    }});
            }
        } catch (error) {
            res.json({ error: error.message });
        }
    },

    RemoveArtistId : async (req, res) => {
        try {
            const id = req.params.id;

            if (!validate(id)) {
                res.status(400);
                throw new Error("Invalid value!");
            }

            const favoriteArtist = await models.favorites.findAll();

            if(favoriteArtist.length > 0) {
                if ([...favoriteArtist[0].artists].includes(id)) {
                    res.status(201);
                    const removeArtistId = [...favoriteArtist[0].artists]
                    const index = removeArtistId.indexOf(id);
                    if (index > -1) {
                        removeArtistId.splice(index, 1);
                    }

                    favoriteArtist[0].artists = removeArtistId;
                    await favoriteArtist[0].save()
                    res.send("Deleted artistId");
                } else {
                    res.status(404);
                    throw new Error("Artist does exist in favorites")
                }
            }
        } catch (error) {
            res.json({ error: error.message });
        }
    },
}
export default FavoritesService;
