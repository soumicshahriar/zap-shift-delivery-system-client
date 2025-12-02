import React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

const AboutUs = () => {
  return (
    <div className="my-12 px-4 md:px-10 max-w-5xl mx-auto">
      {/* Heading */}
      <div className="mb-6">
        <h2 className="font-bold text-2xl md:text-3xl mb-3 text-secondary">
          About Us
        </h2>
        <p className="text-gray-700 text-sm md:text-base leading-relaxed">
          Enjoy fast, reliable parcel delivery with real-time tracking and zero
          hassle. From personal packages to business shipments — we deliver on
          time, every time.
        </p>
      </div>

      {/* Tabs */}
      <div className="bg-white shadow-md p-5 rounded-xl border">
        <Tabs>
          {/* Tab List */}
          <TabList className="react-tabs__tab-list flex flex-wrap gap-2 md:gap-4 border-b pb-2">
            <Tab className="react-tabs__tab !px-4 !py-2 rounded-lg border hover:bg-secondary hover:text-white transition-all cursor-pointer">
              Story
            </Tab>
            <Tab className="react-tabs__tab !px-4 !py-2 rounded-lg border hover:bg-secondary hover:text-white transition-all cursor-pointer">
              Mission
            </Tab>
            <Tab className="react-tabs__tab !px-4 !py-2 rounded-lg border hover:bg-secondary hover:text-white transition-all cursor-pointer">
              Success
            </Tab>
            <Tab className="react-tabs__tab !px-4 !py-2 rounded-lg border hover:bg-secondary hover:text-white transition-all cursor-pointer">
              Team & Others
            </Tab>
          </TabList>

          {/* Story */}
          <TabPanel>
            <div className="mt-6 space-y-3 animate-fadeIn">
              <h3 className="text-lg md:text-xl font-semibold text-secondary">
                Our Story
              </h3>
              <p className="text-gray-700 leading-relaxed">
                We started with a simple mission — to make parcel delivery
                smarter and stress-free. What began as a small initiative has
                now grown into one of the most reliable delivery networks,
                connecting people across all 64 districts of Bangladesh.
              </p>
            </div>
          </TabPanel>

          {/* Mission */}
          <TabPanel>
            <div className="mt-6 space-y-3 animate-fadeIn">
              <h3 className="text-lg md:text-xl font-semibold text-secondary">
                Our Mission
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Our mission is simple: Deliver trust. We aim to provide fast,
                secure, and transparent delivery services — ensuring your
                parcels reach their destination with complete peace of mind.
              </p>
            </div>
          </TabPanel>

          {/* Success */}
          <TabPanel>
            <div className="mt-6 space-y-3 animate-fadeIn">
              <h3 className="text-lg md:text-xl font-semibold text-secondary">
                Our Success
              </h3>
              <p className="text-gray-700 leading-relaxed">
                With thousands of successful deliveries every month, we have
                proven our efficiency and reliability. Our customer satisfaction
                rate continues to grow, making us a trusted delivery partner for
                individuals and businesses alike.
              </p>
            </div>
          </TabPanel>

          {/* Team */}
          <TabPanel>
            <div className="mt-6 space-y-3 animate-fadeIn">
              <h3 className="text-lg md:text-xl font-semibold text-secondary">
                Our Team & Values
              </h3>
              <p className="text-gray-700 leading-relaxed">
                We are powered by a passionate team of delivery heroes,
                customer-support specialists, and logistics experts who work
                tirelessly to ensure a smooth experience. Our values revolve
                around honesty, responsibility, and service excellence.
              </p>
            </div>
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
};

export default AboutUs;
