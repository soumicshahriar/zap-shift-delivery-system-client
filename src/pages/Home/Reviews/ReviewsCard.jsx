import React from "react";
import { FaQuoteLeft } from "react-icons/fa";
const ReviewsCard = ({ review }) => {
  const { userName, review: testimonial, user_photoURL } = review;
  return (
    <div>
      <div className="card w-full max-w-sm bg-base-100 shadow-lg p-6 rounded-2xl border border-gray-100">
        {/* Quote Icon */}
        <div className="text-primary text-3xl mb-2">
          <FaQuoteLeft />
        </div>

        {/* Review Text */}
        <p className="text-gray-600 text-sm leading-relaxed mb-5">
          {testimonial}
        </p>

        <hr className="border-dashed mb-4" />

        {/* Profile */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary">
            <img className="rounded-full" src={user_photoURL} alt="" />
          </div>

          <div>
            <h3 className="font-semibold text-gray-800">{userName}</h3>
            <p className="text-xs text-gray-500">Senior Product Designer</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewsCard;
