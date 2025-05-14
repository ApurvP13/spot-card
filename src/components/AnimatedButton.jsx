import { motion } from "framer-motion";

export default function AnimatedButton() {
  return (
    <motion.button
      className="bg-[#4ac776] px-4 py-4 rounded-2xl  tracking-wider font-semibold uppercase font-sans"
      type="submit"
      whileHover={{
        scale: 1.1, // Slightly grow the button on hover
        transition: {
          staggerChildren: 0.05, // Stagger the animations for each letter on hover
        },
      }}
      whileTap={{
        scale: 0.95, // Shrink when clicked
        rotate: [0, -5, 5, 0], // Minimal shake
        transition: { duration: 0.2 },
        opacity: 0.8,
      }}
    >
      <motion.span
        className="flex"
        initial={{ y: 0 }} // Start with the text in its normal position
        animate={{
          y: 0,
          transition: {
            type: "spring",
            stiffness: 100,
            damping: 20,
          },
        }}
        whileHover={{
          y: -10, // Move the entire text up on hover
          transition: {
            type: "spring",
            stiffness: 100,
            damping: 20,
          },
        }}
      >
        SpotCard!
      </motion.span>
    </motion.button>
  );
}
