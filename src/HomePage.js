import React from 'react';
import './HomePage.css'

function HomePage() {


  
  return (

    <div>
        <h2 className='section-heading'>
            <a href='/games'>New on Gamelog</a>
        </h2>
      <div className="game-list">
        <div className="game-card">
          <img
            src="https://stevivor.com/wp-content/uploads/2022/08/tlou.webp"
            alt="Game cover"
          />
          <h2>The Last of Us Part I</h2>
          <p>Naughty Dog</p>
          <button>Add to Playlist</button>
        </div>
        <div className="game-card">
          <img
            src="https://store-images.s-microsoft.com/image/apps.34695.68182501197884443.ac728a87-7bc1-4a0d-8bc6-0712072da93c.25816f86-f27c-4ade-ae29-222661145f1f?mode=scale&q=90&h=300&w=200&format=jpg"
            alt="Game cover"
          />
          <h2>Red Dead Redemption 2</h2>
          <p>Rockstar Games</p>
          <button>Add to Playlist</button>
        </div>
        <div className="game-card">
          <img
            src="https://via.placeholder.com/150x225.png?text=Game+Cover"
            alt="Game cover"
          />
          <h2>Signalis</h2>
          <p>Nintendo</p>
          <button>Add to Playlist</button>
        </div>
      </div>
    </div>
  );
}


export default HomePage;