var map = {
    MIN_TABLE_NUMBER: 1,
    MAX_TABLE_NUMBER: 117,  // TODO: update

    resetTables: function(day) {
	      for (i = map.MIN_TABLE_NUMBER; i <= map.MAX_TABLE_NUMBER; i++) {
	          var table = document.getElementById("table" + day.toString() + "." + i.toString());
	          if (table == null)
		            continue;

	          table.classList.remove("highlight");
	      }

        // TODO: update to hide companies across all days
    },

    highlightTables: function(day, table_ids) {
        table_ids.forEach(function(table_id) {
	        var table = document.getElementById("table" + day.toString() + "." + table_id.toString());
	        table.classList.add("highlight");
        });
    },

    /*
     * options = {
     *   company_ids: [1,2,3],
     *   day: 0
     * }
     */
    highlightCompanies: function(options) {
        map.resetTables(options.day);

        options.company_ids.forEach(function(company_id, index, array) {
            var company = data[company_id];
            map.highlightTables(options.day, company.tables_on_day(options.day));
        });
    },

    /*
     * Load the map files in the background.
     */
    loadMaps: function() {
        $("#map_svg_0").load("/static/map-2016-09-19.svg");
        $("#map_svg_1").load("/static/map-2016-09-21.svg");
        $("#map_svg_2").load("/static/map-2016-09-28.svg");
    },

    /*
     * Show the correct map for a given day, hiding the others.
     */
    showMap: function(day) {
        $(".map_svg").addClass("hidden");
        $("#map_svg_" + day.toString()).removeClass("hidden");
    }
};
