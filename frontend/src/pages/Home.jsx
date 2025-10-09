import React from "react";
import Header from "../components/Header/Header";
import Hero from "../components/Hero/Hero";
import Bhakti from "../components/Bhakti/Bhakti";
import ServicesSlider from "../components/Service/ServicesSlider";
import Prachar from "../components/Prachar/Prachar";
import NewsUpdates from "../components/News&Updates/News&Updates";
import FeedBacks from "../components/FeedBacks/FeedBacks"; // ✅ only one import

const Home = () => {
  return (
    <div>
      <Header />
      <Hero />
      <Bhakti />
      <ServicesSlider />
      <FeedBacks />  {/* ✅ Feedback section */}
      <Prachar />
      <NewsUpdates />
    </div>
  );
};

export default Home;
