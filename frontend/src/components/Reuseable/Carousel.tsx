import { useState, useRef, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";

const sliderContainerStyle = {
  height: "90%",
  position: "relative",
};
const sliderStyle = {
  width: "100%",
  height: "100%",
  borderRadius: "10px",
  backgroundPosition: "center",
  backgroundSize: "cover",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "flex-end",
};
const dotContainerStyles = {
  display: "flex",
  justifyContent: "center",
  color: "black",
};
const slidesContainerStyles = {
  display: "flex",
  height: "100%",
  borderRadius: "10px",
  transition: "transform ease-out 0.7s",
};
const slidesContainerStylesOverflowHidden = {
  overflow: "hidden",
  height: "100%",
  borderRadius: "10px",
};

export default function Carousel({ slides, parentWidth }) {
  const timeRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  // updatedSlides add a extra property [isCheckedColor]
  // updatedSlide will only return if the product is in stock
  const [updatedSlides, setUpdatedSlides] = useState(
    slides
      .map((slide) => {
        return (
          slide.countInStock !== 0 && {
            ...slide,
            isCheckedColor: false, // to fill first dot when page loads
          }
        );
      })
      // if product is not in stock it will return a false value in array
      // so to skip the false value
      // we filter and only return the truthy value
      .filter((slide) => {
        return slide && slide;
      })
  );
  //? condition that will only mark the first dot when page loads
  //  else it won't be filled
  if (
    updatedSlides[0].isCheckedColor === false &&
    updatedSlides[1].isCheckedColor !== true &&
    updatedSlides[2].isCheckedColor !== true
  ) {
    updatedSlides[0].isCheckedColor = true;
  }

  const ChangeDotColorAutomatically = (newIndex) => {
    // Automatically Change Dot Color
    // If the AutomaticIndex [newIndex] === Dot Index
    // Dot will change color [ if isCheckedColor === true ]
    setUpdatedSlides((prevUpdatedSlides) =>
      prevUpdatedSlides.map((slide, index) => {
        return index === newIndex
          ? { ...slide, isCheckedColor: true }
          : { ...slide, isCheckedColor: false };
      })
    );
  };

  const ChangeDotColorManually = (id) => {
    // Change Dot Color when user clicks
    // If functionId  === Dot Id
    // Dot will change color [ if isCheckedColor === true ]
    setUpdatedSlides((prevUpdatedSlides) =>
      prevUpdatedSlides.map((slide) => {
        return slide._id === id
          ? { ...slide, isCheckedColor: true }
          : { ...slide, isCheckedColor: false };
      })
    );
  };

  const previousArrowHeadHandler = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide
      ? updatedSlides?.length - 1
      : currentIndex - 1;
    setCurrentIndex(newIndex);
    ChangeDotColorAutomatically(newIndex);
  };

  const nextArrowHeadHandler = useCallback(() => {
    const isLastSlide = currentIndex === updatedSlides?.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
    ChangeDotColorAutomatically(newIndex);
  }, [currentIndex, updatedSlides]);

  const dotHandler = (dotIndex, id) => {
    setCurrentIndex(dotIndex);
    ChangeDotColorManually(id);
  };

  // To Change Image With Index
  // Using the Data Array
  const getSlideStylesWidthBackground = (slideIndex) => {
    return {
      ...sliderStyle,
      // updatedSlides[0].img => an image
      backgroundImage: `url('${updatedSlides[slideIndex]?.img}')`,
      width: `${parentWidth}px`,
    };
  };

  // Transform [Animation]
  const getSlidesContainerStylesWithWidth = () => {
    return {
      ...slidesContainerStyles,
      width: parentWidth * updatedSlides?.length,
      transform: `translateX(${-(currentIndex * parentWidth)}px)`,
    };
  };

  // Automatically Change Image After 'x' second
  useEffect(() => {
    if (timeRef.current) {
      clearTimeout(timeRef.current);
    }
    timeRef.current = setTimeout(() => {
      nextArrowHeadHandler();
    }, 3100);
    return () => clearTimeout(timeRef.current);
  }, [nextArrowHeadHandler]);

  // console.log(updatedSlides);
  return (
    <div style={sliderContainerStyle}>
      {/* Arrows*/}
      <div className="leftArrowStyle" onClick={previousArrowHeadHandler}>
        &#11160;
      </div>
      <div className="rightArrowStyle" onClick={nextArrowHeadHandler}>
        &#11162;
      </div>

      {/* Animation */}
      <div style={slidesContainerStylesOverflowHidden}>
        <div style={getSlidesContainerStylesWithWidth()}>
          {updatedSlides?.map((slide, slideIndex) => {
            return (
              slide && (
                <div key={slideIndex}>
                  <Link to={`/products/${slide?._id}`}>
                    <div style={getSlideStylesWidthBackground(slideIndex)}>
                      <div className="slideName">{slide?.name}</div>
                    </div>
                  </Link>
                </div>
              )
            );
          })}
        </div>
      </div>
      {/*Dot */}
      <div style={dotContainerStyles}>
        {updatedSlides?.map((slide, index) => {
          return (
            slide && (
              <div
                style={{
                  color: slide?.isCheckedColor ? "rgb(19, 212, 19)" : "black",
                  margin: "8px",
                  cursor: "pointer",
                }}
                key={index}
                onClick={() => dotHandler(index, slide._id)}
              >
                &#11044;
              </div>
            )
          );
        })}
      </div>
    </div>
  );
}
