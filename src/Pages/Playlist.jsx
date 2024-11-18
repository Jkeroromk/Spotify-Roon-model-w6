const Playlist = ({ songs = [] }) => {
    // Function to format the song duration
    const formatDuration = (duration_ms) => {
      const minutes = Math.floor(duration_ms / 60000);
      const seconds = ((duration_ms % 60000) / 1000).toFixed(0);
      return `${minutes}:${seconds.padStart(2, "0")}`;
    };
  
    return (
      <section>
        <div className="playlist-info">
          <h1 className="playlist-title">My Playlist</h1>
          <h4 className="playlist-duration">Total Songs: {songs.length}</h4>
        </div>
        <div className="sepre"></div>
        <div>
          {songs.length === 0 ? (
            <h5>No songs in the playlist yet.</h5>
          ) : (
            <ul>
              {songs.map((song) => (
                <li key={song.id}> {/* Use song.id as the key */}
                  <h3>{song.name}</h3>
                  <p>Artist: {song.artists?.[0]?.name}</p>
                  <p>Album: {song.album?.name}</p>
                  <p>Duration: {song.duration_ms ? formatDuration(song.duration_ms) : "N/A"}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    );
  };
  
  export default Playlist;
  
  