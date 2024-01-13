import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AddAlbum from "./Components/AddAlbum";
import AlbumLists from "./Components/AlbumLists";
import UpdateAlbum from "./Components/UpdateAlbum";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [albums, setAlbums] = useState([]);
  const [updateAlbum, setUpdateAlbum] = useState([]);

  useEffect(() => {
    const fetchAlbums = async () => {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/albums`
      );
      const data = await response.json();
      setAlbums(data);
    };
    fetchAlbums();
  }, []);

  const deleteAlbumFromList = async (id) => {
    try {
      await fetch(`https://jsonplaceholder.typicode.com/albums/${id}`, {
        method: "DELETE",
      });
  
      const newAlbums = albums.filter((album) => album.id !== id);
      setAlbums(newAlbums);
  
      const notify = () => toast("Your Album Deleted successfully!");
      notify();
    } catch (error) {
      console.error("Error deleting album:", error);
    }
  };
  

  const setUpdateAlbumState = (album) => {
    setUpdateAlbum(album);
  };

  const updateAlbumInList = async (id, updateTitle, updateUserId, oldAlbum) => {
    const index = albums.indexOf(oldAlbum);
    let updatedAlbum = [];
  
    if (id < 100) {
      updatedAlbum = await fetch(
        `https://jsonplaceholder.typicode.com/albums/${id}`,
        {
          method: "PUT",
          body: JSON.stringify({
            userId: updateUserId, // Corrected variable name
            id: id,
            title: updateTitle,
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      ).then((response) => response.json());
    } else {
      updatedAlbum = {
        userId: updateUserId, // Corrected variable name
        id: id,
        title: updateTitle,
      };
    }
  
    const updatedAlbums = [...albums];
    updatedAlbums[index] = updatedAlbum;
  
    setAlbums(updatedAlbums);
    const notify = (message) => toast(message);
    notify("Update Successfully done!");
  };
  

  const addAlbumToList = (userId, title) => {
    fetch("https://jsonplaceholder.typicode.com/albums", {
      method: "POST",
      body: JSON.stringify({
        userId: userId,
        id: albums.length + 1,
        title: title,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }).then((response) => response.json());

    const album = {
      userId: userId,
      id: albums.length + 1,
      title: title,
    };
    setAlbums([...albums, album]);
    const notify = (message) => toast(message);
    notify("New Album added successfully!");
  };

  return (
    <>
      {/* <Navbar /> */}
      <ToastContainer />
    <Routes>
      <Route
        path="/"
        element={
          <AlbumLists
            albums={albums}
            setUpdateAlbum={setUpdateAlbum}
            deleteAlbumFromList={deleteAlbumFromList}
          />
        }
      />
      <Route
        path="/add-album"
        element={<AddAlbum addAlbumToList={addAlbumToList} />}
      />
      <Route
        path="/update-album"
        element={
          <UpdateAlbum
            album={updateAlbum}
            updateAlbumInList={updateAlbumInList}
          />
        }
      />
    </Routes>
    </>
  );
}

export default App;
