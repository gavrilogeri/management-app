import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import building from "../images/building-4781384_640.jpg";
import styles from "../styles.module.scss";

interface Props {
  canDrag: boolean;
}

const FlipCard: React.FC<Props> = ({ canDrag }) => {
  const [clicked, setClicked] = useState(false);
  return (
    <AnimatePresence>
      <motion.div className={styles.wrapperFlipCard} drag={canDrag}>
        {!clicked && (
          <motion.div
            className={styles["article-body"]}
            style={{ WebkitBackfaceVisibility: "hidden" }}
            initial={{ rotateY: -180 }}
            exit={{ rotateY: -180, opacity: 0 }}
            animate={{ rotateY: 0 }}
            transition={{
              type: "spring",
              damping: 20,
              stiffness: 80,
              duration: 2,
            }}
            key={1}
          >
            <img src={building} />
            <div className={styles["card-content"]}>
              <h4>Architecture</h4>
              <h3 className={styles["article-title"]}>
                Ground breaking building in a a classic example of English
                architecture
              </h3>
              <div>
                <div>
                  <span className={styles["card-text"]}>Tony Roseville</span>
                  <span className={styles["card-description"]}>
                    Jul 13, 2019
                  </span>
                </div>
              </div>
              <div>
                <a
                  onClick={() => setClicked(true)}
                  className={styles.learnMoreLink}
                >
                  Read more 🡒
                </a>
              </div>
            </div>
          </motion.div>
        )}
        {clicked && (
          <motion.div
            className={styles["article-body"]}
            style={{ WebkitBackfaceVisibility: "hidden" }}
            initial={{
              rotateY: 180,
            }}
            exit={{
              rotateY: 180,
              opacity: 0,
              transition: {
                duration: 2,
              },
            }}
            animate={{ rotateY: 0 }}
            transition={{
              type: "spring",
              damping: 20,
              stiffness: 80,
              duration: 2,
            }}
            key={2}
          >
            {/* <img src={building} /> */}
            <div className={styles["card-content"]}>
              <h4>BACK SIDE</h4>
              <h3 className={styles["article-title"]}>BACK SIDE TEXT</h3>
              <div>
                <div>
                  <div className={styles["card-text"]}>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip.
                    </p>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      ut labore et dolore magna ut labore et dolore magna
                    </p>
                  </div>
                  <span>
                    <a
                      onClick={() => setClicked(false)}
                      className={styles.learnMoreLink}
                    >
                      ⟵ Less
                    </a>{" "}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
    // </motion.div>
  );
};

export default FlipCard;
