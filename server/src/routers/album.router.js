import { Router } from 'express';
import AlbumsService from "../services/album.service.js";


const routerAlbums = Router();

routerAlbums.get("/",AlbumsService.Albums);

routerAlbums.get("/:id",AlbumsService.Listen);

routerAlbums.post("/", AlbumsService.CreateAlbum);

routerAlbums.put("/:id", AlbumsService.UpdateAlbum);

routerAlbums.delete("/:id", AlbumsService.DeleteAlbum);

export default routerAlbums;