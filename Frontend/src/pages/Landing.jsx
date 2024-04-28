import aggie from "../assets/aggie.png";

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 bg-driftwood `}
    >
      <div className="  z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex"></div>

      <div className="bg-warm-gray-500 ">
        <div className="   z-10 max-w-5xl w-full items-center justify-between font-bold  text-sm lg:flex  ">
          <div className="  py-3 px-6  border border-beige text-lg rounded-full font-semibold border-b-4 border-r-3.5 border-l-3.5 border-t--1 ">
            <p>The Aggie House Tool for Volunteers</p>
          </div>
        </div>
      </div>

      <div className=" relative flex place-items-center before:absolute before:h-[300px] before:w-full sm:before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full sm:after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700/10 after:dark:from-sky-900 after:dark:via-[#0141ff]/40 before:lg:h-[360px]">
        {/* aggie logo */}
        <img src={aggie} alt="aggiehouse logo" />
      </div>

      <div className="mb-32 lg:max-w-5xl lg:w-full lg:mb-0">
        <div className="flex flex-col items-center lg:flex-row lg:justify-center">
          {/* a link for volunteer card change */}
          <a
            href="/signup"
            className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={` mb-3 text-2xl font-semibold`}>
              Volunteers{" "}
              <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                -&gt;
              </span>
            </h2>
            <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
              Clock in and Clock Out
            </p>
          </a>
          {/* the a link for admin change it  */}
          <a
            href="/admin"
            className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={`mb-3 text-2xl font-semibold`}>
              Admin{" "}
              <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                -&gt;
              </span>
            </h2>
            <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
              Private Access for Admins
            </p>
          </a>
        </div>
      </div>
    </main>
  );
}
