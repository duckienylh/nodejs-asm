import { v4 as uuidv4 } from 'uuid';
export default (sequelize, DataTypes) => {
    const Track = sequelize.define(
        'track',
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
            artistId: {
                type: DataTypes.UUID,
                allowNull: true,
                references: {
                    model: 'artist',
                    key: 'id',
                },
            },
            albumId:{
                type: DataTypes.UUID,
                allowNull: true,
                references: {
                    model: 'album',
                    key: 'id',
                },
            },
            duration:{
                type: DataTypes.INTEGER,
                allowNull: false,
            }
        },
        {
            tableName: 'track',
            timestamps: false,
        }
    );

    Track.beforeCreate((track, _) => {
        track.id = uuidv4();
    });
    return Track;
};