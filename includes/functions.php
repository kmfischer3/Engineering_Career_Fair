<?php error_reporting(E_ALL); ?>
<?php
	function get_company_db() {

		global $connection;

		if (mysqli_connect_errno()) {
			return null;
		} 

	  	$query = "SELECT * FROM companies;";

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

?>
