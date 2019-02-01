
module.exports = (sequelize, DataTypes) => {
  const books = sequelize.define('books', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    Author: DataTypes.STRING,
    Name: DataTypes.STRING,
    rating: DataTypes.DECIMAL,
  }, {});
  books.generate = bookObj => new Promise((resolve, reject) => {
    books.findAll({ where: { id: bookObj.id } }).then((entry) => {
      if (entry.length === 0) {
        books.create(bookObj).then(() => {
          resolve(`Inserted book with id: ${bookObj.id}`);
        }).catch((errorObj) => {
          resolve(errorObj.message);
        });
      } else {
        resolve(`Book with id: ${bookObj.id} already exists`);
      }
    }).catch((errorObj) => {
      resolve(errorObj.message);
    });
  });
  return books;
};
