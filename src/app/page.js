import SongSearch from "@/components/SongSearch";

export default function Home() {
  return (
    <div className="select-none restricted min-h-screen p-10 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div className="space-y-6">
        <div className="flex items-center gap-2 justify-center">
          <img width={45} height={45} src="/deezer.png" alt="deezer" />
          <h2 className="text-black font-extrabold text-5xl text-center">
            Deezer - Nextjs
          </h2>
        </div>
        <p className="text-black text-lg text-center">
          Deezer Next.js app integrates Deezer's music streaming service with a
          dynamic, user-friendly interface, <br /> allowing seamless access to
          music, playlists, and personalized recommendations.
        </p>
      </div>
      <div className="mt-8">
        <SongSearch />
      </div>
    </div>
  );
}
