function load_company_profile(company_index) {

	day_list = '<div class="list-group">\
			  <a href="#" class="list-group-item">Mon <span class="glyphicon glyphicon-menu-right pull-right"></span></a>\
			  <a href="#" class="list-group-item">Wed <span class="glyphicon glyphicon-menu-right pull-right"></span></a>\
			  <a href="#" class="list-group-item">Wed2 <span class="glyphicon glyphicon-menu-right pull-right"></span></a>\
		    </div>';

	var content_div = document.getElementById("company_profile");
	$(content_div).html(day_list);

	$("#company_list").addClass('hidden');
	$("#company_profile").removeClass('hidden');
	
	
}

