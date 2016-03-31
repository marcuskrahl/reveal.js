(function () {
    "use strict";

    var slidePrefix = "Seite ";
    var name = "Max Mustermann";
    var title = "Eine Demopräsentation";
    var date = (typeof fixedDate === "object" && fixedDate instanceof Date) ? fixedDate : new Date();
    var dateString = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    dateString += ".";
    dateString += (date.getMonth() < 9 ? "0" : "") + (date.getMonth() + 1 );
    dateString += ".";
    dateString += date.getFullYear();


    function createFooter(slideNumber) {
        var footerElement = document.createElement("footer");

        var nameElement = document.createElement("div");
        nameElement.textContent = name;
        nameElement.classList.add("footer-name");
        footerElement.appendChild(nameElement);

        var titleElement = document.createElement("div");
        titleElement.textContent = title;
        titleElement.classList.add("footer-title");
        footerElement.appendChild(titleElement);

        var slideNumberElement = document.createElement("div");
        slideNumberElement.textContent  = slidePrefix + slideNumber;
        slideNumberElement.classList.add("footer-slide-number");
        footerElement.appendChild(slideNumberElement);

        var dateElement = document.createElement("div");
        dateElement.textContent = dateString;
        dateElement.classList.add("footer-date");
        footerElement.appendChild(dateElement);

        return footerElement;
    }

    var slides = document.querySelectorAll('.slides > section');

    for(var slideNumber = 0; slideNumber < slides.length; slideNumber++) {
        var slide = slides[slideNumber];
        slide.appendChild(createFooter(slideNumber+1)); 
    }

})()
