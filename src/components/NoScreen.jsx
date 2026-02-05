import { useSearchParams, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import PageContainer from "./PageContainer";
import Button from "./Button";
import AnimatedText from "./AnimatedText";
import brokenHeart from "../assets/Broken_heart.svg";

/**
 * No Screen - Negative response with broken heart
 * Gives option to try again
 */
const NoScreen = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const handleTryAgain = () => {
    // Navigate back to the card page (will show folded state again)
    navigate(`/card?${searchParams.toString()}`);
  };

  return (
    <PageContainer className="items-center justify-center">
      {/* Spacer for top */}
      <div className="flex-1" />

      {/* Broken heart and message - center */}
      <div className="flex flex-col items-center">
        {/* Broken heart illustration with shake animation */}
        <motion.img
          src={brokenHeart}
          alt="Broken heart"
          className="w-24 h-24 md:w-28 md:h-28 mb-6"
          initial={{ opacity: 0, scale: 1.2 }}
          animate={{
            opacity: 1,
            scale: 1,
            rotate: [0, -5, 5, -5, 0],
          }}
          transition={{
            duration: 0.6,
            delay: 0.2,
            rotate: { duration: 0.4, delay: 0.5 },
          }}
        />

        {/* Sad message */}
        <AnimatedText
          as="p"
          delay={0.4}
          className="font-sans text-lg md:text-xl text-valentine-brown"
        >
          You broke my heart :(
        </AnimatedText>
      </div>

      {/* Try again button - bottom */}
      <motion.div
        className="flex-1 flex flex-col items-center justify-end pb-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.6 }}
      >
        <Button onClick={handleTryAgain}>Try again</Button>
      </motion.div>
    </PageContainer>
  );
};

export default NoScreen;
