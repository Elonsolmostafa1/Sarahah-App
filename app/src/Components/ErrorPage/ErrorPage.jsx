import React, { useEffect, useRef } from "react";
import "./ErrorPage.css";
import notFound from "../../images/404.png";
import lottie from "lottie-web"


export default function ErrorPage () {
  
  const imgContainer = useRef(null)

  useEffect(() => {
    const container = imgContainer.current;
    if (!container) return;

    const anim = lottie.loadAnimation({
      container: container,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: require('./../../images/404.json'),
    });

    return () => {
      anim.destroy();
    };
  }, []);

  return (
    <div className="text-center mx-auto w-input err-height pt-5 d-flex align-items-center justify-content-center">
      <div ref={imgContainer} className="w-100"></div>
    </div>
  );
}
