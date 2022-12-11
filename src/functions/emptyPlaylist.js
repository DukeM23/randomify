import axios from "axios";

export default async function emptyPlaylist(token, id, uri) {
    let data = JSON.stringify(uri);

    let config = {
        method: 'delete',
        url: `https://api.spotify.com/v1/playlists/${id}/tracks`,
        headers: { 
          'Authorization': `Bearer ${token}`, 
          'Content-Type': 'application/json'
        },
        data : data
      };

    const reponse = await axios(config);
    console.log(reponse);
}