import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Header from "./../components/Header";
import Hero from "./../components/Home/Hero";
import Services from "./../components/Home/Services";
import Working from "./../components/Home/Working";
import Download from "./../components/Home/Download";
import Footer from "./../components/Footer";
import { useEffect } from "react";
const Home = () => {
  useEffect(() => {}, []);

  return (
    <div>
      <Head>
        <title>TheNnect - Connect and Grow</title>
        <meta
          name="description"
          content="A platform to find best mentors online. Connect with them and solve your problems. You can register as mentor or mentee or both with us"
        />
        <link rel="icon" href="/logo.png" />
      </Head>

      <Header />

      <Hero />
      <Services />
      <Working />
      <Download />

      <Footer />
    </div>
  );
};

export default Home;
