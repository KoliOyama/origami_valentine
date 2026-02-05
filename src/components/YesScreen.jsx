import { useSearchParams, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import PageContainer from "./PageContainer";
import Button from "./Button";
import AnimatedText from "./AnimatedText";
import cupidLeft from "../assets/cupid_left.svg";
import cupidRight from "../assets/cupid_right.svg";
import fullHeart from "../assets/full_heart.svg";

/**
 * Yes Screen - Positive response with cupids
 * Shows celebration with "I love you!" message
 */
const YesScreen = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const handleContinue = () => {
    navigate(`/reminder?${searchParams.toString()}`);
  };

  return (
    <PageContainer className="items-center justify-center">
      {/* Spacer for top */}
      <div className="flex-1" />

      {/* Cupids and message - center */}
      <div className="flex flex-col items-center">
        {/* Cupid illustrations with fly-in animation */}
        <div className="flex items-center justify-center gap-4 mb-8">
          {/* Left cupid - flies in from left */}
          <motion.img
            src={cupidLeft}
            alt=""
            className="w-32 h-32 md:w-40 md:h-40"
            aria-hidden="true"
            initial={{ opacity: 0, x: -100, rotate: -15 }}
            animate={{ opacity: 1, x: 0, rotate: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{
              duration: 0.6,
              delay: 0.2,
              ease: [0.34, 1.56, 0.64, 1], // spring-like
            }}
          />
          {/* Right cupid - flies in from right */}
          <motion.img
            src={cupidRight}
            alt=""
            className="w-32 h-32 md:w-40 md:h-40"
            aria-hidden="true"
            initial={{ opacity: 0, x: 100, rotate: 15 }}
            animate={{ opacity: 1, x: 0, rotate: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{
              duration: 0.6,
              delay: 0.3,
              ease: [0.34, 1.56, 0.64, 1], // spring-like
            }}
          />
        </div>

        {/* I love you message with animation */}
        <motion.div
          className="flex items-center gap-2"
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{
            duration: 0.5,
            delay: 0.5,
            ease: "easeOut",
          }}
        >
          <AnimatedText
            as="span"
            delay={0.6}
            className="font-serif text-2xl md:text-3xl text-valentine-brown"
          >
            I love you!
          </AnimatedText>
          <motion.img
            src={fullHeart}
            alt=""
            className="w-6 h-5 md:w-7 md:h-6"
            aria-hidden="true"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.4,
              delay: 0.8,
              ease: [0.34, 1.56, 0.64, 1],
            }}
          />
        </motion.div>
      </div>

      {/* Continue button - bottom */}
      <motion.div
        className="flex-1 flex flex-col items-center justify-end pb-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.9 }}
      >
        <Button onClick={handleContinue}>Continue</Button>
      </motion.div>
    </PageContainer>
  );
};

export default YesScreen;
