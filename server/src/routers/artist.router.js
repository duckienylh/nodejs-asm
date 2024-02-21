import { Router } from 'express';
import ArtistsService from '../services/artist.service.js';

const routerArtists = Router();

routerArtists.get("/",ArtistsService.Artists);

routerArtists.get("/:id",ArtistsService.Listen);

routerArtists.post("/", ArtistsService.CreateArtist);

routerArtists.put("/:id", ArtistsService.UpdateArtist);

routerArtists.delete("/:id", ArtistsService.DeleteArtist);

export default routerArtists;