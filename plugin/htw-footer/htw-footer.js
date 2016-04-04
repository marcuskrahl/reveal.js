(function () {
    "use strict";

    var slidePrefix = "Seite ";
    var name = getMetaTagValue("author");
    var title = document.title; 
    var date = (getMetaTagValue("date") !== "") ? new Date(getMetaTagValue("date")) : new Date();
    var dateString = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    dateString += ".";
    dateString += (date.getMonth() < 9 ? "0" : "") + (date.getMonth() + 1 );
    dateString += ".";
    dateString += date.getFullYear();

    function getMetaTagValue(tagName) {
        var metaElements = document.getElementsByTagName("meta");
        for (var i=0; i<metaElements.length; i++) {
            if (metaElements[i].name == tagName) {
                return metaElements[i].content;
            }
        }
        return "";
    }

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
    var footers = [];

    for(var slideNumber = 0; slideNumber < slides.length; slideNumber++) {
        var slide = slides[slideNumber];
        var footer = createFooter(slideNumber+1);
        footers.push(footer);
        slide.appendChild(footer); 
    }

    function getPresentationScale() {
        var slidesElement = document.querySelector(".slides");
        var scaleRegex = /scale\(([\d\.]+)\)/;
        var scaleResult = scaleRegex.exec(slidesElement.style.transform);
        return scaleResult === null ? 1.0 : Number.parseFloat(scaleResult[1]); 
    }

    function resizeSlides() {
        var scale = getPresentationScale();
        var windowWidth = window.innerWidth;
        var targetWidth = windowWidth * (1/scale);
        console.log(windowWidth+ " " +targetWidth);
        footers.forEach(function(footer) {
            footer.style.width = targetWidth + "px";
            footer.style.marginLeft = (-0.5 * targetWidth) + "px";
        });
    }

    function resizeSlidesAsync() {
        window.setTimeout(resizeSlides,20);
    }
    

    window.addEventListener('resize',resizeSlidesAsync);
    document.addEventListener('webkitfullscreenchange', resizeSlidesAsync);
    document.addEventListener('mozfullscreenchange', resizeSlidesAsync);
    document.addEventListener('fullscreenchange ', resizeSlidesAsync);
    document.addEventListener('MSFullscreenChange', resizeSlidesAsync);

    resizeSlidesAsync();
})()
