const body = document.querySelector("body");

const humburger = document.querySelector(".humburger");
const humburgerLine = document.querySelectorAll(".humburger__line");
const headerNav = document.querySelector(".header__nav");
const headerItem = document.querySelectorAll(".header__nav-item");
const headerLink = document.querySelectorAll(".header__nav-link");

const planetImgMain = document.querySelectorAll(".planet__img-main");
const planetImgInternal = document.querySelectorAll(".planet__img-internal");
const planetImgSurface = document.querySelectorAll(".planet__img-surface");
const planetHeadings = document.querySelectorAll(".planet__heading");
const planetParagraphs = document.querySelectorAll(".planet__paragraph");
const planetParagraphsMain = document.querySelectorAll(
  ".planet__paragraph-overview"
);
const planetParagraphsInternal = document.querySelectorAll(
  ".planet__paragraph-internal"
);
const planetParagraphsSurface = document.querySelectorAll(
  ".planet__paragraph-surface"
);
const planetLink = document.querySelector(".planet__source-link");

const planetbtn = document.querySelectorAll(".planet__btn");

const rotationTime = document.querySelectorAll(".main__info-time");
const revolutionTime = document.querySelectorAll(".main__info-rota");
const radius = document.querySelectorAll(".main__info-radius");
const temp = document.querySelectorAll(".main__info-temp");

// FUNCTIONS TO REFACTOR MY CODE
const RemoveActiveClass = function (arr, removed) {
  arr.forEach((item) => item.classList.remove(removed));
};

// Add All classes
const AddActiveClass = function (text, i) {
  planetLink.href = `https://en.wikipedia.org/wiki/${text}`;

  planetHeadings[i].classList.add("active-heading");
  rotationTime[i].classList.add("active-time");
  revolutionTime[i].classList.add("active-time");
  radius[i].classList.add("active-time");
  temp[i].classList.add("active-time");

  planetbtn[0].classList.add("planet__btn", `active-btn-${text.toLowerCase()}`);
};

const init = function (item, i) {
  planetbtn[0].classList.add(`active-btn-${item.textContent}`);
  rotationTime[i].classList.add("active-time");
  revolutionTime[i].classList.add("active-time");
  radius[i].classList.add("active-time");
  temp[i].classList.add("active-time");
};

const paragraphShow = function (
  paragraphToShow,
  paragraphToHide1,
  paragraphToHide2,
  i
) {
  paragraphToShow[i].classList.add("active-paragraph");

  paragraphToHide1.forEach((item) => item.classList.remove("active-paragraph"));
  paragraphToHide2.forEach((item) => item.classList.remove("active-paragraph"));
};
const ImgShow = function (planetToShow, planetToHide1, planetToHide2, i) {
  planetToShow[i].classList.add("planet__show");
  planetToHide1.forEach((item) =>
    item.classList.remove("active-planet", "planet__show")
  );
  planetToHide2.forEach((item) =>
    item.classList.remove("active-planet", "planet__show")
  );
};
const planetBtnAdd = function () {
  planetbtn.forEach((item) => {
    item.removeAttribute("class");
    item.classList.add("planet__btn");
  });
};
// Mobile navigation functionality
humburger.addEventListener("click", function (e) {
  humburgerLine.forEach((line) => line.classList.toggle("active"));
  headerNav.classList.toggle("active");
  body.classList.toggle("active");
});

///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////

// Styling clicked nav element
headerNav.addEventListener("click", function (e) {
  e.preventDefault();
  // If condition is invalid, nothing happens
  if (!e.target.classList.contains("header__nav-link")) return;

  // Remove styles from every element on click

  RemoveActiveClass(headerItem, "active-link");
  RemoveActiveClass(headerLink, "active-link");

  // Add styles to clicked element
  e.target.classList.add("active-link");
  e.target.closest(".header__nav-item").classList.add("active-link");
});

///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////

// Change Planet Images
headerLink.forEach((item, i) => {
  // Initial Conditions of every thing
  if (item.classList.contains("active-link")) {
    init(item, i);
  }

  item.addEventListener("click", function (e) {
    const clickedText =
      e.target.textContent.slice(0, 1).toUpperCase() +
      e.target.textContent.slice(1);

    // Btns styles
    planetBtnAdd();

    planetbtn[0].removeAttribute("class");

    // Remove active class from every thing
    RemoveActiveClass(planetImgMain, "active-planet");
    RemoveActiveClass(planetImgMain, "planet__show");
    RemoveActiveClass(planetHeadings, "active-heading");
    RemoveActiveClass(planetParagraphsMain, "active-paragraph");
    RemoveActiveClass(planetParagraphsInternal, "active-paragraph");
    RemoveActiveClass(planetParagraphsSurface, "active-paragraph");
    RemoveActiveClass(revolutionTime, "active-time");
    RemoveActiveClass(rotationTime, "active-time");
    RemoveActiveClass(radius, "active-time");
    RemoveActiveClass(temp, "active-time");

    // Add active class to clicked elements

    paragraphShow(
      planetParagraphsMain,
      planetParagraphsInternal,
      planetParagraphsSurface,
      i
    );
    ImgShow(planetImgMain, planetImgInternal, planetImgSurface, i);
    AddActiveClass(clickedText, i);

    // Close the nav bar after click on link
    if (window.innerWidth < 450) {
      RemoveActiveClass(humburgerLine, "active");
      headerNav.classList.remove("active");
      body.classList.remove("active");
    }
  });
});

///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

planetbtn.forEach((btn, i) => {
  btn.addEventListener("click", function (e) {
    // Btns styles
    planetBtnAdd();

    headerLink.forEach((item, i) => {
      if (item.classList.contains("active-link")) {
        // Add to clicked button styles
        btn.classList.add(`active-btn-${item.textContent}`);

        // Showing the correct paragraph based on the clicked btn
        if (btn.children[1].textContent === "overview") {
          paragraphShow(
            planetParagraphsMain,
            planetParagraphsInternal,
            planetParagraphsSurface,
            i
          );
          ImgShow(planetImgMain, planetImgInternal, planetImgSurface, i);
        }
        if (btn.children[1].textContent.split(" ")[0] === "internal") {
          paragraphShow(
            planetParagraphsInternal,
            planetParagraphsMain,
            planetParagraphsSurface,
            i
          );
          ImgShow(planetImgInternal, planetImgMain, planetImgSurface, i);
        }
        if (btn.children[1].textContent.split(" ")[0] === "surface") {
          paragraphShow(
            planetParagraphsSurface,
            planetParagraphsInternal,
            planetParagraphsMain,
            i
          );
          ImgShow(planetImgSurface, planetImgInternal, planetImgMain, i);
          planetImgMain[i].classList.add("planet__show");
        }
      }
    });
  });
});
