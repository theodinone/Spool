"use client";

export default function VideoPlayer({ src }: { src: string }) {
  return (
    <div className="aspect-video rounded-lg overflow-hidden bg-border">
      <video
        src={src}
        controls
        autoPlay
        muted
        playsInline
        controlsList="nodownload"
        onContextMenu={(e) => e.preventDefault()}
        className="w-full h-full object-cover"
      />
    </div>
  );
}
