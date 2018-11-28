import React from "react";

import "./TrackList.css";

import Track from "../Track/Track";

class TrackList extends React.Component {
  render() {
    return (
      <div className="TrackList">
        {this.props.tracks.map(track => (
          <Track
            onAdd={this.props.onAdd}
            onRemove={this.props.onRemove}
            track={track}
            isRemoval={this.props.isRemoval}
            name={track.name}
            key={track.id}
          />
        ))}
      </div>
    );
  }
}

export default TrackList;
