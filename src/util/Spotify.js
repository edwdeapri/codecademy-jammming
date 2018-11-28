let accessToken;
const clientId = "2324748f70c84f3ba1222cfccc7f877f";
const redirectUri = "https://zl3k81p07p.codesandbox.io/";
const spotifyUrl = `https://accounts.spotify.com/authorize?response_type=token&scope=playlist-modify-public&client_id=${clientId}&redirect_uri=${redirectUri}`;

let Spotify = {
  getAccessToken() {
    if (accessToken) {
      return accessToken;
    }
    const tokenUrl = window.location.href.match(/access_token=([^&]*)/);
    let expiresIn = window.location.href.match(/expires_in=([^&]*)/);
    if (tokenUrl && expiresIn) {
      accessToken = tokenUrl[1];
      expiresIn = expiresIn[1];
      window.setTimeout(() => (accessToken = ""), expiresIn * 1000);
      window.history.pushState("Access Token", null, "/");
    } else {
      window.location = spotifyUrl;
    }
    return accessToken;
  },

  search(term) {
    const accessToken = this.getAccessToken();
    this.getAccessToken();
    const searchUrl = `https://api.spotify.com/v1/search?type=track&q=${term}`;
    const requestHeaders = {
      headers: { Authorization: `Bearer ${accessToken}` }
    };
    return fetch(searchUrl, requestHeaders)
      .then(response => {
        return response.json();
      })
      .then(jsonResponse => {
        console.log(searchUrl + requestHeaders);
        if (!jsonResponse.tracks) {
          return [];
        }
        if (jsonResponse) {
          console.log(jsonResponse);
          return jsonResponse.tracks.items.map(track => {
            return {
              id: track.id,
              name: track.name,
              artist: track.artists[0].name,
              album: track.album.name,
              uri: track.uri
            };
          });
        } else {
          return;
        }
      });
  },

  savePlayList(name, trackURIs) {
    if (!name || !trackURIs || trackURIs.length === 0) return;

    const userUrl = "https://api.spotify.com/v1/me";
    const headers = { Authorization: `Bearer ${accessToken}` };
    let userId;
    let playListId;
    return fetch(userUrl, { headers: headers })
      .then(response => response.json())

      .then(jsonResponse => {
        userId = jsonResponse.id;
        const createPlayListUrl = `https://api.spotify.com/v1/users/${userId}/playlists`;
        return fetch(createPlayListUrl, {
          method: "POST",
          headers: headers,
          body: JSON.stringify({
            name: name
          })
        })
          .then(response => response.json())
          .then(jsonResponse => (playListId = jsonResponse.id))
          .then(() => {
            const addPlayListTracksUrl = `https://api.spotify.com/v1/users/${userId}/playlists/${playListId}/tracks`;
            return fetch(addPlayListTracksUrl, {
              method: "POST",
              headers: headers,
              body: JSON.stringify({
                uris: trackURIs
              })
            });
          });
      });
  }
};

export default Spotify;
