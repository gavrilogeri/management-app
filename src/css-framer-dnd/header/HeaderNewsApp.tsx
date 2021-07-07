import { SearchOutlined } from "@ant-design/icons";
import React from "react";
import styles from "./headerStyles.module.scss";
import sharon from "../images/Sharon_small.png";
import sun from "../images/sun.svg";

const HeaderNewsApp = () => {
  return (
    <div className={styles.header}>
      <div className={styles.dateAndTime}>
        <img src={sharon} className={styles.profileImg} />
        <span className={styles.date}>Jun 17, 2021</span>
        <span className={styles.time}>15:00pm</span>
      </div>
      <div className={styles.welcome}>
        <img src={sun} className={styles.logo} />
        <strong>Good morning,</strong>
        &#160;Rose
      </div>
      <div className={styles.search}>
        <form action="" className={styles.form}>
          <input type="text" placeholder="Search for articles" />
          <button type="submit">
            <SearchOutlined />
          </button>
        </form>
      </div>
    </div>
  );
};
export default HeaderNewsApp;
