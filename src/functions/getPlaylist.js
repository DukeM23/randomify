import axios from "axios";

export default async function getPlaylists(token) {
    const response = await axios.get("https://api.spotify.com/v1/me/playlists", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    const playlists = response.data.items;

    return playlists;
}