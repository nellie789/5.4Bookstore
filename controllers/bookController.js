const {Book, Author, AuthorBooks} = require('../models');

//view all
module.exports.viewAll = async function(req, res){
    const books = await Book.findAll();
    res.render('book/view_all',{books});
};

//profile
module.exports.viewProfile = async function(req, res){
    const book = await Book.findByPk(req.params.id, {
        include: 'authors'
    });
    const authors = await Author.findAll();
    let availableAuthors = [];
    for (let i=0; i<authors.length; i++){
        if (!bookHasAuthor(book, authors[i])){
            availableAuthors.push(authors[i]);
        }
    }
    res.render('book/profile', {book, availableAuthors});
};

//render add form
module.exports.renderAddForm = function(req, res){
    const book = {
        title: '',
        author_one: '',
        author_two: '',
        publisher: '',
        genre: '',
        number_pages: '',
        cover_image: '',
        description: ''
    };
    res.render('book/add', {book});
};

//add
module.exports.addBook = async function(req, res){
    const book = await Book.create({
        title: req.body.title,
        publisher: req.body.publisher,
        author_one: req.body.author_one,
        author_two: req.body.author_two,
        genre: req.body.genre,
        number_pages: req.body.number_pages,
        cover_image: req.body.cover_image,
        description: req.body.description
    });
    res.redirect(`/books/profile/${book.id}`);
};

//render edit form
module.exports.renderEditForm = async function(req, res){
    const book = await Book.findByPk(req.params.id);
    res.render('book/edit', {book});
};

//update
module.exports.updateBook = async function(req, res){
    const book = await Book.update({
        title: req.body.title,
        author_one: req.body.author_one,
        author_two: req.body.author_two,
        publisher: req.body.publisher,
        genre: req.body.genre,
        number_pages: req.body.number_pages,
        cover_image: req.body.cover_image,
        description: req.body.description
        }, {
        where: {
                id: req.params.id
        }
        });
    res.redirect(`/books/profile/${req.params.id}`);
};

//delete
module.exports.deleteBook = async function(req, res){
    await Book.destroy({
        where: {
            id: req.params.id
        }
        });
    res.redirect('/books');
};

//add author to a book
module.exports.enrollAuthor = async function(req,res){
    await AuthorBooks.create({
        author_id: req.body.author,
        book_id: req.params.bookId
    });
    res.redirect(`/authors/profile/${req.params.bookId}`);
};

//delete an author from a book
module.exports.removeAuthor = async function(req,res){
    await AuthorBooks.destroy({
        where: {
            book_id: req.params.bookId,
            author_id: req.params.authorId
        }
    });
    res.redirect(`/authors/profile/${req.params.bookId}`);
};

function bookHasAuthor(book, author){
    for (let i=0; i<book.authors.length; i++){
        if (author.id === book.authors[i].id){
            return true
        }
    }
    return false
}