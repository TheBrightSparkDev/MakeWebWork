/* Optimized Scroll Animation Script */

const debugimgscroll = true; // Set to false in production
if (debugimgscroll) console.log("Connected img scroll");

let screenHeight = window.innerHeight;
let screenWidth = window.innerWidth;
const waitPeriodMs = 30;
const propslist = ["start", "end", "startpos", "endpos"];
const elementList = document.querySelectorAll(".custom-scroll");
let currentPage = [];
let currScrollPos = window.scrollY;
let resizing = false;
let lastWidth = window.innerWidth;
let lastHeight = window.innerHeight;
let suppressNextResize = false;
let isFullscreen = false;

window.addEventListener("load", () => {
  InitialiseImgScroll();
  DontReload = CheckForSelectionJSOrJourneyJS();
});

function CheckForSelectionJSOrJourneyJS() {
  const headId = document.head.getAttribute("id");
  if (headId === "SelectionJS" || headId === "journeyJS") {
    if (debugimgscroll) console.log("Detected: " + headId);
    return true;
  }
  if (debugimgscroll) console.log("No SelectionJS or JourneyJS Detected");
  return false;
}

function InitialiseImgScroll() {
  screenHeight = window.innerHeight;
  screenWidth = window.innerWidth;
  if (debugimgscroll) testHTMLElements();
  createObjects();
  if (debugimgscroll) checkObjects();
  activateCurrent();
}

function testHTMLElements() {
  elementList.forEach((element) => {
    if (!element.id) console.log("Element is missing an ID.");
    const props = element.getAttribute("animationprops");
    if (!props) {
      console.log("Element missing animationprops attribute.");
      console.log("Format: start,end,direction,startpos,endpos");
    }
  });
}

function checkObjects() {
  currentPage.forEach((el) => {
    for (const prop in el) {
      if (`${el[prop]}` === "help") {
        console.log(`Help requested for property: ${prop} on element ID: ${el.id}`);
        console.log("Ensure correct format: start,end,startpos,endpos,direction");
      }
    }
    if (typeof el.start !== "number" || typeof el.end !== "number" || typeof el.startpos !== "number" || typeof el.endpos !== "number") {
      console.warn(`Non-numeric values found in element ID: ${el.id}`);
    }
    if (!(el.direction === "top" || el.direction === "bottom" || el.direction === "left" || el.direction === "right")) {
      console.warn(`Invalid direction in element ID: ${el.id}`);
    }
    if (el.start === el.end) console.warn(`Element ID ${el.id} has identical start and end scroll values.`);
    if (el.startpos === el.endpos) console.warn(`Element ID ${el.id} has identical startpos and endpos values.`);
  });
}

function safeEval(expression, baseValue) {
  try {
    return Function("\"use strict\"; return (" + baseValue + expression + ")")();
  } catch {
    return baseValue;
  }
}

function createObjects() {
  elementList.forEach((element) => {
    const el = { id: element.id, width: element.offsetWidth / 2 };
    let props = element.getAttribute("animationprops");
    propslist.forEach((prop) => {
      let slice = props.indexOf(",");
      let value = props.slice(0, slice);
      let invert = value.includes("-");

      if (value.toLowerCase().includes("screenheight")) {
        const expr = value.substring(value.indexOf("t") + 1);
        value = safeEval(expr, screenHeight);
      } else if (value.toLowerCase().includes("screenwidth")) {
        const expr = value.substring(value.indexOf("h") + 1);
        value = safeEval(expr, screenWidth);
      }

      el[prop] = invert ? -Math.abs(Number(value)) : Number(value);
      props = props.substring(slice + 1);
    });
    el.direction = props;

    if (el.direction === "left" || el.direction === "right") {
      el.endpos -= el.width;
    }
    if (el.direction === "up" || el.direction === "down") {
      el.direction = "top";
    }
    currentPage.push(el);
  });
  if (debugimgscroll) console.log(currentPage);
}

function activateCurrent() {
  const domCache = {};
  currentPage.forEach((element) => {
    const el = document.getElementById(element.id);
    domCache[element.id] = el;
    const posFromTop = el.offsetTop;
    element.begin = resizing ? element.begin : posFromTop - screenHeight + element.start;
    const distance = Math.abs(element.startpos - element.endpos);
    const duration = Math.abs(element.end - element.start);
    element.finish = element.begin + duration;
    element.multiplyer = distance / duration;

    const jEl = $(el);
    if (element.direction === "top" || element.direction === "bottom") {
      element.direction = "margin-" + element.direction;
    } else {
      const parent = el.parentElement;
      parent.classList.add("animation");
      parent.style.height = el.clientHeight + "px";
      jEl.css("position", "absolute");
    }
    jEl.css(element.direction, "0");
  });
  updateAll(currScrollPos);
}

function updateAll(scrollPos) {
  const domCache = {};
  currentPage.forEach((e) => domCache[e.id] = $("#" + e.id));
  let offset = 0;

  currentPage.forEach((element) => {
    const el = domCache[element.id];
    let val;
    const scrollPosition = scrollPos - offset;

    if (scrollPosition < element.begin) {
      el.css(element.direction, element.startpos);
      val = element.startpos;
    } else if (scrollPosition > element.finish) {
      el.css(element.direction, element.endpos);
      val = element.endpos;
    } else {
      const dist = (scrollPosition - element.begin) * element.multiplyer;
      const current = element.startpos - dist;
      const target = element.endpos;
      el.css(element.direction, target < current ? current : target);
      val = target < current ? current : target;
    }

    if (element.direction === "margin-top" || element.direction === "margin-bottom") {
      offset = val;
    }
  });
}

window.addEventListener("scroll", () => {
  currScrollPos = window.scrollY;
  if (!ticking) {
    requestAnimationFrame(() => {
      updateAll(currScrollPos);
      ticking = false;
    });
    ticking = true;
  }
});

let ticking = false;

function setFullscreenState(state) {
  isFullscreen = state;
  suppressNextResize = true;
  setTimeout(() => suppressNextResize = false, 500);
}

document.addEventListener("fullscreenchange", () => setFullscreenState(!!document.fullscreenElement));
document.addEventListener("webkitfullscreenchange", () => setFullscreenState(!!document.webkitFullscreenElement));
document.addEventListener("mozfullscreenchange", () => setFullscreenState(!!document.mozFullScreenElement));
document.addEventListener("msfullscreenchange", () => setFullscreenState(!!document.msFullscreenElement));

let resizeTimeout;
window.addEventListener("resize", () => {
  resizing = true;
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    const widthChanged = window.innerWidth !== lastWidth;
    const heightChanged = window.innerHeight !== lastHeight;

    if (!suppressNextResize && (widthChanged || heightChanged) && !window.DontReload) {
      location.reload();
    }

    lastWidth = window.innerWidth;
    lastHeight = window.innerHeight;
    resizing = false;
  }, 300);
});
