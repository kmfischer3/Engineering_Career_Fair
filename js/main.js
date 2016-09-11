// Once the DOM is ready, display the company list
$(document).ready(function() {
    views.load_companies();
});

// After the document load event is fired, load the SVG map in the background
window.addEventListener("load", function() {
    $("#map_svg").load("/static/map.svg");
});
