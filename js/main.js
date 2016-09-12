// Once the DOM is ready, display the company list
$(document).ready(function() {
    //views.load_companies();
    var view_options = filter_companies([-1,-1,-1], -1, -1, DEFAULT_DAY_ID);
    view("display_companies_list", view_options);
});

// After the document load event is fired, load the SVG map in the background
window.addEventListener("load", function() {
    $("#map_svg").load("/static/map.svg");
});
