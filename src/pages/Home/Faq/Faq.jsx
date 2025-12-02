import React from "react";

const Faq = () => {
  return (
    <div className="text-center my-10 shadow p-4 ">
      <h2 className="text-secondary font-semibold text-xl">
        Frequently Asked Question (FAQ)
      </h2>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Id molestiae
        neque modi debitis molestias sunt esse reiciendis tenetur sapiente
        officiis reprehenderit iusto, nostrum velit maiores, porro dicta nemo
        repudiandae ullam.
      </p>
      <div className="collapse collapse-plus bg-base-100 border border-base-300">
        <input type="radio" name="my-accordion-3" defaultChecked />
        <div className="collapse-title font-semibold">
          How do I create an account?
        </div>
        <div className="collapse-content text-sm">
          Click the "Sign Up" button in the top right corner and follow the
          registration process.
        </div>
      </div>
      <div className="collapse collapse-plus bg-base-100 border border-base-300">
        <input type="radio" name="my-accordion-3" />
        <div className="collapse-title font-semibold">
          I forgot my password. What should I do?
        </div>
        <div className="collapse-content text-sm">
          Click on "Forgot Password" on the login page and follow the
          instructions sent to your email.
        </div>
      </div>
      <div className="collapse collapse-plus bg-base-100 border border-base-300">
        <input type="radio" name="my-accordion-3" />
        <div className="collapse-title font-semibold">
          How do I update my profile information?
        </div>
        <div className="collapse-content text-sm">
          Go to "My Account" settings and select "Edit Profile" to make changes.
        </div>
      </div>
    </div>
  );
};

export default Faq;
