import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <div
      className=" fixed  z-[999] w-full px-[4.5vw] py-5 font-['Neue Montreal'] flex justify-between itema-center"
    >
      <div className="logo">
        <h1 className="font-semibold text-lg md:text-xl lg:text-2xl hover:scale-105 duration-150">
          <Link to="/">Vaporwavify</Link>
        </h1>
      </div>

      <div className="links flex gap-5 cursor-pointer">
        <motion.h1
          whileHover={{ scale: 1.1 }}
          className="text-lg"
          onClick={() => navigate("/dashboard")}
        >
          Generate
        </motion.h1>
      </div>
    </div>
  );
};

export default Navbar;
