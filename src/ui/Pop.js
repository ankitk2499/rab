import React from "react";
import "../components/css/Pop.css";

function Pop() {
  var clickableDivs = document.querySelectorAll(".clickable-div");
  var popup = document.getElementById("popup");

  clickableDivs.forEach(function (clickableDiv) {
    clickableDiv.addEventListener("click", function () {
      var rect = clickableDiv.getBoundingClientRect();
      popup.style.top = rect.bottom - 10 + "px";
      popup.style.left = rect.left + 150 + "px";
      popup.style.display = "block";
    });
  });

  popup.addEventListener("click", function (e) {
    if (e.target === popup || e.target.closest(".close-btn")) {
      popup.style.display = "none";
    }
  });

  return (
    <>
      <div className="clickable-div">Click me to open popup 1</div>
      <div className="clickable-div">Click me to open popup 2</div>
      <div id="popup" className="popup">
        <p>Popup content goes here</p>
      </div>
    </>
  );
}

export default Pop;
