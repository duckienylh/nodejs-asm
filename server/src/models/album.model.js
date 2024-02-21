import {v4 as uuidv4} from "uuid";

export default (sequelize, DataTypes) => {
  const Album = sequelize.define(
    'album',
    {
      id: {
          type: DataTypes.UUID,
          primaryKey: true,
          defaultValue: DataTypes.UUIDV4,
          allowNull: false,
          isUUID: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      year: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      artistId:{
        type: DataTypes.UUID,
        allowNull: true,
        references: {
          model: 'artist',
          key: 'id',
        },
      },
    },
    {
      tableName: 'album',
      timestamps: false,
    }
  );

    Album.beforeCreate((album, _) => {
        album.id = uuidv4();
    });

  return Album;
};