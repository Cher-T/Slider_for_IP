let images = [{
    url: "./Images/Slider_rostov-admir.png",
    title: "Rostov-on-Don, Admiral"
  }, {
    url: "./Images/Slider_sochi.png",
    title: "Sochi Thieves"
  }, {
    url: "./Images/Slider_rostov.png",
    title: "Rostov-on-Don Patriotic"
}];


function initSlider(options) {
    if (!images || !images.length) return;
    
    options = options || {
      dots: true,
      autoplay: false
    };
    
    let sliderImages = document.querySelector(".slider__images");
    let sliderArrows = document.querySelector(".slider__pointers");
    let sliderDots = document.querySelector(".slider__dots");
    let sliderTitles = document.querySelector(".slider__titles");
    
    initImages();
    initArrows();
    initTitles();

    if (options.dots) {
      initDots();
    }
    
    if (options.autoplay) {
      initAutoplay();
    }
    

    function initImages() {
      images.forEach((image, index) => {
        let imageDiv = `<div class="image n${index} ${index === 0? "active" : ""}" style="background-image:url(${images[index].url});" data-index="${index}"></div>`;
        sliderImages.innerHTML += imageDiv;
        let dot = `<div class="slider__dots-item n${index} ${index === 0? "active" : ""}" data-index="${index}"></div>`;
        sliderDots.innerHTML += dot;
        let title = `<div class="slider__titles-item n${index} ${index === 0? "active" : ""}" data-index="${index}">${image.title}</div>`;
        sliderTitles.innerHTML += title;
      });    
      
    }
    

    function initArrows() {
      sliderArrows.querySelectorAll(".slider__arrow").forEach(arrow => {
        arrow.addEventListener("click", function() {
          let curNumber = +sliderImages.querySelector(".active").dataset.index;
          let nextNumber;
          if (arrow.classList.contains("left")) {
            nextNumber = curNumber === 0? images.length - 1 : curNumber - 1;
          } else {
            nextNumber = curNumber === images.length - 1? 0 : curNumber + 1;
          }
          moveSlider(nextNumber);
        });
      });
    }
  
    
    function initDots() {

      sliderDots.querySelectorAll(".slider__dots-item").forEach(dot => {
        dot.addEventListener("click", function() {
          moveSlider(this.dataset.index);
        })
      })
    }
    

    function initTitles() {
      sliderTitles.querySelectorAll(".slider__titles-item").forEach(title => {
        title.addEventListener("click", function() {
          moveSlider(this.dataset.index);
        })
      })
    }
    

    function moveSlider(num) {
      sliderImages.querySelector(".active").classList.remove("active");
      sliderImages.querySelector(".n" + num).classList.add("active");
      if (options.dots) {
        sliderDots.querySelector(".active").classList.remove("active");
        sliderDots.querySelector(".n" + num).classList.add("active");
      }
      sliderTitles.querySelector(".active").classList.remove("active");
      sliderTitles.querySelector(".n" + num).classList.add("active");
    }
    

    function initAutoplay() {
      setInterval(() => {
        let curNumber = +sliderImages.querySelector(".active").dataset.index;
        let nextNumber = curNumber === images.length - 1? 0 : curNumber + 1;
        moveSlider(nextNumber);
      }, options.autoplayInterval);
    }
    }
    

    let sliderOptions = {
    dots: true,
    autoplay: true,
    autoplayInterval: 6666
    };
    

    document.addEventListener("DOMContentLoaded", function() {
    initSlider(sliderOptions);
    });