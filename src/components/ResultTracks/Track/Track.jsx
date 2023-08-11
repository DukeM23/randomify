import { useRef, useState, useEffect } from "react";
import PlayButton from "../../Buttons/PlayButton";
import AlbumImage from "../AlbumImage";
import useIntersectionOberserver from "../../../hooks/useIntersectionObserver";

export default function Track({ artist, currRef, setCurrRef }) {
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
    if (!play) {
      audioRef.current.play();
      setCurrRef(audioRef);
      setPlay(!play);
    } else {
      if (currRef === audioRef) {
        setCurrRef(audioRef);
        currRef.current.pause();
        setPlay(!play);
      } else {
        currRef.current.pause();
        audioRef.current.play();
        setCurrRef(audioRef);
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
          />
        </span>
      </div>
    </div>
  );
}
