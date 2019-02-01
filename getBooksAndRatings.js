const Axios = require('axios');
const Model = require('./models');

const main = () => {
  const authorBooks = {};
  const getBooksAndRatings = () => Axios.get('https://5gj1qvkc5h.execute-api.us-east-1.amazonaws.com/dev/allBooks').then((booksArray) => {
    booksArray.data.books.map((book, index) => Axios.get(`https://5gj1qvkc5h.execute-api.us-east-1.amazonaws.com/dev/findBookById/${book.id}`).then((ratingObj) => {
      book.rating = ratingObj.data.rating;
      if (authorBooks[book.Author] !== undefined) {
        authorBooks[book.Author].push(book);
      } else {
        authorBooks[book.Author] = [book];
      }
      Model.books.generate(book);
    }));
  });
  getBooksAndRatings();
};
main();
module.exports = { main };
