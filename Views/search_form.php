<?php require_once("../includes/session.php"); ?>
<?php require_once("../includes/db_connection.php"); ?>
<?php require_once("../includes/functions.php"); ?>
<?php include("../includes/page_top.php");?>
<?php include("../includes/loremipsum.php");?>

<?php 

?>

<div class="content">
	
	<p id="print_search_term"></p>
	<p id="print_encoded_filters"></p>

	<br><br>
	
	<form id="search" class="form-inline">
		<div class="form-group">
			<input type="test" class="form-control" id="searchterm" placeholder="Search Companies">
		</div>
		<button type="submit" onclick="search_companies();" class="btn btn-default">Go</button>
	</form>
	
	<br><br>
	
	<form id="filter" class="form">
		<div class="row">
			<label for="degree_filters_1" class="col-xs-4">Degree:</label>
			<div class="col-xs-8">
				<div class="form-group" id="degree_filters_1">
					<div class="checkbox" id="bme1">
						<label><input type="checkbox" id="bme">BME</label>
					</div>
					<div class="checkbox">
						<label><input type="checkbox">BSE</label>
					</div>
					<div class="checkbox">
						<label><input type="checkbox">CEE</label>
					</div>
					<div class="checkbox">
						<label><input type="checkbox">CHE</label>
					</div>
					<div class="checkbox">
						<label><input type="checkbox">CMPE</label>
					</div>
					<div class="checkbox">
						<label><input type="checkbox">CS</label>
					</div>
					<div class="checkbox">
						<label><input type="checkbox">EE</label>
					</div>
					<div class="checkbox">
						<label><input type="checkbox">EMA</label>
					</div>
				</div>
		
				<div class="form-group" id="degree_filters_2">
					<div class="checkbox">
						<label><input type="checkbox">ENG</label>
					</div>
					<div class="checkbox">
						<label><input type="checkbox">EP</label>
					</div>
					<div class="checkbox">
						<label><input type="checkbox">GLE</label>
					</div>
					<div class="checkbox">
						<label><input type="checkbox">IE</label>
					</div>
					<div class="checkbox">
						<label><input type="checkbox">MatE</label>
					</div>
					<div class="checkbox">
						<label><input type="checkbox">ME</label>
					</div>
					<div class="checkbox">
						<label><input type="checkbox">MS</label>
					</div>
					<div class="checkbox">
						<label><input type="checkbox">MSE</label>
					</div>
					<div class="checkbox">
						<label><input type="checkbox">NEEP</label>
					</div>
				</div>
			</div>
		</div>
		
		<br><br>
		
		<div class="row">
				<label for="position_filters" class="col-xs-4">Position Type:</label>
				<div class="col-xs-8">
					<div class="form-group" id="position_filters">
						<div class="checkbox">
							<label><input type="checkbox">Internship</label>
						</div>
						<div class="checkbox">
							<label><input type="checkbox">Co-Op</label>
						</div>
						<div class="checkbox">
							<label><input type="checkbox">Entry Professional</label>
						</div>
						<div class="checkbox">
							<label><input type="checkbox">Experienced Professional</label>
						</div>
					</div>
				</div>
		</div>
		
		<br><br>
		
		<div class="row">
				<label for="citizenship_filters" class="col-xs-4">Citizenship:</label>
				<div class="col-xs-8">
					<div class="form-group" id="citizenship_filters">
						<div class="checkbox">
							<label><input type="checkbox">US Citizen</label>
						</div>
						<div class="checkbox">
							<label><input type="checkbox">US Permanent Resident</label>
						</div>
						<div class="checkbox">
							<label><input type="checkbox">Visa Holder</label>
						</div>
					</div>
				</div>
		</div>
		<button type="submit" id="submit_searchterm" onclick="encodeFilters();" class="btn btn-default pull-right">Go</button>
	</form>

</div>

<script>

//TODO this function should be a jquery thing
function search_companies() {
	var searchterm = document.getElementById("search").elements["searchterm"].value;
	document.getElementById("print_search_term").innerHTML = "search term: " + searchterm;
}

function encodeFilters() {
	var filters = document.getElementById("filter");

	var degree_mask_1 = 0;
	var degree_mask_2 = 0;
	var position_mask = 0;	
	var citizenship_mask = 0;

	for (var i = 0; i < 8 ;i++) {
		degree_mask_1 = (degree_mask_1 << 4);	
		if ( filters.elements[i].checked ) {
			degree_mask_1 = (degree_mask_1 | 15);
		}
	}
	for (var i = 8; i < 17 ;i++) {
		degree_mask_2 = (degree_mask_2 << 4);	
		if ( filters.elements[i].checked ) {
			degree_mask_2 = (degree_mask_2 | 15);
		}
	}
	for (var i = 17; i < 21 ;i++) {
		position_mask = (position_mask << 1);	
		if ( filters.elements[i].checked ) {
			position_mask = (position_mask | 1);
		}
	}
	for (var i = 21; i < 24 ;i++) {
		citizenship_mask = (citizenship_mask << 1);	
		if ( filters.elements[i].checked ) {
			citizenship_mask = (citizenship_mask | 1);
		}
	}
	
	
	document.getElementById("print_encoded_filters").innerHTML = 	  "degree_mask_1: " + degree_mask_1 
									+ "<br>degree_mask_2: " + degree_mask_2 
									+ "<br>position_mask: " + position_mask 
									+ "<br>citizenship_mask: " + citizenship_mask;
}

</script>

<?php include("../includes/button-add.html");?>
<?php include("../includes/page_bottom.php");?>
