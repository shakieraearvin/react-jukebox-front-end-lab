const TrackDetail = (props) => {
    // return if props.selected is null
    if (!props.selected) {
      return (
        <div>
          <h1>NO DETAILS</h1>
        </div>
      );
    }
  
    // return statement if props.selected has a truthy value
    return (
        <div>
        <h1>{props.selected.title}</h1>
        <h2>
          Age: {props.selected.artist} year{props.selected.artist > 1 ? 's' : ''} old
        </h2>
        {/* Our new button, wrapped in a div */}
        <div>
          <button onClick={() => props.handleFormView(props.selected)}>
            Edit Track
          </button>
        </div>
      </div>
    );
  };
  
  export default TrackDetail;
  