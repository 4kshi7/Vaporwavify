import { motion } from "framer-motion";
import Navbar from "../component/Navbar";

export const Landing = () => {
  return (
    <>
      <div
        className="w-full h-screen"
        style={{
          background: `linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)), url()`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <Navbar />
        <div className="h-full w-full flex flex-col items-center justify-center text-center px-10 ">
          <div className="mt-24 md:mt-24 overflow-y-hidden ">
            <motion.div
              animate={{ y: [-100, 0] }}
              transition={{ duration: 1.1 }}
            >
              <h1 className="tracking-tighter text-4xl md:text-5xl lg:text-6xl  xl:text-7xl mb-4 font-medium">
                Generate Images with AI
              </h1>
            </motion.div>

            <motion.div
              animate={{ y: [100, 0] }}
              transition={{ duration: 1.1 }}
            >
              <h1 className="text-gray tracking-tighter md:text-md xl:text-xl">
                Utilizing stabilityai/stable-diffusion-xl-base-1.0 model✨.
              </h1>
            </motion.div>
          </div>

          <div className="mb-2 h-80 w-80 md:h-72 md:w-72 mt-5">
            <img
              className="h-full w-full object-contain"
              src="https://media.giphy.com/media/gzROsII7swwrm/giphy.gif"
              alt="Vaporwave"
            />
          </div>
        </div>
      </div>
    </>
  );
};
