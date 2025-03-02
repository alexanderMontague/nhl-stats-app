export function Background() {
  return (
    <div className="fixed inset-0 -z-10 h-full w-full bg-rink-ice">
      <div className="absolute inset-0 bg-gradient-to-tr from-white via-rink-ice to-white" />
      <div className="absolute h-full w-full bg-[radial-gradient(#90caf9_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-rink-blue/10 via-transparent to-transparent blur-3xl" />
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-rink-red/10 via-transparent to-transparent blur-3xl" />
    </div>
  );
}
