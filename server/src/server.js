import express from 'express';
import { createServer } from "http";
import cors from 'cors';
import bodyParser from "body-parser";
import { syncDatabase } from "./loader/mysql.js";
import { appConfig } from './constant/config.js';
import routerUsers from "./routers/user.router.js";
import routerTracks from "./routers/track.router.js";
import routerArtists from "./routers/artist.router.js";
import routerAlbums from "./routers/album.router.js";
import routerFavorites from "./routers/favorites.router.js";

async function startServer() {
  const app = express();
  await Promise.all([syncDatabase()]);
  const httpServer = createServer(app);
  app.use(cors({
    origin: `http://${appConfig.host}:${appConfig.port}`,
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH'],
  }));
  await app.use(bodyParser.json());
  await app.use(bodyParser.urlencoded({ extended: true }));
  await app.use("/user", routerUsers);
  await app.use("/track", routerTracks);
  await app.use("/artist", routerArtists);
  await app.use("/album", routerAlbums);
  await app.use("/favs", routerFavorites);

  await httpServer.listen(appConfig.port);
  console.log(`🚀 Server ready at http://${appConfig.host}:${appConfig.port}`);
}

startServer().catch((error) => {
  console.error('Unable start server: ', error);
});