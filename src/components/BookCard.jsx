// src/components/BookCard.js
import React from "react";
import { Card } from "react-bootstrap";

function BookCard({ book }) {
  const coverId = book.cover_i;
  const coverImg = coverId
    ? `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`
    : "https://via.placeholder.com/150x200?text=No+Cover";

  return (
    <Card className="h-100 shadow-sm book-card">
      <Card.Img variant="top" src={coverImg} alt={book.title} />
      <Card.Body>
        <Card.Title className="text-truncate">{book.title}</Card.Title>
        <Card.Text>
          <strong>Author:</strong>{" "}
          {book.author_name ? book.author_name.join(", ") : "Unknown"}
          <br />
          <strong>Year:</strong> {book.first_publish_year || "N/A"}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default BookCard;
