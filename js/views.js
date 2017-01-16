var views = {
    load_company_profile: function(company_id) {
        var company = data[company_id];
        // TODO: don't generate the company object here
        company = new Company(company_id, company.name, company.website, company.description,
                              'gAAAAAAAAQAAAArAAAAAAAAyAAAAAAzAAAAAAAAA', [[1], [2]]);

        // display the company name in the jumbotron div
        $("#company_profile_name").text(company.name);    // display the company description
        $("#company_profile_description > h4").text("More about " + company.name);
        $("#company_profile_description_text").text("Loading, please wait...");

        // Asynchronously load the profile description
        company.get_profile_description(function(data) {
          // TODO: this code should not be executed if the user has excited
          //   the current profile and vistied a new profile. (that is, if
          //   network delay causes the result to be returned late.)
          $('#company_profile_description_text').html(data);
        });

        // display the company website. If no website, then hide the link
        if ( company.website != null ) {
            $( "#company_profile_website" ).attr('href', company.website).show();
        } else {
            $( "#company_profile_website" ).hide();
        }

        // create day_company_booth list with buttons to trigger the map view with the corresponding booth highlighted
        function create_link(table_id, day) {
            return $("<a/>", {
                href: "#",
                class: "list-group-item"})
                .click(
                    {
                        table_id: table_id,
                        day: day
                    },
                    function(e) {
                        view("view_map_highlight_table", e.data);
                        e.preventDefault();
                    })
                .html('<span class="glyphicon glyphicon-map-marker" aria-hidden="true"></span>' +
                      get_day_string(day) +
                      '<span class="glyphicon glyphicon-menu-right pull-right"></span>');
        }

        $("#company_profile_day_list").empty();
        for (var day = 0; day < 3; day++) {
            if (company.tables[day] != null) {
                create_link(company.tables[day], day)
                    .appendTo("#company_profile_day_list");
            }
        }

        // construct degree-position table
        // if the company's degree_mask_# has anything other than '0000' for a given major, add that major to the table
        // then, use (degree_mask & position_mask) to place the checkmark in the appropriate column
        var table_body = '<tbody>';


        // Populate table with degree information
        var major_info_found = false;
        MAJORS.forEach(function(major) {
            var table_row = '<tr><th scope="row">' + major + '</th>';
            var check_added = false;

            POSITION_OFFSETS.forEach(function(position_offset) {

                if (company.attributes.bitAt(MAJOR_INDEXES[major] + position_offset)) {
                    check_added = true;
                    major_info_found = true;
                    table_row += '<td><span class="glyphicon glyphicon-ok"></span></td>';
                } else {
                    table_row += '<td></td>';
                }
            });

            table_row += '</tr>';

            if (check_added) {
                table_body += table_row;
            }
        });

        table_body += '</tbody>';


        // If no major info found, display message "No info submitted"
        if (!major_info_found) {
        	table_body = '<tbody><tr><td colspan="5">No info submitted</td></tr></tbody>';
        }


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

        // populate work authorization requirements
        $("#company_profile_citizenship").html('<h4>Work authorization: <small> ' + company.get_work_authorization() + '</small></h4>');

        $(".view").addClass('hidden');
        $("#company_profile").removeClass('hidden');
    },

    /*
     * view_options: {
     *   day: 1,
     *   company_ids: [1,2,3],
     *   search: false,
     *   source: SOURCE_SEARCH | SOURCE_FILTER
     * }
     */
    display_companies_list: function(view_options) {
        var div = document.createElement("div");
        div.className = "list-group";

        // Create list elements for all companies
        view_options.company_ids.forEach(function(company_id, index, array) {
            var company = data[company_id];
            // TODO: don't generate the company object here
            company = new Company(company_id, company.name, company.website, company.description,
                                  'gAAAAAAAAQAAAArAAAAAAAAyAAAAAAzAAAAAAAAA', [[1], [2]]);

            var a = $("<a/>", {
                href: "#",
                class: "list-group-item"
            }).click(company_id, function(e) {
                company_id = e.data;
                view("load_company_profile", company.id);
                e.preventDefault();
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
                .click(
                  view_options
                  , function(e) {
                    view("display_companies_map", e.data);
                    e.preventDefault();
                })
                .show();
        } else {
          $("#show_on_map_button").hide();
        }

        // Add a heading to the view
        if ("source" in view_options) {
            switch (view_options.source) {
              case SOURCE_FILTER:
                  $("#company_list_view_header").text(get_day_string(view_options.day));
                  $("#company_list_view_header_subtext").show();
                  utils.display_filter_string($("#company_list_view_header_filter_list"));
                  break;
              case SOURCE_SEARCH:
              default:
                  $("#company_list_view_header_filter_list").hide();
                  $("#company_list_view_header").text("Search");
                  $("#company_list_view_header_subtext").hide();
                  //$("#company_list_view_header").html("Search: <small>" + $("#searchterm").val() + "</small>");
            }
        } else {
            $("#company_list_view_header").text(get_day_string(view_options.day));
            $("#company_list_view_header_subtext").show();
            $("#company_list_view_header_filter_list").hide();
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
        map.resetTables(view_options.day);
        map.highlightCompanies({
            company_ids: view_options.company_ids,
            day: view_options.day
        });
        map.showMap(view_options.day);
        $("#map_view_title").text(get_day_string(view_options.day));

        // Add a heading to the view
        if ("source" in view_options) {
            switch (view_options.source) {
              case SOURCE_FILTER:
                  utils.display_filter_string($("#map_view_header_filter_list"));
                  break;
              case SOURCE_SEARCH:
              default:
                  $("#map_view_header_filter_list").hide();
                  //$("#company_list_view_header").html("Search: <small>" + $("#searchterm").val() + "</small>");
            }
        } else {
            $("#map_view_header_filter_list").hide();
        }

        $(".view").addClass("hidden");
        $("#map_view").removeClass("hidden");
    },

    load_companies: function() {
        var view_options = {
            day: 0,
            company_ids: Object.keys(data)
        };
        views.display_companies_list(view_options);
    },

    /*
     * options = {
     *   table_id: 1,
     *   day: 1
     * }
     */
    view_map_highlight_table: function(options) {
        map.resetTables(options.day);
        map.highlightTable(options.day, options.table_id);
        map.showMap(options.day);
        $("#map_view_title").text(get_day_string(options.day));
        $("#map_view_header_filter_list").hide();

        $(".view").addClass("hidden");
        $("#map_view").removeClass("hidden");
    },

    search_page: function() {
        $(".view").addClass("hidden");
        $("#search_and_filter").removeClass("hidden");
    }
};
