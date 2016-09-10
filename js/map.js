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
    }
};
