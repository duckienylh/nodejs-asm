import { Sequelize } from 'sequelize';
// import fs from "fs";
import {database} from '../constant/config.js';
import {initModels} from '../models/init-model.js';

// const user = JSON.parse(fs.readFileSync('dev_data/user.json'));

export const sequelize = new Sequelize( database.db_name,database.db_user, database.db_password,{ ...database.option});

export const models = initModels(sequelize);

export const syncDatabase = async () => {
  if (process.env.NODE_ENV === 'development' && process.env.SYNC_DATA === 'true') {
    const isForceSync = process.env.SYNC_DATA === 'true';
    await sequelize
      .sync({ force: isForceSync, alter: true })
      .then(async () => {
        console.log('Database sync is done!');
        // if (isForceSync) {
        //   await models.user.bulkCreate(user);
        // }
      })
      .catch((err) => {
        console.error(err);
      });
  }
};
