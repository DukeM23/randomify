import addTracks from "./addTracks";
import emptyPlaylist from "./emptyPlaylist";
import getPlaylists from "./getPlaylist";
import getPlaylistTracks from "./getPlaylistTracks";
import getUserId from "./getUserId";

export default async function overwritePlaylist(token, trackUris) {
  const playlists = await getPlaylists(token);
  const userId = await getUserId(token);

  let playlistId = "";
  playlists.forEach((playlist) => {
    if (playlist.name.includes(`${userId}'s Randomify`)) {
      playlistId = playlist.id;
    }
  });

  const tracks = await getPlaylistTracks(token, playlistId);

  let uris = [];
  tracks.forEach((track) => {
    uris = [...uris, { uri: track.track.uri }];
  });

  const tracksUris = { tracks: uris };

  await emptyPlaylist(token, playlistId, tracksUris);

  let response = addTracks(token, playlistId, trackUris);

  return response;
}
