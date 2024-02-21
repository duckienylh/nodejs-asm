import { Router } from 'express';
import trackService from '../services/track.service.js';

const routerTracks = Router();

routerTracks.get("/",trackService.tracks);

routerTracks.get("/:id",trackService.listen);

routerTracks.post("/", trackService.CreateTrack);

routerTracks.put("/:id", trackService.UpdateTrack);

routerTracks.delete("/:id", trackService.deleteTrack);

export default routerTracks;