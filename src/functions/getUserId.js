import axios from "axios";

export default async function getUserId(token) {
    const {data, status} = await axios.get("https://api.spotify.com/v1/me", 
    {
      headers: {
          Authorization: `Bearer ${token}`
      }
    });
    return data.id;
}