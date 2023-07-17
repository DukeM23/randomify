
import { useState, useRef, useEffect } from "react"

export default function Track ({artist, currRef, setCurrRef, play, setPlay}) {
    const players = document.getElementsByClassName("play")
    const player = new Audio(artist.preview_url)
    const audioRef = useRef(player)
    // const [play, setPlay] = useState(false)

    useEffect(() => {
        console.log("component mounted")
        return () => {
          console.log("component unmounted")
          audioRef.current.pause()
        //   currRef.current.pause()
          // console.log(currRef)
        }
      }, [])

    function artistFormat(artist) {
        return artist.artists
          .map((el) => {
            return el.name;
          })
          .join(", ");
    }

    function onClick() {
        console.log(play)
        // if(currRef === "") {
        //     setCurrRef(audioRef)
        // }

        console.log(currRef)
        console.log(audioRef)
        // if(!play) {
        //     audioRef.current.play()
        //     console.log("play")
        // } else {
        //     audioRef.current.pause()
        //     console.log("paused")
        //     // player.currentTime = 0
        // }
        
        if(!play) {
            audioRef.current.play()
            setCurrRef(audioRef)
            console.log("play")
            setPlay(!play)
        } else {
            if(currRef === audioRef) {
                setCurrRef(audioRef)
                currRef.current.pause()
                setPlay(!play)
            } else {
                currRef.current.pause()
                audioRef.current.play()
                setCurrRef(audioRef)
            }
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
                <div className="flex space-x-8 justify-between">
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
                    <span className="play">
                        <button 
                            id={artist.id} 
                            className={(artist.preview_url === null ?  "hover:cursor-not-allowed opacity-75" : "") + " rounded-full border-emerald-500 bg-emerald-600 hover:bg-emerald-500 text-gray-900 px-3 md:p-4  py-2 md:py-3"}
                            onClick={onClick}
                            // onMouseLeave={onMouseLeave}
                        >
                            <i class="fas fa-play ml-1"></i>
                        </button>
                    </span>
                </div>
                <div className="text-emerald-600 text-sm sm:text-lg md:text-xl xl:text-2xl">
                    <p className="truncate">{artistFormat(artist)}</p>
                </div>
            </div>
            {/* <iframe style={{borderRadius:"12px"}} src={`https://open.spotify.com/embed/tracll/${}`} width="100%" height="352" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy" /> */}
        </div>
    );
  };