/*jslint browser:true*/
/*global
alert, confirm, console, prompt
*/
/* CACHING THE DOM */
var DETAIL_IMAGE_SELECTOR = '[data-image-role="target"]';
var DETAIL_TITLE_SELECTOR = '[data-image-role="title"]';
var DETAIL_FRAME_SELECTOR = '[data-image-role="frame"]';
var THUMBNAIL_LINK_SELECTOR = '[data-image-role="trigger"]';
var DETAIL_IMAGE_BUTTON_PREV = '[data-image-role="prev"]';
var DETAIL_IMAGE_BUTTON_NEXT = '[data-image-role="next"]';
var HIDDEN_DETAIL_CLASS = 'hidden-detail';
var TINY_EFFECT_CLASS = 'is-tiny';
var ESC_KEY = 27;

/*declaring function to set the details for our thumbnails*/
function setDetails(imageUrl, titleText) {
    'use strict';

    var detailImage = document.querySelector(DETAIL_IMAGE_SELECTOR);
    detailImage.setAttribute('src', imageUrl);

    var detailTitle = document.querySelector(DETAIL_TITLE_SELECTOR);
    detailTitle.textContent = titleText;
}

function imageFromThumb(thumbnail) {
    'use strict';

    return thumbnail.getAttribute('data-image-url'); //return url for thumbnail image
}

function titleFromThumb(thumbnail) {
    'use strict';

    return thumbnail.getAttribute('data-image-title'); //return url for thumbnail image
}

function setDetailsFromThumb(thumbnail) {
    'use strict';
    setDetails(imageFromThumb(thumbnail), titleFromThumb(thumbnail));
}

function getThumbnailsArray() {
    'use strict';

    var thumbnails = document.querySelectorAll(THUMBNAIL_LINK_SELECTOR);
    var thumbnailArray = [].slice.call(thumbnails);

    return thumbnailArray;
}

function hideDetails() {
    'use strict';

    document.body.classList.add(HIDDEN_DETAIL_CLASS);
}

function showDetails() {
    'use strict';

    var frame = document.querySelector(DETAIL_FRAME_SELECTOR);

    document.body.classList.remove(HIDDEN_DETAIL_CLASS);
    frame.classList.add(TINY_EFFECT_CLASS);
    frame.classList.remove(TINY_EFFECT_CLASS);

    setTimeout(function () {
        frame.classList.remove(TINY_EFFECT_CLASS);
    }, 50);
}

// function that listens for a click even on a thumbnail
function addThumbClickHandler(thumb) {
    'use strict';

    thumb.addEventListener('click', function (event) {
        event.preventDefault();
        setDetailsFromThumb(thumb);
        showDetails();
    });
}

//function that listens for a click on the prev/next arrows 
function addArrowClickHandler() {
    'use strict';

    var i;
    var current = document.querySelector(DETAIL_IMAGE_SELECTOR);
    var slide = getThumbnailsArray(); //initializing array

    for (i = 0; i < slide.length; i += 1) {
        //comparing that the current image and the array are the same
        if (current.getAttribute('src') === imageFromThumb(slide[i])) {
            setDetailsFromThumb(slide[i + 1]); //makes sure that the next image is read
            showDetails();

            break;
        }
    }
}

//function that logs the keys you press to he console
function addKeyPressHandler() {
    'use strict';

    document.body.addEventListener('keyup', function (event) {
        event.preventDefault();
        console.log(event.keycode); //logging the keycode to the console

        if (event.keycode === ESC_KEY) { 
            hideDetails();
        }
    });
}

//function that gets the thumbnail that's been clicked
function initializeEvents() {
    'use strict';

    var thumbnails = getThumbnailsArray();
    thumbnails.forEach(addThumbClickHandler);

    var prevButton = document.querySelector(DETAIL_IMAGE_BUTTON_PREV);
    var nextButton = document.querySelector(DETAIL_IMAGE_BUTTON_NEXT);

    //prev button
    prevButton.addEventListener('click', function (event) {
        event.preventDefault();
        addArrowClickHandler();
    });

    //next button
    nextButton.addEventListener('click', function (event) {
        event.preventDefault();
        addArrowClickHandler();
    });

    addKeyPressHandler();
}

//calling the functions
initializeEvents();
