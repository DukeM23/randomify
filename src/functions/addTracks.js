import axios from 'axios';

export default async function addTracks(token, playlistId, trackUris){
    const response = await axios.post(`https://api.spotify.com/v1/playlists/${playlistId}/tracks `, {
          "uris": trackUris,
          "position": 0
        }, 
        {
          headers: {
              Authorization: `Bearer ${token}`
          }
        })
        console.log(response.data)
    return response;
}