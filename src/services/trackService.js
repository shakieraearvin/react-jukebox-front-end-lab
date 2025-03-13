const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/tracks`;

const index = async () => {
    try {
    const res = await fetch(BASE_URL); // GET  - http://localhost:3000/tracks and storing it in 'res'
    return res.json();
    } catch (err) {
        console.log(err);
    }
  };


const create = async (formData) => {
    try {
        const res = await fetch(BASE_URL, {
            // We specify that this is a 'POST' request
            method: 'POST',
            // We're sending JSON data, so we attach a Content-Type header
            // and specify that the data being sent is type 'application/json'
            headers: {
              'Content-Type': 'application/json',
            },
            // The formData, converted to JSON, is sent as the body
            // This will be received on the back-end as req.body
            body: JSON.stringify(formData),
          });
          return res.json();
  
    } catch (err) {
      console.log(err);
    }
  };


const update = async (formData, trackId) => {
    try {
      const res = await fetch(`${BASE_URL}/${trackId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      return res.json();
    } catch (err) {
      console.log(err);
    }
  };
  
  

console.log(await index());


  export {
    index, 
    create,
    update,
  }