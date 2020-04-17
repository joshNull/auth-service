'use strict';
module.exports = (sequelize, DataTypes) => {
  const role = sequelize.define('role', {
    name: DataTypes.STRING
  },
    {
      createdAt: 'date_created',
      updatedAt: 'date_updated'
    }
  );
  role.associate = function (models) {
    // associations can be defined here
  };
  return role;
};


