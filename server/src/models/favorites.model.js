export default (sequelize, DataTypes) => {
    const Favorites = sequelize.define(
        'favorites',
        {
            artists: {
                type: DataTypes.STRING,
                allowNull: false,
                get() {
                    return this.getDataValue('artists').split(',')
                },
                set(val) {
                    this.setDataValue('artists',val.join(','));
                },
            },
            albums: {
                type: DataTypes.STRING,
                allowNull: false,
                get() {
                    return this.getDataValue('albums').split(',')
                },
                set(val) {
                    this.setDataValue('albums',val.join(','));
                },
            },
            tracks: {
                type: DataTypes.STRING,
                allowNull: false,
                get() {
                    return this.getDataValue('tracks').split(',')
                },
                set(val) {
                    this.setDataValue('tracks',val.join(','));
                },
            },
        },
        {
            tableName: 'favorites',
            timestamps: false,
        }
    );
    return Favorites;
};