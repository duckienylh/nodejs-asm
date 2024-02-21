import { v4 as uuidv4 } from 'uuid';
export default (sequelize, DataTypes) => {
    const User = sequelize.define(
        'user',
        {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4,
                allowNull: false,
                isUUID: true,
            },
            login: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            version: {
                type: DataTypes.STRING,
                allowNull: true,
            },
        },
        {
            tableName: 'user',
            timestamps: true,
        }
    );

    // Hook to generate UUID for 'id' field before creating a new record
    User.beforeCreate((user, _) => {
        user.id = uuidv4();
    });

    return User;
};