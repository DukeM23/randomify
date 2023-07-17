
import { useState } from "react"

export default function Track ({artist, token}) {
    // const player = document.getElementById(artist.id)
    const player = new Audio(artist.preview_url)
    console.log(player)
    const [play, setPlay] = useState(false)
    
    function artistFormat(artist) {
        return artist.artists
          .map((el) => {
            return el.name;
          })
          .join(", ");
    }

    function onMouseEnter() {
        if(!play) {
            player.play()
            setPlay(!play)
        } else {
            player.pause()
            setPlay(!play)
        }
    }

    function onMouseLeave() {
        if(play) {
            player.pause()
            setPlay(!play)
        }
    }

    return (
        <div className="grid grid-cols-3 gap-x-4 py-2 px-4 sm:px-4 md:grid-cols-8 md:py-4 md:gap-x-8">
            <a
                className="col-span-1 flex flex-col justify-center drop-shadow-2xl md:col-span-2 xl:col-span-1"
                href={artist.external_urls.spotify}
            >
                {
                    artist.album.images ? (
                    <img
                    className="rounded-md"
                    src={artist.album.images[0].url}
                    alt="Band lmao"
                    />
                ) : (
                    <div>No Image</div>
                )
                }
            </a>
            <div className="col-span-2 flex flex-col justify-center gap-y-1 md:col-span-6">
                <div className="flex gap-x-8 justify-between">
                    <h2 className="text-emerald-500 font-bold text-base sm:text-2xl md:text-3xl xl:text-4xl truncate">
                    <a
                        className="hover:underline"
                        href={artist.external_urls.spotify}
                        target="_blank"
                        rel="noreferrer"
                    >
                        {artist.name}
                    </a>
                    </h2>
                    <button 
                        id={artist.id} 
                        className={(artist.preview_url === null ?  "hover:cursor-not-allowed opacity-75" : "") + " rounded-full border-emerald-500 bg-emerald-600 hover:bg-emerald-500 text-gray-900 px-3 md:px-4  py-2 md:py-4"}
                        onClick={onMouseEnter}
                        // onMouseLeave={onMouseLeave}
                    >
                        
                        <i class="fas fa-play ml-1"></i>
                    </button>
                </div>
                <div className="text-emerald-600 text-sm sm:text-lg md:text-xl xl:text-2xl">
                    <p className="truncate">{artistFormat(artist)}</p>
                </div>
            </div>
            {/* <iframe style={{borderRadius:"12px"}} src={`https://open.spotify.com/embed/tracll/${}`} width="100%" height="352" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy" /> */}
        </div>
    );
  };