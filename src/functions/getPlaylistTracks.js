import axios from "axios";
import getPlaylists from "./getPlaylist";

export default async function getPlaylistTracks(token, id){
    const response = await axios.get(`https://api.spotify.com/v1/playlists/${id}/tracks`,
        {
          headers: {
              Authorization: `Bearer ${token}`
          }
    });

    return response.data.items;
}