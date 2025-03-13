import { useState, useEffect } from 'react';
import * as trackService from './services/trackService';
import TrackList from './components/TrackList/TrackList';
import TrackDetail from './components/TrackDetail/TrackDetail';
import TrackForm from './components/TrackForm/TrackForm';
import './App.css'


const App = () => {
  const [tracks, setTracks] = useState([]);
  const [selected, setSelected] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);


  // Create a new useEffect
  useEffect(() => {
    // Create a new async function
    const fetchTracks = async () => {
      try {
        // Call on the track service's index function
        const fetchedTracks = await trackService.index();
        // Don't forget to pass the error object to the new Error
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

  // this will set the clicked track to the fetch track once clicked 
  const handleSelect = (track) => {
    setSelected(track)
    // Close the form if it's open when a new track is selected.
    setIsFormOpen(false);
  };

  const handleFormView = (track) => {
    if (!track._id) setSelected(null);
    setIsFormOpen(!isFormOpen);
  };

  const handleAddTrack = async (formData) => {
    try {
  // Call trackService.create, assign return value to newTrack
  const newTrack = await trackService.create(formData);

  if (newTrack.err) {
    throw new Error(newTrack.err);
  }
  // Add the track object and the current tracks to a new array, and
      // set that array as the new tracks
      setTracks([newTrack, ...tracks]);
      // Close the form after we've added the new pet
    setIsFormOpen(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdateTrack = async (formData, trackId) => {
    try {
      const updatedTrack = await trackService.update(formData, trackId);
  
      // handle potential errors
      if (updatedTrack.err) {
        throw new Error(updatedTrack.err);
      }
  
      const updatedTrackList =tracks.map((track) => (
        // If the _id of the current track is not the same as the updated track's _id,
        // return the existing track.
        // If the _id's match, instead return the updated track.
        track._id !== updatedTrack._id ? track : updatedTrack
      ));
      // Set tracks state to this updated array
      setTracks(updatedTrackList);
      // If we don't set selected to the updated track object, the details page will
      // reference outdated data until the page reloads.
      setSelected(updatedTrack);
      setIsFormOpen(false);
    } catch (err) {
      console.log(err);
    }
  };
  
  // Return the new TrackList component inside a React fragment
  return (
    <>
      <TrackList
        tracks={tracks}
        handleSelect={handleSelect}
        handleFormView={handleFormView}
        isFormOpen={isFormOpen}
      />
      {/* Pass selected to TrackForm and handleFormView to TrackDetail */}
      {isFormOpen ? (
        <TrackForm
        handleAddTrack={handleAddTrack} 
        selected={selected} 
        handleUpdateTrack={handleUpdateTrack}
        />
      ) : (
        <TrackDetail selected={selected} handleFormView={handleFormView}/>
      )}
    </>
  );
};





export default App;