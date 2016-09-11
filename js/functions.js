/*
 * Store the name to function mapping for all views. 
 */
var views = {};


function load_company_profile(company_id) {

    company = data[company_id];
    
    // display the company name in the jumbotron div
    $("#company_profile_name").html('<h1>' + company.name + '</h1>');
    
    
    // create day_company_booth list with buttons to trigger the map view with the corresponding booth highlighted
    $("#company_profile_day_list").html('<h4>Booth Locations</h4>\
               <a href="#" class="list-group-item"><span class="glyphicon glyphicon-map-marker" aria-hidden="true"></span> Monday, Sept. 19 <span class="glyphicon glyphicon-menu-right pull-right"></span></a>\
               <a href="#" class="list-group-item"><span class="glyphicon glyphicon-map-marker" aria-hidden="true"></span> Wednesday, Sept. 21 <span class="glyphicon glyphicon-menu-right pull-right"></span></a>\
               <a href="#" class="list-group-item"><span class="glyphicon glyphicon-map-marker" aria-hidden="true"></span> Wednesday, Sept. 28 <span class="glyphicon glyphicon-menu-right pull-right"></span></a>');
    
    
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
      <h3>Postion</h3>\
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
    
    if ((citizen_mask & US_mask) == US_mask) {
        citizen.push("US Citizen");
    }
    if ((citizen_mask & PR_mask) == PR_mask) {
        citizen.push("US Permanent Resident");
    }
    if ((citizen_mask & VH_mask) == VH_mask) {
        citizen.push("Visa Holder");
    }
    
    //if the citizen array is empty at this point, that means that the company has not specified any citizenship reqs
    if ( citizen.length > 0 ) {
	$("#company_profile_citizenship").html('<h4>Citizenship requirements: <small> ' + citizen.join(", ") + '</small></h4>');
    } else {
    	$("#company_profile_citizenship").html('<h4>Citizenship requirements: <small>No info submitted</small></h4>');	
    }

    $(".view").addClass('hidden');
    $("#company_profile").removeClass('hidden');
}
views["load_company_profile"] = load_company_profile;

function display_companies_list(view_options) {
    var div = document.createElement("div");
    div.className = "list-group";

    var company_html = "";
    view_options.company_ids.forEach(function(company_id, index, array) {
        var company = data[company_id];

        var a = document.createElement("a");
        a.href = "#";
        $(a).click(company_id, function(e) {
            company_id = e.data;
            view("load_company_profile", company_id);
        });
        a.className = "list-group-item";

        $(a).html('<h4 class="list-group-item-heading">' + company.name + '</h4>\
      <p>' + company.description + '</p>');

        div.appendChild(a);
    });

    // If no results, display a message
    if (!div.hasChildNodes()) {
        $(div).html("<p>No results found.</p>");
    }

    $("#company_list").empty();
    var content_div = document.getElementById("company_list");
    content_div.appendChild(div);

    $("#show_on_map_button")
        .off()
        .click({day: view_options.day,
                company_ids: view_options.company_ids},
                function(e) {
                    view("display_companies_map", e.data);
                });
    
    $(".view").addClass('hidden');
    $("#company_list_view").removeClass('hidden');
}
views["display_companies_list"] = display_companies_list;

/*
 * view_options:
 * {
 *   day: 1,
 *   company_ids: [1,2,3]
 * }
 */
function display_companies_map(view_options) {

    map.resetTables();

    view_options.company_ids.forEach(function(company_id, index, array) {
        var company = data[company_id];
	    if (company.tables[view_options.day] != null) {
	        table_id = company.tables[view_options.day]-590; //TODO update table numbers so you don't have to do this subtraction
	        map.highlightTable(table_id);
	    }        
    });

    $(".view").addClass('hidden');
    $("#map_view").removeClass('hidden');
}
views["display_companies_map"] = display_companies_map;

function load_companies() {

    var view_options = 
    {
        day: 1,
        company_ids: Object.keys(data)
    };

    display_companies_list(view_options);
}
views["load_companies"] = load_companies;

function view_map_highlight_table(table_id) {
    map.resetTables();
    map.highlightTable(table_id);

    $(".view").addClass("hidden");
    $("#map_view").removeClass("hidden");
}
views["view_map_highlight_table"] = view_map_highlight_table;
