import React, { use } from "react";
import { Autoplay, EffectCoverflow, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import ReviewsCard from "./ReviewsCard";

const Reviews = ({ reviewsPromise }) => {
  const reviews = use(reviewsPromise);
  console.log(reviews);
  return (
    <div>
      <div className="text-center mb-3">
        <h3 className="text-3xl font-semibold">Reviews</h3>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos aut
          eligendi, molestias adipisci blanditiis accusantium neque voluptatem
          ipsum eveniet et voluptate nostrum quasi commodi beatae itaque nihil
          eum aliquam amet.
        </p>
      </div>
      <>
        <Swiper
          loop={true}
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={"3"}
          coverflowEffect={{
            rotate: 50,
            stretch: 30,
            depth: 500,
            modifier: 1,
            scale: 0.75,
            slideShadows: true,
          }}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          pagination={true}
          modules={[EffectCoverflow, Pagination, Autoplay]}
          className="mySwiper"
          breakpoints={{
            320: {
              // small phones
              slidesPerView: 1,
              spaceBetween: 20,
              coverflowEffect: {
                rotate: 30,
                stretch: 10,
                depth: 500,
                scale: 0.5,
              },
            },
            640: {
              // large phones / small tablets
              slidesPerView: 1.5,
              spaceBetween: 20,
              coverflowEffect: {
                rotate: 40,
                stretch: 20,
                depth: 300,
                scale: 0.85,
              },
            },
            768: {
              // tablets
              slidesPerView: 2,
              spaceBetween: 30,
            },
            1024: {
              // laptops
              slidesPerView: 3,
              spaceBetween: 40,
            },
            1280: {
              // big screens
              slidesPerView: 3,
              spaceBetween: 50,
            },
          }}
        >
          {reviews.map((review) => (
            <SwiperSlide key={review.id}>
              <ReviewsCard review={review}></ReviewsCard>
            </SwiperSlide>
          ))}
        </Swiper>
      </>
    </div>
  );
};

export default Reviews;
