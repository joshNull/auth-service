'use strict';
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  },
    {
      createdAt: 'date_created',
      updatedAt: 'date_updated'
    }
  );
  user.associate = function (models) {
    // associations can be defined here
  };
  return user;
};