const NowPlaying = ({ selected }) => {
    if (!selected) return null; 
  
    return (
      <div className="now-playing">
        <h2>Now Playing</h2>
        <h2>Title: {selected.title || "Unknown"}</h2>
        <h2>Artist: {selected.artist || "Unknown"}</h2>
      </div>
    );
  };
  
  export default NowPlaying;
  