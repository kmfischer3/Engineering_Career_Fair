/*
 * Change the view. This function will also add data to the browser's
 * history stack allowing the back button to function.
 */
function view(view_name, data) {
    history_state = {view: view_name, data: data};
    console.log("pushing history state:");
    console.log(history_state);
    history.pushState(history_state, "");

    views[view_name](data);
    $(window).scrollTop(0);
}

/*
 * Register a function to handle the history popstate event, which
 * is triggered when the back button is pressed.
 */
window.addEventListener("popstate", function(event) {
    console.log(event);
    if (event.state === null) {
        console.log("popstate received a null state object");
        return;
    }
    views[event.state.view](event.state.data);
});

/*
 * Set the initial view to be the company display.
 */
window.addEventListener("load", function() {
    var view_options = filter_companies([-1,-1,-1], -1, -1, DEFAULT_DAY_ID);
    history_state = {view: "display_companies_list", data: view_options};
    history.replaceState(history_state, "");
});
