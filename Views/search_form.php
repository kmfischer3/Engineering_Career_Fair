<?php require_once("../includes/session.php"); ?>
<?php require_once("../includes/db_connection.php"); ?>
<?php require_once("../includes/functions.php"); ?>
<?php include("../includes/page_top.php");?>
<?php include("../includes/loremipsum.php");?>

<script type="text/javascript">

	var data = <?php echo get_company_db_json(); ?>;

</script>

<div class="content">
	
	<p id="print_search_term"></p>
	<p id="print_encoded_filters"></p>

	<br><br>
	
	<form id="search" class="form-inline">
		<div class="form-group">
			<input type="text" class="form-control" placeholder="Search Companies" id="searchterm">
		</div>
		<input type="submit" class="btn btn-default">
	</form>
	
	<br><br>
	
	<form id="filter" class="form">
		<div class="row">
			<label for="degree_filters_1" class="col-xs-4">Degree:</label>
			<div class="col-xs-8">
				<div class="form-group">
					<div class="checkbox">
						<label><input type="checkbox" id="BME_input">BME</label>
					</div>
					<div class="checkbox">
						<label><input type="checkbox" id="BSE_input">BSE</label>
					</div>
					<div class="checkbox">
						<label><input type="checkbox" id="CEE_input">CEE</label>
					</div>
					<div class="checkbox">
						<label><input type="checkbox" id="CHE_input">CHE</label>
					</div>
					<div class="checkbox">
						<label><input type="checkbox" id="CMPE_input">CMPE</label>
					</div>
					<div class="checkbox">
						<label><input type="checkbox" id="CS_input">CS</label>
					</div>
					<div class="checkbox">
						<label><input type="checkbox" id="EE_input">EE</label>
					</div>
					<div class="checkbox">
						<label><input type="checkbox" id="EMA_input">EMA</label>
					</div>
					<div class="checkbox">
						<label><input type="checkbox" id="ENG_input">ENG</label>
					</div>
					<div class="checkbox">
						<label><input type="checkbox" id="EP_input">EP</label>
					</div>
					<div class="checkbox">
						<label><input type="checkbox" id="GLE_input">GLE</label>
					</div>
					<div class="checkbox">
						<label><input type="checkbox" id="IE_input">IE</label>
					</div>
					<div class="checkbox">
						<label><input type="checkbox" id="MatE_input">MatE</label>
					</div>
					<div class="checkbox">
						<label><input type="checkbox" id="ME_input">ME</label>
					</div>
					<div class="checkbox">
						<label><input type="checkbox" id="MS_input">MS</label>
					</div>
					<div class="checkbox">
						<label><input type="checkbox" id="MSE_input">MSE</label>
					</div>
					<div class="checkbox">
						<label><input type="checkbox" id="NEEP_input">NEEP</label>
					</div>
				</div>
			</div>
		</div>
		
		<br><br>
		
		<div class="row">
				<label for="position_filters" class="col-xs-4">Position Type:</label>
				<div class="col-xs-8">
					<div class="form-group">
						<div class="checkbox">
							<label><input type="checkbox" id="I_input">Internship</label>
						</div>
						<div class="checkbox">
							<label><input type="checkbox" id="C_input">Co-Op</label>
						</div>
						<div class="checkbox">
							<label><input type="checkbox" id="E_input">Entry Professional</label>
						</div>
						<div class="checkbox">
							<label><input type="checkbox" id="X_input">Experienced Professional</label>
						</div>
					</div>
				</div>
		</div>
		
		<br><br>
		
		<div class="row">
				<label for="citizenship_filters" class="col-xs-4">Citizenship:</label>
				<div class="col-xs-8">
					<div class="form-group">
						<div class="checkbox">
							<label><input type="checkbox" id="US_input">US Citizen</label>
						</div>
						<div class="checkbox">
							<label><input type="checkbox" id="PR_input">US Permanent Resident</label>
						</div>
						<div class="checkbox">
							<label><input type="checkbox" id="VH_input">Visa Holder</label>
						</div>
					</div>
				</div>
		</div>
		<button type="submit" id="submit_searchterm" onclick="encodeFilters(); return false;" class="btn btn-default pull-right">Go</button>
	</form>

</div>

<script>

$( "#search" ).submit(function( event ) {
	console.log( search_companies( $("#searchterm").val() ) );
	console.log("hello");
	//var result = search_companies( $("#searchterm").val() );
	event.preventDefault();
});


/*TODO this function should be a jquery thing
function search_companies() {
	var searchterm = document.getElementById("search").elements["searchterm"].value;
	document.getElementById("print_search_term").innerHTML = "search term: " + searchterm;
}
*/

function encodeFilters() {

	var filters = document.getElementById("filter");

	var degree_mask_1 = 0;		// BME  -> CS
	var degree_mask_2 = 0;		// EE   -> IE
	var degree_mask_3 = 0;		// MatE -> NEEP
	
	var position_mask = 0;		// I,C,E,X
	var citizenship_mask = 0;	// US,PR,VH
	
	
	/* ENCODE DEGREE MASK 1 */
	var BME_mask = 15728640;	//00000000111100000000000000000000
	var BSE_mask = 983040;		//00000000000011110000000000000000
	var CEE_mask = 61440;			//00000000000000001111000000000000
	var CHE_mask = 3840;			//00000000000000000000111100000000
	var CMPE_mask = 240;			//00000000000000000000000011110000
	var CS_mask = 15;					//00000000000000000000000000001111
	
	if ( filters.elements["BME_input"].checked ) {
		degree_mask_1 = (degree_mask_1 | BME_mask);
	}	
	if ( filters.elements["BSE_input"].checked ) {
		degree_mask_1 = (degree_mask_1 | BSE_mask);
	}
	if ( filters.elements["CEE_input"].checked ) {
		degree_mask_1 = (degree_mask_1 | CEE_mask);
	}
	if ( filters.elements["CHE_input"].checked ) {
		degree_mask_1 = (degree_mask_1 | CHE_mask);
	}
	if ( filters.elements["CMPE_input"].checked ) {
		degree_mask_1 = (degree_mask_1 | CMPE_mask);
	}
	if ( filters.elements["CS_input"].checked ) {
		degree_mask_1 = (degree_mask_1 | CS_mask);
	}
	
	
	/* ENCODE DEGREE MASK 2 */
	var EE_mask = 15728640;		//00000000111100000000000000000000
	var EMA_mask = 983040;		//00000000000011110000000000000000
	var ENG_mask = 61440;			//00000000000000001111000000000000
	var EP_mask = 3840;				//00000000000000000000111100000000
	var GLE_mask = 240;				//00000000000000000000000011110000
	var IE_mask = 15;					//00000000000000000000000000001111
	
	if ( filters.elements["EE_input"].checked ) {
		degree_mask_2 = (degree_mask_2 | EE_mask);
	}	
	if ( filters.elements["EMA_input"].checked ) {
		degree_mask_2 = (degree_mask_2 | EMA_mask);
	}
	if ( filters.elements["ENG_input"].checked ) {
		degree_mask_2 = (degree_mask_2 | ENG_mask);
	}
	if ( filters.elements["EP_input"].checked ) {
		degree_mask_2 = (degree_mask_2 | EP_mask);
	}
	if ( filters.elements["GLE_input"].checked ) {
		degree_mask_2 = (degree_mask_2 | GLE_mask);
	}
	if ( filters.elements["IE_input"].checked ) {
		degree_mask_2 = (degree_mask_2 | IE_mask);
	}
	
	
	/* ENCODE DEGREE MASK 3 */
	var MatE_mask = 983040;		//00000000000011110000000000000000
	var ME_mask = 61440;			//00000000000000001111000000000000
	var MS_mask = 3840;				//00000000000000000000111100000000
	var MSE_mask = 240;				//00000000000000000000000011110000
	var NEEP_mask = 15;				//00000000000000000000000000001111
	
	if ( filters.elements["MatE_input"].checked ) {
		degree_mask_3 = (degree_mask_3 | MatE_mask);
	}	
	if ( filters.elements["ME_input"].checked ) {
		degree_mask_3 = (degree_mask_3 | ME_mask);
	}
	if ( filters.elements["MS_input"].checked ) {
		degree_mask_3 = (degree_mask_3 | MS_mask);
	}
	if ( filters.elements["MSE_input"].checked ) {
		degree_mask_3 = (degree_mask_3 | MSE_mask);
	}
	if ( filters.elements["NEEP_input"].checked ) {
		degree_mask_3 = (degree_mask_3 | NEEP_mask);
	}
		

	/* ENCODE POSITION MASK */
	var I_mask = 8947848;			//00000000100010001000100010001000
	var C_mask = 4473924;			//00000000010001000100010001000100
	var E_mask = 2236962;			//00000000001000100010001000100010
	var X_mask = 1118481;			//00000000000100010001000100010001
	
	if ( filters.elements["I_input"].checked ) {
		position_mask = (position_mask | I_mask);
	}	
	if ( filters.elements["C_input"].checked ) {
		position_mask = (position_mask | C_mask);
	}
	if ( filters.elements["E_input"].checked ) {
		position_mask = (position_mask | E_mask);
	}
	if ( filters.elements["X_input"].checked ) {
		position_mask = (position_mask | X_mask);
	}
	
	
	/* ENCODE CITIZEN MASK */
	var US_mask = 4;	//100
	var PR_mask = 2;	//010
	var VH_mask = 1;	//001
	
	if ( filters.elements["US_input"].checked ) {
		citizenship_mask = (citizenship_mask | US_mask);
	}	
	if ( filters.elements["PR_input"].checked ) {
		citizenship_mask = (citizenship_mask | PR_mask);
	}
	if ( filters.elements["VH_input"].checked ) {
		citizenship_mask = (citizenship_mask | VH_mask);
	}


	//TODO: combine degree_mask_# AND position_mask to create search_mask
	
	document.getElementById("print_encoded_filters").innerHTML = 	  "degree_mask_1: " + degree_mask_1 
																														+ "<br>degree_mask_2: " + degree_mask_2 
																														+ "<br>degree_mask_3: " + degree_mask_3 
																														+ "<br>position_mask: " + position_mask 
																														+ "<br>citizenship_mask: " + citizenship_mask;
}

</script>

<?php include("../includes/button-add.html");?>
<?php include("../includes/page_bottom.php");?>
