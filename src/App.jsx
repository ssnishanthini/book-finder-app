// src/App.js
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Button, Form, Spinner, Pagination } from "react-bootstrap";
import BookCard from "./components/BookCard";
import CustomNavbar from "./components/Navbar";
import "./App.css";

function App() {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [numFound, setNumFound] = useState(0);

  const booksPerPage = 20; // OpenLibrary returns many, we’ll limit to 20 per page

  // fetch books whenever query or page changes
  useEffect(() => {
    if (query.trim() !== "") {
      fetchBooks();
    }
    // eslint-disable-next-line
  }, [page]);

  const fetchBooks = async () => {
    setLoading(true);
    setError("");
    setBooks([]);

    try {
      const res = await fetch(
        `https://openlibrary.org/search.json?title=${query}&page=${page}`
      );
      const data = await res.json();

      if (data.docs.length === 0) {
        setError("No books found. Try another title!");
      } else {
        setBooks(data.docs.slice(0, booksPerPage));
        setNumFound(data.numFound || 0);
      }
    } catch (err) {
      setError("Something went wrong. Please try again later.");
    }

    setLoading(false);
  };

  const searchBooks = async (e) => {
    e.preventDefault();
    if (!query) return;
    setPage(1);
    await fetchBooks();
  };

  const totalPages = Math.ceil(numFound / booksPerPage);

  // For pagination buttons (showing only 5 pages max)
  const renderPagination = () => {
    if (totalPages <= 1) return null;

    const items = [];
    const maxVisible = 5;
    let start = Math.max(1, page - Math.floor(maxVisible / 2));
    let end = Math.min(totalPages, start + maxVisible - 1);

    if (end - start < maxVisible - 1) {
      start = Math.max(1, end - maxVisible + 1);
    }

    items.push(
      <Pagination.Prev
        key="prev"
        disabled={page === 1}
        onClick={() => setPage(page - 1)}
      />
    );

    for (let i = start; i <= end; i++) {
      items.push(
        <Pagination.Item
          key={i}
          active={i === page}
          onClick={() => setPage(i)}
        >
          {i}
        </Pagination.Item>
      );
    }

    items.push(
      <Pagination.Next
        key="next"
        disabled={page === totalPages}
        onClick={() => setPage(page + 1)}
      />
    );

    return <Pagination className="justify-content-center mt-4">{items}</Pagination>;
  };

  return (
    <>
      <CustomNavbar />

      <Container className="mt-5 pt-4">
        {/* Search Form */}
        <Form onSubmit={searchBooks} className="mb-4">
          <Row className="justify-content-center g-2">
            <Col xs={9} sm={10} md={6}>
              <Form.Control
                type="text"
                placeholder="Search for a book title..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </Col>
            <Col xs={3} sm={2}>
              <Button type="submit" className="w-100">
                Search
              </Button>
            </Col>
          </Row>
        </Form>

        {/* Loading Spinner */}
        {loading && (
          <div className="text-center my-4">
            <Spinner animation="border" role="status" />
          </div>
        )}

        {/* Error Message */}
        {error && <p className="text-danger text-center">{error}</p>}

        {/* Books Display */}
        <Row className="justify-content-center">
          {books.map((book, index) => (
            <Col key={index} xs={8} sm={6} md={4} lg={3} className="mb-4">
              <BookCard book={book} />
            </Col>
          ))}
        </Row>

        {/* Pagination */}
        {!loading && books.length > 0 && renderPagination()}
      </Container>
    </>
  );
}

export default App;
