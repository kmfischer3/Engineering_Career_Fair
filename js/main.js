// Once the DOM is ready, display the company list
$(document).ready(function() {
    //views.load_companies();
    var view_options = filter_companies([-1,-1,-1,-1,-1,-1], -1, -1, DEFAULT_DAY_ID);
    view("display_companies_list", view_options);

    // attach events to buttons
    $("#search-button").click(function() {
        view('search_page', null);
    });
    $("#home-button").click(function() {
        view('display_companies_list', {
            day: DEFAULT_DAY_ID,
            company_ids: filter_by_day(DEFAULT_DAY_ID)
        });
    });
});

window.addEventListener("load", function() {
    map.loadMaps();
});
