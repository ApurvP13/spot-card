import { useState } from "react";

export default function SpotifyCodeGenerator() {
  const [input, setInput] = useState("");
  const [spotifyUri, setSpotifyUri] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const uri = getSpotifyURI(input);
    console.log(uri);

    setTimeout(() => {
      setSpotifyUri(uri);
      setLoading(false);
    }, 1000);
  };

  const getSpotifyURI = (url) => {
    try {
      const parts = url.split("/");
      const type = parts[3];
      const id = parts[4]?.split("?")[0];
      return `spotify:${type}:${id}`;
    } catch {
      return null;
    }
  };

  const getSpotifyCodeURL = (spotifyUri) => {
    const format = "jpeg";
    const bg = "1db954"; // background color
    const bar = "white"; // bar color
    const size = 640;
    console.log(`https://scannables.scdn.co/uri/plain/jpeg/${bg}/${bar}/${size}/
      ${spotifyUri}`);

    return `https://scannables.scdn.co/uri/plain/jpeg/${bg}/${bar}/${size}/${spotifyUri}`;
  };

  return (
    <div className="w-full max-w-md p-6 bg-white rounded-xl shadow-lg mx-auto text-center space-y-4">
      <h2 className="text-xl font-bold text-zinc-800">Generate Spotify Code</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Paste Spotify URL here"
          className="px-4 py-2 border border-zinc-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1db954]"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          type="submit"
          className="bg-[#1db954] text-white py-2 rounded-md font-semibold tracking-wide hover:bg-[#1ed760] transition"
        >
          Generate
        </button>
      </form>

      {loading && (
        <div className="mt-4 text-sm text-zinc-500 animate-pulse">
          Generating code...
        </div>
      )}

      {!loading && spotifyUri && (
        <img
          src={getSpotifyCodeURL(spotifyUri)}
          alt="Spotify Code"
          className="w-48 mx-auto mt-4 rounded shadow-md"
        />
      )}
    </div>
  );
}
