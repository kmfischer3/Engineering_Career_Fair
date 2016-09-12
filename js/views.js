var views = {
    load_company_profile: function(company_id) {
        company = data[company_id];

        // display the company name in the jumbotron div
        $("#company_profile_name").html('<h1>' + company.name + '</h1>');

        // create day_company_booth list with buttons to trigger the map view with the corresponding booth highlighted
        function create_link(table_id, day_text) {
            return $("<a/>", {
                href: "#",
                class: "list-group-item"})
                .click(table_id, function(e) {
                    view("view_map_highlight_table", e.data);
                })
                .html('<span class="glyphicon glyphicon-map-marker" aria-hidden="true"></span>' +
                      day_text +
                      '<span class="glyphicon glyphicon-menu-right pull-right"></span>');
        }

        $("#company_profile_day_list").empty();
        if (company.tables[0] != null) {
            create_link(company.tables[0], "Monday, Sept. 19th")
                .appendTo("#company_profile_day_list");
        }
        if (company.tables[1] != null) {
            create_link(company.tables[0], "Wednesday, Sept. 21st")
                .appendTo("#company_profile_day_list");
        }
        if (company.tables[2] != null) {
            create_link(company.tables[0], "Wednesday, Sept. 28th")
                .appendTo("#company_profile_day_list");
        }

        // construct degree-position table
        // if the company's degree_mask_# has anything other than '0000' for a given major, add that major to the table
        // then, use (degree_mask & position_mask) to place the checkmark in the appropriate column
        var table_body = '<tbody>';


        /* POPULATE DEGREE MASK 1 ROWS*/
        for (var d_key in degree_mask_1_array) {

            if ( ( company.degree_mask_1 & degree_mask_1_array[d_key] ) != 0 ) {

                table_body += '<tr><th scope="row">' + d_key + '</th>';

                for (var p_key in position_mask_array) {

                    if ( ( company.degree_mask_1 & degree_mask_1_array[d_key] & position_mask_array[p_key] ) != 0 ) {
                        table_body += '<td><span class="glyphicon glyphicon-ok"></span></td>';
                    } else {
                        table_body += '<td></td>';
                    }

                }

                table_body += '</tr>';
            }
        }

        /* POPULATE DEGREE MASK 2 ROWS*/
        for (var d_key in degree_mask_2_array) {

            if ( ( company.degree_mask_2 & degree_mask_2_array[d_key] ) != 0 ) {

                table_body += '<tr><th scope="row">' + d_key + '</th>';

                for (var p_key in position_mask_array) {

                    if ( ( company.degree_mask_2 & degree_mask_2_array[d_key] & position_mask_array[p_key] ) != 0 ) {
                        table_body += '<td><span class="glyphicon glyphicon-ok"></span></td>';
                    } else {
                        table_body += '<td></td>';
                    }

                }

                table_body += '</tr>';
            }
        }

        /* POPULATE DEGREE MASK 3 ROWS*/
        for (var d_key in degree_mask_3_array) {

            if ( ( company.degree_mask_3 & degree_mask_3_array[d_key] ) != 0 ) {

                table_body += '<tr><th scope="row">' + d_key + '</th>';

                for (var p_key in position_mask_array) {

                    if ( ( company.degree_mask_3 & degree_mask_3_array[d_key] & position_mask_array[p_key] ) != 0 ) {
                        table_body += '<td><span class="glyphicon glyphicon-ok"></span></td>';
                    } else {
                        table_body += '<td></td>';
                    }

                }

                table_body += '</tr>';
            }
        }

        table_body += '</tbody>';


        // insert the table body into the rest of the table html
        var table_data = '\
          <table class="table">\
            <thead>\
              <tr>\
                <th></th>\
                <th>Intern</th>\
                <th>Co-op</th>\
                <th>Entry Level</th>\
                <th>Experienced</th>\
              </tr>\
            </thead>\
          '+table_body+'\
          </table>\
          ';

        // populate the table div with the table created above
        $("#company_profile_degree_position_table").html(table_data);

        // create a citizenship string based on the company's citizenship mask, then add it to the div

        var citizen = [];
        var citizen_mask = company.citizen_mask;

        if (citizen_mask & US_mask)
            citizen.push("US Citizen");
        if (citizen_mask & PR_mask)
            citizen.push("US Permanent Resident");
        if (citizen_mask & VH_mask)
            citizen.push("Visa Holder");

        //if the citizen array is empty at this point, that means that the company has not specified any citizenship reqs
        if ( citizen.length > 0 ) {
            $("#company_profile_citizenship").html('<h4>Citizenship requirements: <small> ' + citizen.join(", ") + '</small></h4>');
        } else {
            $("#company_profile_citizenship").html('<h4>Citizenship requirements: <small>No info submitted</small></h4>');
        }


        // display the company description
        $("#company_profile_description > h4").text("More about " + company.name);
        $("#company_profile_description > p").text(company.description);
        
        // display the company website
        $("#company_profile_website").href = company.website;

        $(".view").addClass('hidden');
        $("#company_profile").removeClass('hidden');
    },

    /*
     * view_options: {
     *   day: 1,
     *   company_ids: [1,2,3],
     *   search: false
     * }
     */
    display_companies_list: function(view_options) {
        var div = document.createElement("div");
        div.className = "list-group";

        // Create list elements for all companies
        view_options.company_ids.forEach(function(company_id, index, array) {
            var company = data[company_id];

            var a = $("<a/>", {
                href: "#",
                class: "list-group-item"
            }).click(company_id, function(e) {
                company_id = e.data;
                view("load_company_profile", company_id);
            }).html('<h4 class="list-group-item-heading">' + company.name + '</h4>' +
                    '<p>' + company.description + '</p>')
                    .appendTo(div);
        });

        // If no results, display a message
        if (view_options.company_ids.length === 0)
            $(div).html("<p>No results found.</p>");

        // Add the results to the DOM
        $("#company_list").empty().append(div);

        // Add the "show on map" button when results are tied to a day
        if ("day" in view_options) {
            $("#show_on_map_button")
                .off()
                .click({
                    day: view_options.day,
                    company_ids: view_options.company_ids
                }, function(e) {
                    view("display_companies_map", e.data);
                })
                .show();
        } else {
          $("#show_on_map_button").hide();
        }

        // Add a heading to the view
        if ("day" in view_options) {
            $("#company_list_view_header").text(get_day_string(view_options.day));
        } else if ("search" in view_options && view_options.search) {
            $("#company_list_view_header").text("Search");
        }

        // Display the view
        $(".view").addClass("hidden");
        $("#company_list_view").removeClass("hidden");
    },

    /*
     * view_options: {
     *   day: 1,
     *   company_ids: [1,2,3]
     * }
     */
    display_companies_map: function(view_options) {
        map.resetTables();

        view_options.company_ids.forEach(function(company_id, index, array) {
            var company = data[company_id];
            if (company.tables[view_options.day] != null) {
                var table_id = company.tables[view_options.day];
                map.highlightTable(table_id);
            }
        });

        $(".view").addClass("hidden");
        $("#map_view").removeClass("hidden");
        $("#day_name_map").html('<h4>' + get_day_string(view_options.day) + '</h4>');
    },

    load_companies: function() {
        var view_options = {
            day: 0,
            company_ids: Object.keys(data)
        };
        views.display_companies_list(view_options);
    },

    view_map_highlight_table: function(table_id) {
        map.resetTables();
        map.highlightTable(table_id);

        $(".view").addClass("hidden");
        $("#map_view").removeClass("hidden");
    }
};
