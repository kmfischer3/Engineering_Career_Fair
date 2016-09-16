// Once the DOM is ready, display the company list
$(document).ready(function() {
    //views.load_companies();
    var view_options = filter_companies([-1,-1,-1,-1,-1,-1], -1, -1, DEFAULT_DAY_ID);
    view("display_companies_list", view_options);
    
    // attach events to buttons
    $("#search-button-mobile").click(function() {
        view('search_page', null);
    });
    $("#search-button-desktop").click(function() {
        view('search_page', null);
    });
});

window.addEventListener("load", function() {
    map.loadMaps();
});
