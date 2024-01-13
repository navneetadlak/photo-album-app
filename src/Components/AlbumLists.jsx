import React from 'react';
import List from './List';
import Navbar from './Navbar';

const AlbumLists = (props) => {
  // Check if props.albums is an array
  if (!Array.isArray(props.albums)) {
    // Handle the case where props.albums is not an array
    console.error('Error: props.albums is not an array');
    return null; // or render an appropriate fallback
  }

  return (
    <>
      <Navbar page="Add Album" path="/add-album" />

      <div className='albums-list'>
        {props.albums.map((album) => (
          <List
            album={album}
            key={album.id}
            setUpdateAlbum={props.setUpdateAlbum}
            deleteAlbumFromList={props.deleteAlbumFromList}
          />
        ))}
      </div>
    </>
  );
}

export default AlbumLists;
