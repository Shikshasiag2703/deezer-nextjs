"use client";
import React, { useState } from "react";

const SongSearch = () => {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [audioRefs, setAudioRefs] = useState({});
  const [play, setPlay] = useState(null);

  const onPlay = (songId, previewUrl) => {
    if (play === songId) {
      audioRefs[songId].pause();
      setPlay(null);
    } else {
      Object.keys(audioRefs).forEach((key) => {
        audioRefs[key].pause();
      });
      if (!audioRefs[songId]) {
        const audio = new Audio(previewUrl);
        audio.onended = function () {
          setPlay(null);
          if (audioRefs[songId]) audioRefs[songId].pause();
        };
        setAudioRefs({ ...audioRefs, [songId]: audio });
        audio.play();
      } else {
        audioRefs[songId].play();
      }
      setPlay(songId);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const values = Object.fromEntries(new FormData(e.currentTarget));
    const text = values.text;
    if (!text) return;
    Object.keys(audioRefs).forEach((key) => {
      audioRefs[key].pause();
    });
    setAudioRefs({});
    setResult(null);
    setPlay(null);
    setLoading(true);
    fetch("https://api.deezer.com/search/track?q=" + text)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
      })
      .then((data) => {
        if (data && data.data) setResult(data.data);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div>
      <form onSubmit={onSubmit} className="w-full">
        <div className="relative">
          <input
            disabled={loading}
            name="text"
            className="select-all bg-white h-12 px-2 py-1.5 w-full border border-gray-300 outline-none rounded-md"
            placeholder="Search for a song, artist, or album..."
          />
          {loading ? (
            <div className="absolute top-1/2 -translate-y-1/2 right-2 loader" />
          ) : (
            <div className="absolute top-1/2 -translate-y-1/2 right-2">
              <button
                type="submit"
                className="flex h-8 w-8 items-center justify-center rounded-full transition-colors hover:opacity-70 focus-visible:outline-none focus-visible:outline-black disabled:text-[#f4f4f4] disabled:hover:opacity-100 dark:focus-visible:outline-white disabled:dark:bg-token-text-quaternary dark:disabled:text-token-main-surface-secondary bg-black text-white disabled:bg-[#D7D7D7]"
              >
                <img
                  width={32}
                  height={32}
                  src="/arrow-submit.svg"
                  alt="arrow-submit"
                />
              </button>
            </div>
          )}
        </div>
      </form>
      {result && (
        <div className="animated-text">
          <div className="grid gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 mt-6">
            {result.map((song) => (
              <div className="space-y-4" key={song.id}>
                <div
                  className="shadow rounded-md w-full h-60 flex items-center justify-center"
                  style={{
                    backgroundImage: `url(${song.album.cover})`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                  }}
                >
                  <div
                    className="cursor-pointer"
                    onClick={() => onPlay(song.id, song.preview)}
                  >
                    <img
                      width={35}
                      height={35}
                      src={play === song.id ? "/pause.svg" : "/play.svg"}
                      alt="play"
                    />
                  </div>
                </div>
                <p className="text-base font-medium">{song.title}</p>
              </div>
            ))}
          </div>
        </div>
      )}
      <div className="text-lg pt-10 flex justify-center items-center gap-2">
        <p>Powered by </p>
        <div className="flex items-center gap-1">
          <img width={20} height={20} src="/deezer.png" alt="deezer" />
          <b>Deezer</b>
        </div>
      </div>
    </div>
  );
};

export default SongSearch;
