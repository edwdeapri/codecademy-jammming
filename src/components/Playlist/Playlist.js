import React from "react";

import "./Playlist.js";

import TrackList from "../TrackList/TrackList";

class Playlist extends React.Component {
  render() {
    return (
      <div className="Playlist">
        <input defaultValue="New Playlist" />
        {/* Add a TrackList component */}
        <a className="Playlist-save">SAVE TO SPOTIFY</a>
      </div>
    );
  }
}

export default Playlist;
