import axios from "axios";

export default async function getRecommended(
  token,
  seedGenre,
  accousticness,
  danceability,
  energy,
  instrumentalness,
  loudness,
  tempo
) {
  const { data, status } = await axios.get(
    "https://api.spotify.com/v1/recommendations",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        seed_genres: seedGenre,
        target_accousticness: accousticness,
        target_danceability: danceability,
        target_energy: energy,
        target_instrumentalness: instrumentalness,
        target_loudness: loudness,
        target_tempo: tempo,
      },
    }
  );

  return data.tracks;
}
