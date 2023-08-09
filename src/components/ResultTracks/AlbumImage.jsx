export default function AlbumImage({ artist }) {
  const { external_urls, album } = artist;

  return (
    <a
      className="col-span-2 flex flex-col justify-center drop-shadow-2xl md:col-span-2 xl:col-span-1 h-auto"
      href={external_urls.spotify}
    >
      <img className="rounded-md" src={album.images[0].url} alt="Band lmao" />
    </a>
  );
}
