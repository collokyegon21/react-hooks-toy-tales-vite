import React, { useState, useEffect } from "react";

import Header from "./Header";
import ToyForm from "./ToyForm";
import ToyContainer from "./ToyContainer";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [toys, setToys] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/toys")
      .then((response) => response.json())
      .then((data) => setToys(data));
  }, []);

  function handleClick() {
    setShowForm((showForm) => !showForm);
  }
  function handleAddNewToy(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const toyData = {
      id: toys.length + 1,
      name: formData.get("name"),
      image: formData.get("image"),
      likes: 0,
    };
    fetch("http://localhost:3001/toys", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(toyData),
    })
      .then((response) => response.json())
      .then((newToy) => {
        setToys((prevToys) => [...prevToys, newToy]);
        console.log("New toy added:", newToy);
      });
  }

  function handleDelete(deletedId) {
    setToys((prevToys) => prevToys.filter((toy) => toy.id !== deletedId));
  }

  function handleLike(updatedToy) {
    setToys((prevToys) =>
      prevToys.map((toy) => (toy.id === updatedToy.id ? updatedToy : toy)),
    );
  }

  return (
    <>
      <Header />
      {showForm ? <ToyForm handleSubmit={handleAddNewToy} /> : null}
      <div className="buttonContainer">
        <button onClick={handleClick}>Add a Toy</button>
      </div>
      <ToyContainer toys={toys} onLike={handleLike} onDelete={handleDelete} />
    </>
  );
}

export default App;
