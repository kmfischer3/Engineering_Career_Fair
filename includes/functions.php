<?php error_reporting(E_ALL); ?>
<?php
	function get_company_db() {

		global $connection;

		if (mysqli_connect_errno()) {
			return null;
		} 

	  	$query = "SELECT * FROM companies ORDER BY name ASC;";

		// Run the query, check for sql error or empty response
		$all_companies = mysqli_query($connection, $query);

		if ( !$all_companies ) {
			return null;
		}

		if ( mysqli_num_rows($all_companies) == 0 ) {
			return array();
		}
          
		$response = array();

		while($company = mysqli_fetch_assoc($all_companies)) {
			$response[$company["id"]] = $company;
		}

		return $response;

	}
	
	function get_company_db_json() {

		$response = get_company_db();
		return json_encode($response, JSON_PRETTY_PRINT);

	}
	
	function get_day_company_booth_db() {

		global $connection;

		if (mysqli_connect_errno()) {
			return null;
		} 

	  	$query = "SELECT * FROM day_company_booth;";

		// Run the query, check for sql error or empty response
		$day_company_booth_assignments = mysqli_query($connection, $query);

		if ( !$day_company_booth_assignments ) {
			return null;
		}

		if ( mysqli_num_rows($day_company_booth_assignments) == 0 ) {
			return array();
		}
          
		$response = array();

		while($assignment = mysqli_fetch_assoc($day_company_booth_assignments)) {
			$response[$assignment["id"]] = $assignment;
		}

		return $response;

	}
	
	function get_day_company_booth_db_json() {

		$response = get_day_company_booth_db();
		return json_encode($response, JSON_PRETTY_PRINT);

	}

?>
