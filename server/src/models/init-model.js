import DataTypes from 'sequelize';
import _user from './user.model.js';
import _artist from './artist.model.js';
import _track from './track.model.js';
import _album from './album.model.js';
import _favorites from './favorites.model.js';

export const initModels = (sequelize) => {
  const user = _user(sequelize, DataTypes);
  const artist = _artist(sequelize, DataTypes);
  const track = _track(sequelize, DataTypes);
  const album = _album(sequelize, DataTypes);
  const favorites = _favorites(sequelize, DataTypes);
  return { user, artist, track, album,favorites };
};
