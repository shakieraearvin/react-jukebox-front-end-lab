import { useState, useEffect } from 'react';
import * as trackService from './services/trackService';
import TrackList from './components/TrackList/TrackList';

const App = () => {
  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    // Create a new async function
    const fetchTracks = async () => {
      try {
      // Call on the track service's index function
      const fetchedTracks = await trackService.index();

      if (fetchedTracks.err) {
        throw new Error(fetchedTracks.err);
      }
      // Set tracks state to the returned tracks data
      setTracks(fetchedTracks);
    } catch (err) {
      // Log the error object
      console.log(err);
    }
  };
    // Invoke the function
    fetchTracks();
    // Add an empty dependency array to the `useEffect()` hook.
  }, []);

  return (
    <>
      <TrackList tracks={tracks} />
    </>
  );
};
export default App;
