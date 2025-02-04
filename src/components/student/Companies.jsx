import React from "react";
import { assets } from "../../assets/assets";

const Companies = () => {
  const {
    microsoft_logo,
    walmart_logo,
    accenture_logo,
    adobe_logo,
    paypal_logo,
  } = assets;

  return (
    <div className="pt-16">
      <p className="text-base text-grap-500">Trusted by learners from</p>
      <div className="flex flex-wrap items-center justify-center gap-6 md:gap-16 md:mt-10 mt-5">
        <img
          src={microsoft_logo}
          alt="microsoft_logo"
          className="w-20 md:w-28"
        />
        <img src={walmart_logo} alt="walmart_logo" className="w-20 md:w-28" />
        <img
          src={accenture_logo}
          alt="accenture_logo"
          className="w-20 md:w-28"
        />
        <img src={adobe_logo} alt="adope_logo" className="w-20 md:w-28" />
        <img src={paypal_logo} alt="paypal_logo" className="w-20 md:w-28" />
      </div>
    </div>
  );
};

export default Companies;
