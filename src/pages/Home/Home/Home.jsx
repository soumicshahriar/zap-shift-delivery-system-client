import React from "react";
import Banner from "../Banner/Banner";
import HowItWorks from "../HowItWorks/HowItWorks";
import Services from "../Services/Services";
import Brands from "../Brands/Brands";
import Reviews from "../Reviews/Reviews";
import TracksInfo from "../TracksInfo/TracksInfo";
import Faq from "../Faq/Faq";

const reviewsPromise = fetch("/reviews.json").then((res) => res.json());
const Home = () => {
  return (
    <div className="flex flex-col space-y-5">
      <Banner></Banner>
      <HowItWorks></HowItWorks>
      <Services></Services>
      <Brands></Brands>
      <TracksInfo></TracksInfo>
      <Reviews reviewsPromise={reviewsPromise}></Reviews>
      <Faq></Faq>
    </div>
  );
};

export default Home;
