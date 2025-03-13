import { useState } from 'react';

const TrackForm = (props) => {
  
  const initialState = {
    title: '',
    artist: ''
  }
  // formData state to control the form.
  // If track data has been passed as props, we set formData as that track object.
  // Otherwise, we can assume this is a new track form and use the empty
  // initialState object.
  const [formData, setFormData] = useState(
    props.selected ? props.selected : initialState
  )


  // handleChange function to update formData state.
  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (props.selected) {
  // Don't forget to pass both formData and the ._id!
  props.handleUpdateTrack(formData, props.selected._id);
} else {
    props.handleAddTrack(formData);
  }
    // Right now, if you add a track and submit the form,
    // the data entered will stay on the page. We'll fix this soon.
  };

  // And finally, the form itself.
  return (
    <div>
       {/* Call the new handleSubmit function when the form is submitted. */}
       <form onSubmit={handleSubmit}>
        <label htmlFor="title"> Title </label>
        <input
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <label htmlFor="artist"> Artist </label>
        <input
          id="artist"
          name="artist"
          value={formData.artist}
          onChange={handleChange}
          required
        />
        </form>
      <form onSubmit={handleSubmit}>
        {/* Code for form inputs here */}
        <button type="submit">
          {props.selected ? 'Update Track' : 'Add New Track'}
        </button>
      </form>
    </div>
  );
};

export default TrackForm;
