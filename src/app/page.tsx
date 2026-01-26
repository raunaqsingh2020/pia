import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <div className="max-w-2xl text-center space-y-8">
        <div className="flex justify-center">
          <div className="relative w-64 h-64 rounded-full overflow-hidden">
            <Image
              src="/portrait.png"
              alt="Pia Singh"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
        <div className="space-y-2">
          <h1 className="text-5xl font-light tracking-wide text-neutral-900">
            Journalist. Creator.
          </h1>
        </div>
      </div>
    </main>
  );
}
