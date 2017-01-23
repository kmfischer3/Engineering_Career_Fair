// Once the DOM is ready, display the company list
$(document).ready(function() {
    //views.load_companies();
    var degree_pack = encode_degree_input();
    var position_pack = encode_position_input();
    var authorization_pack = encode_citizenship_input();
    var view_options = filter_companies(degree_pack, position_pack, authorization_pack, DEFAULT_DAY_ID);
    view("display_companies_list", view_options);

    // attach events to buttons
    $("#search-button-mobile").click(function() {
        view('search_page', null);
    });
    $("#search-button-desktop").click(function() {
        view('search_page', null);
    });
    $("#home-button").click(function() {
        view('display_companies_list', {
            day: DEFAULT_DAY_ID,
            company_ids: filter_by_day(DEFAULT_DAY_ID)
        });
    });

    search_init();
});

window.addEventListener("load", function() {
    map.loadMaps();
});
