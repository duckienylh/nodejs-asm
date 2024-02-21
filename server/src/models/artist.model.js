import {v4 as uuidv4} from "uuid";

export default (sequelize, DataTypes) => {
    const Artist = sequelize.define(
        'artist',
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
            grammy: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
            },
        },
        {
            tableName: 'artist',
            timestamps: false,
        }
    );

    Artist.beforeCreate((artist, _) => {
        artist.id = uuidv4();
    });

    return Artist;
};