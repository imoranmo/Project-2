const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

class userRhythms extends Model {

}

userRhythms.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    rhythm_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'rhythms',
          key: 'id'
        }
      },
      user_id: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id'
        }
  }
},
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'userRhythms',
  }
);

module.exports = userRhythms;
