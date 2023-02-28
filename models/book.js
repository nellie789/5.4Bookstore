'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Book.init({
    title: DataTypes.STRING,
    author_one: DataTypes.STRING,
    author_two: DataTypes.STRING,
    publisher: DataTypes.STRING,
    genre: DataTypes.STRING,
    number_pages: DataTypes.INTEGER,
    cover_image: DataTypes.STRING,
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Book',
    timestamps:false,
    tableName: 'books'
  });
  return Book;
};