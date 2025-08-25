import React from "react";
import "swiper/css";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';


const Categories = () => {
  const categories = [
    { name: "Fresh Fruit", image: "img/categories/cat-1.jpg" },
    { name: "Dried Fruit", image: "img/categories/cat-2.jpg" },
    { name: "Vegetables", image: "img/categories/cat-3.jpg" },
    { name: "Fruit Drinks", image: "img/categories/cat-4.jpg" },
    { name: "Raw Non-veg", image: "img/categories/cat-5.jpg" },
  ];

  return (
    <section>
      <div className="container">
        <Swiper
          modules={[Navigation, Autoplay]}
          navigation
          autoplay={{ delay: 1500, disableOnInteraction: false }}
          spaceBetween={20}
          slidesPerView={4}
          loop={true}
          breakpoints={{
            320: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
          }}
        >
          {categories.map((cat, index) => (
            <SwiperSlide key={index}>
              <div
                className="categories__item"
                style={{
                  backgroundImage: `url(${cat.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  height: "200px",
                  display: "flex",
                  alignItems: "flex-end",
                  padding: "15px",
                  color: "#fff",
                }}
              >
                <h5>
                  <a href="#" style={{ textDecoration: "none" }}>
                    {cat.name}
                  </a>
                </h5>
              </div>
            </SwiperSlide>
          ))}


          
        </Swiper>
      </div>
    </section>
  );
};

export default Categories;
