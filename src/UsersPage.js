import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import Avatar from 'react-avatar';
import './UsersPage.css';


function UsersPage() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/users')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <h2 className='section-heading'>
        <a>Users on Gamelog</a>
      </h2>
      <div className="user-list">
        {users.map(user => (
          <div className="user-card" key={user.userId}>
            <Avatar name={user.userName} round="60px"><Link to={`/users/${user.userId}`}>More info</Link></Avatar>
            <h2>{user.userName}</h2>
            <button>
            <FontAwesomeIcon icon={faUserPlus} style={{"--fa-primary-color": "#5a5a5a", "--fa-secondary-color": "#000000",}} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UsersPage;
