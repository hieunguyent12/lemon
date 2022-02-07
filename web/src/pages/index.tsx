import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

import { ClassListItem } from "../ui/ClassListItem";

const Home: NextPage = () => {
  return <ClassListItem isTeacher _className="Pre-cal Honors" period={7} />;
};
export default Home;
