import React, { useEffect } from "react";
import "../index.css";

const MouseTrail = () => {
  useEffect(() => {
    const coords = { x: 0, y: 0 };
    const circles = document.querySelectorAll(".circle");
    const cursor = document.querySelector(".cursor");

    // Initialize circle positions
    circles.forEach(function (circle) {
      circle.x = 0;
      circle.y = 0;
    });

    // Update mouse position coordinates
    const handleMouseMove = (e) => {
      coords.x = e.clientX;
      coords.y = e.clientY;
    };

    window.addEventListener("mousemove", handleMouseMove);

    function animateCircles() {
      let x = coords.x;
      let y = coords.y;

    
      const circleRadius = 10; 
      const offsetX = circleRadius; 
      const offsetY = circleRadius; 

      // Update the cursor position
      if (cursor) {
        cursor.style.top = `${y - offsetY}px`; 
        cursor.style.left = `${x - offsetX}px`; 
      }

      circles.forEach(function (circle, index) {
        const nextCircle = circles[index + 1] || circles[0];

        // Calculate distance to the next circle (to create the trail effect)
        const distanceX = nextCircle.x - x;
        const distanceY = nextCircle.y - y;

        // Apply a trailing effect by easing the circle's movement
        x += distanceX * 0.3;
        y += distanceY * 0.3;

        // Update the circle's position
        circle.style.left = `${x - offsetX}px`; // Adjust by full radius
        circle.style.top = `${y - offsetY}px`; // Adjust by full radius
        circle.style.transform = `scale(${(circles.length - index) / circles.length})`;

        // Update the circle's position for the next frame
        circle.x = x;
        circle.y = y;
      });

      requestAnimationFrame(animateCircles);
    }

    animateCircles();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="cursor">
      {[...Array(20)].map((_, index) => (
        <div key={index} className="circle"></div>
      ))}
    </div>
  );
};

export default MouseTrail;

