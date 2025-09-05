import { useState } from "react";

function App() {
  const [image, setImage] = useState(null);

  const handelSubmit = async (e) => {
    try {
      e.preventDefault();
      const formData = new FormData();
      formData.append("image", e.target.image.files[0]);

      const response = await fetch("http://localhost:3000/file-upload", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      setImage(result);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handelSubmit}>
        <input type="file" name="image" />
        <button type="submit">Upload</button>
      </form>
      {image && <p> ${image.name}</p>}
      {image && <img src={image.location} alt="Uploaded" height={300} />}
    </div>
  );
}

export default App;
