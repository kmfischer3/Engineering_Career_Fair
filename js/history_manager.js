/*
 * Change the view. This function will also add data to the browser's
 * history stack allowing the back button to function.
 */
function view(view_name, data) {
    history_state = {view: view_name, data: data};
    history.pushState(history_state, "", "#");
    
    views[view_name](data);
}

/*
 * Register a function to handle the history popstate event, which
 * is triggered when the back button is pressed.
 */
window.onpopstate = function(event) {
    console.log(event);
    views[event.state.view](event.state.data);
};

/*
 * Set the initial view to be the company display.
 */
window.addEventListener("load", function() {
    history_state = {view: "load_companies", data: null};
    history.replaceState(history_state, "", "#");
});

