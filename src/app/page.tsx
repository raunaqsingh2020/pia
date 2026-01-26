export default function Home() {
  return (
    <main className="min-h-[calc(100vh-50px)] flex flex-col justify-between px-6 py-12">
      {/* Hero Section with Large Name */}
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-5xl">
          <h1 className="text-8xl md:text-9xl lg:text-[10rem] xl:text-[12rem] leading-none font-medium tracking-tight text-neutral-900">
            PIA
          </h1>
          <h1 className="text-8xl md:text-9xl lg:text-[10rem] xl:text-[12rem] leading-none font-medium tracking-tight text-neutral-900 text-right -mt-4 sm:-mt-6 md:-mt-8">
            SINGH
          </h1>
        </div>
      </div>

      {/* Bio at Bottom */}
      <div className="max-w-2xl">
        <p className="text-md font-light text-neutral-700 leading-relaxed">
          A financial reporter and multi-format creator crafting stories that matter.
        </p>
      </div>
    </main >
  );
}
