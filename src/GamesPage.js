//gerekli import işlemleri yapılır
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './GamesPage.css';

function GamesPage() {
  const [games, setGames] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/games')
      .then(response => {
        setGames(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <h2 className='section-heading'>
        <a>Games on Gamelog</a>
      </h2>
      <div className="game-list">
        {games.map(game => (
          <div className="game-card" key={game.gameId}>
            <img
              src={game.gameCover}
              alt="Game cover"
            />
            <h2>{game.gameName}</h2>
            <p>{game.gameDev}</p>
            <button>Add to Playlist</button>
            <Link to={`/games/${game.gameId}`}>More info</Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default GamesPage;
