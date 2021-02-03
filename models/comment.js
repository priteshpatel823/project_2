module.exports = function(sequelize, DataTypes) {
  var Comment = sequelize.define("comment", {
    comment: DataTypes.STRING,
    email: DataTypes.STRING,
    name: DataTypes.STRING,
    picture: DataTypes.STRING
  });
  return Comment;
};
