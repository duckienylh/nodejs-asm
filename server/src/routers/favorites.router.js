import { Router } from 'express';
import FavoritesService from "../services/favories.service.js";

const routerFavorites = Router();

routerFavorites.get("/", FavoritesService.Favorites);

routerFavorites.post("/track/:id", FavoritesService.AddTrackId);

routerFavorites.delete("/track/:id", FavoritesService.RemoveTrackId);

routerFavorites.post("/album/:id", FavoritesService.AddAlbumId);

routerFavorites.delete("/album/:id", FavoritesService.RemoveAlbumId);

routerFavorites.post("/artist/:id", FavoritesService.AddArtistId);

routerFavorites.delete("/artist/:id", FavoritesService.RemoveArtistId);
export default routerFavorites;