<?php
	function get_company_db() {

		global $connection;

		if (mysqli_connect_errno()) {
			return null;
		}

		// Download all companies from the database
		$query = "SELECT * FROM companies ORDER BY name ASC;";
		$all_companies = mysqli_query($connection, $query);

		if ( !$all_companies ) {
			return null;
		}
		if ( mysqli_num_rows($all_companies) == 0 ) {
			return array();
		}

    // Populate return data with company objects.
		$response = array();
		while($company = mysqli_fetch_assoc($all_companies)) {
			$response[$company["id"]] = $company;
			$response[$company["id"]]["tables"] = [null, null, null];
			unset($response[$company["id"]]["id"]); // Remove ID; already used as key
		}

		// Download table data from the database
		$query = "SELECT * FROM day_company_booth;";
		$table_assignments = mysqli_query($connection, $query);
		if ( !table_assignments ) {
			return null;
		}
		if ( mysqli_num_rows($table_assignments) == 0 ) {
			return array();
		}

		// Augment company data with table data
		while ( $assignment = mysqli_fetch_assoc($table_assignments) ) {
			if (!array_key_exists((int)$assignment["company_id"], $response)) {
				continue;  // Company not in results
			}
			$response[$assignment["company_id"]]["tables"][(int)$assignment["day_id"] - 1] = $assignment["booth_id"];
		}

		return $response;

	}

	function get_company_db_json() {

		$response = get_company_db();
		return json_encode($response, JSON_PRETTY_PRINT);

	}
?>
