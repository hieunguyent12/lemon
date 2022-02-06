import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

import { ListItem } from "../ui/ListItem";

const Home: NextPage = () => {
  return <ListItem isTeacher _className="Pre-cal Honors" period={7} />;
};
export default Home;
