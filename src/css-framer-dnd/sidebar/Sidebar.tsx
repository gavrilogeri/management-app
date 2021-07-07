import {
  HomeOutlined,
  CompassOutlined,
  ProjectOutlined,
  CaretRightOutlined,
  TrophyOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import React from "react";
import { motion } from "framer-motion";
import box from "../images/box.png";
import styles from "./sidebarStyles.module.scss";
const Sidebar: React.FC = () => {
  return (
    <motion.div
      initial={{ x: -150, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 1.5, opacity: { ease: "easeIn", duration: 2.5 } }}
      className={styles.sidebar}
    >
      <div className={styles.menuContainer}>
        <ul>
          <li>
            <a className={styles.active}>
              <HomeOutlined className={styles.sidebarIcon} /> Home
            </a>
          </li>
          <li>
            <a>
              <CompassOutlined className={styles.sidebarIcon} />
              International
            </a>
          </li>
          <li>
            <a>
              <ProjectOutlined className={styles.sidebarIcon} /> Business
            </a>
          </li>
          <li>
            <a>
              <CaretRightOutlined className={styles.sidebarIcon} />
              Entertainment
            </a>
          </li>
          <li>
            <a>
              <TrophyOutlined className={styles.sidebarIcon} /> Sports
            </a>
          </li>
          <li>
            <a>
              <PlusOutlined className={styles.sidebarIcon} /> Health
            </a>
          </li>
        </ul>
      </div>
      <div className={styles.blueBox}>
        <div>
          News in a Box
          <span> Box is all you need</span>
          <button type="submit">Upgrade</button>
        </div>
        <img src={box} className={styles.boxImage} />
      </div>
    </motion.div>
  );
};

export default Sidebar;
