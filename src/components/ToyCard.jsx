import React from "react";

function ToyCard({ toy, onLike, onDelete }) {
  function handleLike() {
    const updatedLikes = toy.likes + 1;

    fetch(`http://localhost:3001/toys/${toy.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ likes: updatedLikes }),
    })
      .then((response) => response.json())
      .then((updatedToy) => {
        onLike(updatedToy);
      })
      .catch((error) => console.error("Error updating likes:", error));
  }

  function handleDelete() {
    fetch(`http://localhost:3001/toys/${toy.id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          onDelete(toy.id);
        } else {
          console.error("Failed to delete toy");
        }
      })
      .catch((error) => {
        console.error("Error deleting toy:", error);
      });
  }
  return (
    <div className="card" data-testid="toy-card">
      <h2>{toy.name}</h2>
      <img src={toy.image} alt={toy.name} className="toy-avatar" />
      <p>{toy.likes || 0} Likes </p>
      <button className="like-btn" onClick={handleLike}>
        Like {"<3"}
      </button>
      <button className="del-btn" onClick={handleDelete}>
        Donate to GoodWill
      </button>
    </div>
  );
}

export default ToyCard;
