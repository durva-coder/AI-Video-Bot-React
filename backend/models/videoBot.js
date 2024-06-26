module.exports = (sequelize, DataTypes) => {
  const VideoBot = sequelize.define("videoBot", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    keywords: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  });

  return VideoBot;
};
