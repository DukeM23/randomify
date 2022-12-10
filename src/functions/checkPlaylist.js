import axios from "axios";


export default async function checkPlaylist(token) {
    let exists = false;

    const response = await axios.get("https://api.spotify.com/v1/me/playlists", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    const playlists = response.data.items;

    playlists.forEach(playlist => {
        if(playlist.name.includes("Randomify")) {
           exists = true;
        }
    });

    return exists;

}