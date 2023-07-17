import axios from "axios"

export default async function oEmbed(url, token) {

    const { data, status } = await axios.get("https://open.spotify.com/oembed?url=" + url);

    console.log(data)

    return data
} 