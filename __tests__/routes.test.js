const request = require("supertest");
const app = require("../app");
const db = require("../db");
const Book = require("../models/book");

process.env.NODE_ENV = "test" 

let test_book_isbn;

describe("Book Routes Test", function () {

    beforeEach(async function () {
      await db.query("DELETE FROM books"); // delete all books from the books 
  
      let book = await Book.create({
        isbn: "123456789", 
        amazon_url: "http://test", 
        author: "Test", 
        language: "english", 
        pages: 20 ,
        publisher: "TestHouse",
        title: "Test Title", 
        year: 2023,
      });

      test_book_isbn = book.isbn
    });
  

    describe("GET /book", function () {
        test("gets all books", async function () {
          let response = await request(app)
            .get("/books");
      
          expect(response.statusCode).toEqual(200);
          expect(response.body.books[0]).toHaveProperty("isbn")
         
  
          });
        });
      });


  
    describe("POST /book", function () {
      test("can create book", async function () {
        let response = await request(app)
          .post("/books")
          .send({
            isbn: "111111111", 
            amazon_url: "http://test", 
            author: "Test1", 
            language: "english", 
            pages: 20 ,
            publisher: "TestHouse1",
            title: "Test Title1", 
            year: 2023
          });
    
        expect(response.statusCode).toEqual(201);
        expect(response.body.book).toHaveProperty("isbn")
       

        });
      });
  

  
    describe("GET books/:isbn", function () {
      test("can get 1 book", async function () {
        let response = await request(app)
          .get(`/books/${test_book_isbn}`);
  
          expect(response.body.book.isbn).toBe(test_book_isbn)
        });
      });

      afterEach(async function () {
        await db.query("DELETE FROM BOOKS");
      });
  
  
  afterAll(async function () {
    await db.end();
  });
  