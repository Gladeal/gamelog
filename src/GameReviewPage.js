import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function GameReviewPage() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/reviews')
      .then(response => {
        setReviews(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

return (
    
<div>
      <h2 className='section-heading'>
        <a>Reviews on Gamelog</a>
      </h2>
      <div className="game-list">
        {reviews.map(reviews => (
          <div className="game-card" key={reviews.reviewId}>        
            <h2>{reviews.reviewName}</h2>
            <Link to={`/reviews/${reviews.reviewId}`}>More info</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameReviewPage;





/*  <div>
      {review ? (
        <div>
          <h2>{review.gameName}</h2>
          <h3>Reviews on Gamelog: {review.userName}</h3>
          <h4>{review.title}</h4>
          <p>{review.content}</p>
        </div>
      ) : (
        <p>Loading review...</p>
      )}
    </div>*/