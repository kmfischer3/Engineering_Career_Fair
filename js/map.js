var map = {
    MIN_TABLE_NUMBER: 0,
    MAX_TABLE_NUMBER: 100,  // TODO: update

    resetTables: function() {
	      for (i = map.MIN_TABLE_NUMBER; i < map.MAX_TABLE_NUMBER; i++) {
	          var table = document.getElementById("table" + i.toString());
	          if (table == null)
		            continue;

	          table.classList.remove("highlight");
	      }
    },

    highlightTable: function(table_id) {
	      var table = document.getElementById("table" + table_id.toString());
	      table.classList.add("highlight");
    },

    /*
     * options = {
     *   company_ids: [1,2,3],
     *   day: 0
     * }
     */
    highlightCompanies: function(options) {

        map.resetTables();

        for (var company_id in options.company_ids) {
            var company = data[company_id];

            if (company.tables[options.day] != null)
                map.highlightTable(company.tables[options.day]);
        }
    }
};
