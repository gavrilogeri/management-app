import {
  CloudOutlined,
  FileTextOutlined,
  MailOutlined,
} from "@ant-design/icons";
import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import FlipCard from "./cards/FlipCard";
import NewsCard from "./cards/NewsCard";
import HeaderNewsApp from "./header/HeaderNewsApp";
import autumn from "./images/autumn-1638473_640.jpg";
import cauliflower from "./images/cauliflower-1465732_640.jpg";
import Sidebar from "./sidebar/Sidebar";
import styles from "./styles.module.scss";

const cardVariants = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,

    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2,
    },
  },
};

export const item = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
  remove: {
    opacity: 0,
    y: -1000,
    transition: {
      duration: 1,
    },
  },
};

const NewsCardApp = () => {
  const [canDrag, setCanDrag] = useState(true);

  return (
    <body>
      <div className={styles.container}>
        <HeaderNewsApp />

        <div className={styles.body}>
          <Sidebar />

          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            className={styles.content}
          >
            <FlipCard canDrag={canDrag} />

            <motion.div
              variants={item}
              className={styles["article-body"]}
              drag={canDrag}
              style={{
                ...(!canDrag
                  ? {
                      x: 0,
                      y: 0,
                    }
                  : {}),
              }}
            >
              <div>
                <FileTextOutlined className={styles.textIcon} />
                <div>
                  <span className={styles["card-text"]}>Tuseday Capsule</span>
                  <span className={styles["card-description"]}>
                    Tuseday Capsule
                  </span>
                  <a href="" className={styles.learnMoreLink}>
                    Brief me 🡒
                  </a>
                </div>
              </div>
              <h5>Amsterdam, Netherlands</h5>
              <div className={styles.forecast}>
                <CloudOutlined className={styles.cloudIcon} />

                <div>
                  <span>
                    <span className={styles.degrees}>28</span> °C
                  </span>
                  <span className={styles["card-description"]}>
                    Cloudy day, chances of rain
                  </span>
                </div>
              </div>
            </motion.div>

            <motion.div
              variants={item}
              drag={canDrag}
              className={styles["article-body"]}
            >
              <h4 className={styles["article-title"]}>
                Subscribe to Newsletter
              </h4>
              <div className={styles["input-email"]}>
                <form action="" className={styles.form}>
                  <input type="text" placeholder="Enter email" />
                  <button type="submit">
                    <MailOutlined className={styles.mailIcon} />
                  </button>
                </form>
              </div>
            </motion.div>
            <NewsCard
              imageUrl={cauliflower}
              newsTitle="The benefits of Cauliflower"
              viewCount="12,090"
            />
            <AnimatePresence>
              <NewsCard
                imageUrl={autumn}
                newsTitle="Let us plant more trees this year"
                viewCount="44,880"
              />
            </AnimatePresence>

            <motion.div
              variants={item}
              drag={canDrag}
              className={styles["article-body"]}
            >
              <div className={styles["card-content"]}>
                <h5>Featured</h5>
                <h2 className={styles["article-title"]}>
                  Natural mood regulation low or even absent in people with
                  depression
                </h2>
                <p>
                  Mood varies from hour to hour and healty mood regulation
                  choosing activities that help ones mood.
                </p>
              </div>
            </motion.div>

            <motion.div
              variants={item}
              drag={canDrag}
              className={styles["article-body"]}
            >
              <div className={styles["card-content"]}>
                <h4 className={styles["article-title"]}>Author</h4>
                <h5 className={styles["card-description"]}>of the month</h5>
                <div className={styles["image-div"]}>
                  <span className={styles["card-text"]}>Benjamin</span>
                  <span className={styles["card-text"]}>Pete Jonas</span>
                </div>
                <a href="" className={styles.learnMoreLink}>
                  Know more 🡒
                </a>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </body>
  );
};

export default NewsCardApp;
