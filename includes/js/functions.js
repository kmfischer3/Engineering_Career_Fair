function load_company_profile(company_id) {

	company = data[company_id];
	
	citizen = [];
	citizen_mask = company.citizen_mask;
	
	if ((citizen_mask & 4) == 4) {
		citizen.push("US Citizen");
	}
	if ((citizen_mask & 2) == 2) {
		citizen.push("US Permanent Resident");
	}
	if ((citizen_mask & 1) == 1) {
		citizen.push("Visa Holder");
	}

	$("#company_profile_day_list").html('<a href="#" class="list-group-item">Mon <span class="glyphicon glyphicon-menu-right pull-right"></span></a>\
					     <a href="#" class="list-group-item">Wed <span class="glyphicon glyphicon-menu-right pull-right"></span></a>\
					     <a href="#" class="list-group-item">Wed2 <span class="glyphicon glyphicon-menu-right pull-right"></span></a>');
		    /*
		    <div>\
		    	<ul>\
		    		<li>name: ' + company.name + '</li>\
		    		<li>website: ' + company.website + '</li>\
		    		<li>description: ' + company.description + '</li>\
		    		<li>citizen: ' + citizen.join(", "); + '</li>\
		    	</ul>\
		    </div>';*/

	$("#company_list").addClass('hidden');
	$("#company_profile").removeClass('hidden');
}
views["load_company_profile"] = load_company_profile;

function display_companies(company_ids) {
	var div = document.createElement("div");
	div.className = "list-group";

	var company_html = "";
	company_ids.forEach(function(company_id, index, array) {
		var company = data[company_id];

		var a = document.createElement("a");
		a.href = "#";
		$(a).click(company.id, function(e) {
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

	$("#company_list").removeClass('hidden');
	$("#company_profile").addClass('hidden');
}

function load_companies() {
	display_companies(Object.keys(data));
}
views["load_companies"] = load_companies;

/*
 * Split the search keywords by space characters. Any company that
 * includes one of these keywords in its name will have its ID included
 * in the result set.
 */
function search_companies(keywords) {
	keywords = keywords.toLowerCase();
	terms = keywords.split(" ");
	
	results = [];
	terms.forEach(function(term, index, array) {
		for (var company_id in data) {
			company = data[company_id];
			if (company.name.toLowerCase().indexOf(term) != -1) {
				if (results.indexOf(company_id) == -1) {
					results.push(company_id);
				}
			}
		}
	});
	
	return results;
}
