function load_company_profile(company_id) {

	company = data[company_id];

	profile = '<div class="list-group">\
			  <a href="#" class="list-group-item">Mon <span class="glyphicon glyphicon-menu-right pull-right"></span></a>\
			  <a href="#" class="list-group-item">Wed <span class="glyphicon glyphicon-menu-right pull-right"></span></a>\
			  <a href="#" class="list-group-item">Wed2 <span class="glyphicon glyphicon-menu-right pull-right"></span></a>\
		    </div>\
		    <div>\
		    	<ul>\
		    		<li>name: ' + company.name + '</li>\
		    		<li>website: ' + company.website + '</li>\
		    		<li>description: ' + company.description + '</li>\
		    		<li>citizen_mask: ' + company.citizen_mask + '</li>\
		    	</ul>\
		    </div>';

	var content_div = document.getElementById("company_profile");
	$(content_div).html(profile);

	$("#company_list").addClass('hidden');
	$("#company_profile").removeClass('hidden');
	
	
}

function load_companies() {

	var content_div = document.getElementById("company_list");
	var div = document.createElement("div");
	div.className = "list-group";

	var company_html = "";
	for (var company_id in data) {
		var company = data[company_id];

		var a = document.createElement("a");
		a.href = "#";
		$(a).click(company.id, function(e) {
			company_id = e.data;
			load_company_profile(company_id);
		});
		a.className = "list-group-item";
		
		$(a).html('<h4 class="list-group-item-heading">' + company.name + '</h4>\
			<p>' + company.description + '</p>');

		div.appendChild(a);
	}

	content_div.appendChild(div);

	$("#company_list").removeClass('hidden');
	$("#company_profile").addClass('hidden');
}

