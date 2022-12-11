import axios from 'axios'

export default async function createPlaylist(token, userId){
    const response = await axios.post(`https://api.spotify.com/v1/users/${userId}/playlists`, {
        "name": "Randomify #1",
        "description": "Goofy ahh",
        "public": true
      }, 
      {
        headers: {
            Authorization: `Bearer ${token}`
        }
      }
    );

    return response.data.id;
}