import React from "react";
import { BackGroundBeamBG } from "./BackGroundBeamBG";

/**
 * Homepage component renders the main landing page of the application.
 * It currently includes the BackGroundBeamBG component which provides
 * a background effect for the page.
 */
function Homepage() {
  return (
    <div className="relative h-screen overflow-hidden">
      {/* Background effect */}
      <BackGroundBeamBG />
      
      {/* Additional content can be added here */}
      <div className="relative z-10 flex items-center justify-center">
        {/* Example content */}
        <h1 className="text-4xl font-bold text-white">
          Welcome to Our Website
        </h1>
      </div>
    </div>
  );
}

export default Homepage;
