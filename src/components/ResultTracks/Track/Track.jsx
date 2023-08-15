import { useRef, useState, useEffect } from "react";
import PlayButton from "../../Buttons/PlayButton";
import AlbumImage from "../AlbumImage";
import useIntersectionOberserver from "../../../hooks/useIntersectionObserver";

export default function Track({
  artist,
  currRef,
  setCurrRef,
  playingTrack,
  setPlayingTrack,
}) {
  const player = new Audio(artist.preview_url);
  const audioRef = useRef(player);

  const [play, setPlay] = useState(false);

  useEffect(() => {
    const currentAudioRef = audioRef.current;
    return () => {
      currentAudioRef.pause();
    };
  }, []);

  useIntersectionOberserver();

  function onClick() {
    // console.log(currRef);

    const timer = setTimeout(() => {
      setPlayingTrack("");
      setPlay(false);
      console.log("Time is done");
    }, currRef.current.duration * 1000);

    setPlayingTrack(artist.id);
    if (!play) {
      // If a Track is not playing
      console.log(`${playingTrack} !== ${artist.id}`);
      if (playingTrack === "") {
        audioRef.current.play();
        setCurrRef(audioRef);
        setPlay(!play);
        console.log("Initial Play");
      } else if (playingTrack !== artist.id) {
        console.log(currRef);
        currRef.current.pause();
        currRef.current.currentTime = 0;
        audioRef.current.play();
        setCurrRef(audioRef);
        console.log("Switching over songs");
      } else {
        currRef.current.pause();
        currRef.current.currentTime = 0;
        setPlay(!play);
        setPlayingTrack("");
        console.log("Pausing current song");
      }
    } else {
      // If a Track is playing
      console.log(`${playingTrack} !== ${artist.id}`);
      // if (currRef === audioRef) {
      //   // If targeted track is the same as the playing Track
      //   setCurrRef(audioRef);
      //   if (playingTrack === artist.id) {
      //     currRef.current.pause();
      //     currRef.current.currentTime = 0;
      //   }
      //   setPlay(!play);
      //   console.log("Playing the same track");
      // } else {
      //   // If targeted track is NOT the same as the playing Track
      //   if (playingTrack !== artist.id) {
      //     currRef.current.pause();
      //     currRef.current.currentTime = 0;
      //     audioRef.current.play();
      //     setCurrRef(audioRef);
      //     setPlayingTrack(artist.id);
      //     console.log(`${playingTrack} !== ${artist.id}`);
      //   }
      //   setPlay(!play);
      //   console.log("Playing 2 different tracks");
      // }

      if (playingTrack === artist.id) {
        currRef.current.pause();
        currRef.current.currentTime = 0;
        setPlay(!play);
        setPlayingTrack("");
        console.log("Playing the same track");
      } else {
        currRef.current.pause();
        currRef.current.currentTime = 0;
        audioRef.current.play();
        setCurrRef(audioRef);
        setPlayingTrack(artist.id);
        console.log(playingTrack);
        // console.log(`${playingTrack} !== ${artist.id}`);

        // setPlay(!play);
        console.log("Playing 2 different tracks");
      }
      clearTimeout(timer);
      if (!play) {
        setPlayingTrack("");
      }
    }
  }

  return (
    <div className="grid grid-cols-8 gap-x-4 py-2 px-4 sm:px-4 md:py-4 md:gap-x-8 track">
      <AlbumImage artist={artist} />
      <div className="col-span-6 flex justify-between items-center gap-x-5 gap-y-1 sm:col-span-6 xl:col-span-7">
        <div className="min-w-0">
          <h2 className="text-emerald-500 font-bold text-lg sm:text-2xl md:text-3xl xl:text-4xl truncate">
            <a
              className="hover:underline"
              href={artist.external_urls.spotify}
              target="_blank"
              rel="noreferrer"
            >
              {artist.name}
            </a>
          </h2>
          <div className="text-emerald-600 text-base md:text-xl xl:text-2xl truncate">
            {artist.artists.map((artist, idx) => (
              <a key={idx} href={artist.href} className="artist-link">
                <span className="hover:underline">{artist.name}</span>
              </a>
            ))}
          </div>
        </div>
        <span className="play">
          <PlayButton
            artist={artist}
            onClick={onClick}
            audioRef={audioRef}
            currRef={currRef}
            playingTrack={playingTrack}
          />
        </span>
      </div>
    </div>
  );
}
