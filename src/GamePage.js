import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function GamePage() {
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:3001/games/${id}`)
      .then((response) => {
        setGame(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!game) {
    return <div>Game not found</div>;
  }

  return (
    <div>
      <h2>{game.gameName}</h2>
      <img src={game.gameCover} alt="Game cover" />
      <p>{game.gameDev}</p>
      <p>Release date: {game.gameDate}</p>
      <p>{game.gameDesc}</p>
    </div>
  );
}

export default GamePage;


