console.log("Animation functions loaded")

function firstTimeLoad() {
    initializeServiceLinks();
}

function onResizeFunctions(){
    calculateTextSize();
}
// Adjust nav-links when the document loads
document.addEventListener('DOMContentLoaded', firstTimeLoad);

// Adjust nav-links whenever the window is resized
window.addEventListener('resize', onResizeFunctions);

// the service links on the what we offer page

function calculateTextSize() {

    // this calculates text and rotation required 
    const bottomLayers = document.querySelectorAll(".bottom-layer");

    bottomLayers.forEach(element => {
        const height = element.clientHeight; // Get the height of the element
        const trapeziumText = element.querySelector(".trapezium-text");

        // Get the amount of characters in trapezium text
        const charCount = trapeziumText.textContent.length;

        let fontSize;
        let marginLeft;
        let multiplyer = 2

        // Switch case to adjust font size and padding based on character count
        switch (true) {
            case (charCount <= 25):
                fontSize = 39; // Largest font size
                break;
            case (charCount <= 30):
                fontSize = 34;
                break;
            case (charCount <= 35):
                fontSize = 28;
                break;
            case (charCount <= 45):
                fontSize = 21;
                multiplyer = 4;
                break;
            default:
                fontSize = 19; // Smallest font size for longer text
                multiplyer = 6;
                break;
        }
        marginLeft = - (fontSize / multiplyer)
        // Apply the calculated font size and padding-left
        trapeziumText.style.fontSize = `${fontSize}px`;
        trapeziumText.style.marginLeft = `${marginLeft}px`;

        let clientWidth = document.documentElement.clientWidth;
        
        let degrees = getRotation(clientWidth);

        trapeziumText.style.transform = `rotate(${-degrees}deg)`;

        const computedStyle = getComputedStyle(trapeziumText);
        let trapeziumTextWidth = parseFloat(computedStyle.width);
        let paddingleft = (height / 2) - (trapeziumTextWidth / 2) + (clientWidth / 27 ) - 10
        trapeziumText.style.paddingLeft = paddingleft + "px"
    });
}

function getRotation(screenWidth) {
    const m = -0.015625;  // Slope
    const b = 89.0625;    // Intercept


    // Calculate rotation based on the screen width
    const rotation = m * screenWidth + b;

    return rotation;
}


function initializeServiceLinks() {
    const imageContent = document.querySelectorAll(".image-content");
    // mouseover
    imageContent.forEach(image => {
        image.addEventListener("mouseenter", function() {
            let trapeziums = image.querySelectorAll(".trapezium");
            // Slide all trapeziums to the right (left: 0%)
            trapeziums.forEach(trapezium => {
                trapezium.style.left = "0%";
                // Find the child node with the class 'dissappearing-text' and add 'show-text'
                const dissappearingText = trapezium.querySelector(".dissappearing-text");
                if (dissappearingText) {
                    dissappearingText.style.transition = "opacity 0.5s ease-in-out"; // Add transition for opacity
                    dissappearingText.style.opacity = "1"; // Fade in
                }
            });
        });
    });
    // mouseleave 
    imageContent.forEach(image => {
        image.addEventListener("mouseleave", function () {
            let trapeziums = image.querySelectorAll(".trapezium");
            // Reset trapeziums to their initial positions
            trapeziums.forEach(trapezium => {
                if (trapezium.classList.contains("bottom-layer")) {
                    trapezium.style.left = "-55%";
                } else if (trapezium.classList.contains("middle-layer")) {
                    trapezium.style.left = "-60%";
                } else if (trapezium.classList.contains("top-layer")) {
                    trapezium.style.left = "-62%";
                }

                // Find the child node with the class 'dissappearing-text' and remove 'show-text'
                const dissappearingText = trapezium.querySelector(".dissappearing-text");
                if (dissappearingText) {
                    dissappearingText.style.transition = "opacity 0.5s ease-in-out"; // Add transition for opacity
                    dissappearingText.style.opacity = "0"; // Fade out
                }
            });
        });
    });
    calculateTextSize();
}
