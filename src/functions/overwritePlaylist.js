
import addTracks from "./addTracks";
import emptyPlaylist from "./emptyPlaylist";
import getPlaylists from "./getPlaylist";
import getPlaylistTracks from "./getPlaylistTracks";

export default async function overwritePlaylist(token, trackUris) {
    const playlists = await getPlaylists(token);
    
    let playlistId = "";
    playlists.forEach(playlist => {
        if(playlist.name.includes("Randomify")) {
           playlistId = playlist.id;
        }
    });                                   

    const tracks = await getPlaylistTracks(token, playlistId);
    
    let uris = [];
    tracks.forEach(track => {
        uris = [...uris, {"uri" : track.track.uri}];
    });

    const tracksUris = {"tracks": uris}

    const reponsedel = await emptyPlaylist(token, playlistId, tracksUris);
    
    addTracks(token, playlistId, trackUris);
}