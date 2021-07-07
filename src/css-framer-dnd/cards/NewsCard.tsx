import React, { useState } from "react";
import styles from "../styles.module.scss";
import { EyeOutlined } from "@ant-design/icons";
import { AnimatePresence, motion } from "framer-motion";
import { item } from "../NewsCardApp";

interface Props {
  imageUrl: string;
  newsTitle: string;
  viewCount: string;
  onClick?: () => void;
}

const NewsCard: React.FC<Props> = ({
  imageUrl,
  newsTitle,
  viewCount,
  onClick,
}) => {
  const [isOpened, setIsOpened] = useState(true);

  return (
    <>
      <AnimatePresence>
        {isOpened && (
          <motion.div
            className={styles["article-body"]}
            variants={item}
            drag={true}
            initial={{
              opacity: 0,
            }}
            animate={{ opacity: 1 }}
            exit={{
              opacity: 0,
              y: -1000,
              transition: {
                duration: 1,
              },
            }}
          >
            <img src={imageUrl} />

            <div className={styles["card-content"]}>
              <h5>
                <EyeOutlined className={styles.eyeIcon} /> {viewCount}
              </h5>
              <h4 className={styles["article-title"]}>{newsTitle}</h4>
            </div>
            <motion.div>
              <motion.button
                className={styles.closeButton}
                onClick={() => setIsOpened((d) => !d)}
              >
                X
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default NewsCard;
