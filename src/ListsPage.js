import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './ListsPage.css';

function ListsPage() {
  const [lists, setLists] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/lists')
      .then(response => {
        setLists(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <h2 className='section-heading'>
        <a>Lists on Gamelog</a>
      </h2>
      <div className="game-list">
        {lists.map(list => (
          <div className="list-card" key={list.listId}>
            
            <h2>{list.listName}</h2>
            <p>{list.listUser}</p>
            <Link to={`/games/${list.listId}`}>More info</Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ListsPage;




/*<img
              src={list.listCover}
              alt="list cover"
            />*/