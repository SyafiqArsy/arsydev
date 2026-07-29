"use client";

import { motion } from "framer-motion";

export default function Contact() {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <span className="text-sm uppercase tracking-[0.2em] text-purple-400 mb-4 block">
          Get In Touch
        </span>
        <h2 className="text-5xl md:text-7xl font-bold mb-8">
          Let's{" "}
          <span className="gradient-text">Create</span>{" "}
          Together
        </h2>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-12">
          Have an idea or project? I'd love to hear about it. Drop me a message
          and let's build something amazing.
        </p>

        <motion.a
          href="mailto:hello@porto.dev"
          className="inline-block px-10 py-4 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold text-lg hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Start a Conversation
        </motion.a>

        <div className="mt-20 flex justify-center gap-8">
          {["GitHub", "LinkedIn", "Twitter", "Dribbble"].map((social) => (
            <motion.a
              key={social}
              href="#"
              className="text-gray-500 hover:text-white transition-colors text-sm tracking-wider uppercase"
              whileHover={{ y: -3 }}
            >
              {social}
            </motion.a>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
