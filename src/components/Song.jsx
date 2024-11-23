import React, { useRef, useState } from "react";

const Song = ({ song }) => {
  const audioRef = useRef(null);
  const [play, setPlay] = useState(false);

  const onPlay = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio(song.preview);
    }

    if (!play) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
    setPlay(!play);
  };

  return (
    <div className="space-y-5">
      <div
        className="shadow rounded-md w-full h-52 flex items-center justify-center"
        style={{
          backgroundImage: `url(${song.album.cover})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <div className="cursor-pointer" onClick={onPlay}>
          <img
            width={35}
            height={35}
            src={!play ? "/play.svg" : "/pause.svg"}
            alt="play"
          />
        </div>
      </div>
      <p className="text-base font-medium">{song.title}</p>
    </div>
  );
};

export default Song;
