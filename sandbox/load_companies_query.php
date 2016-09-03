<?php require_once("../includes/session.php"); ?>
<?php require_once("../includes/db_connection.php"); ?>
<?php require_once("../includes/functions.php"); ?>
<?php 

  // Set up JSON response
  $response = array();
  $response["status_code"] = "_UNKNOWN";

  if (mysqli_connect_errno()) 
  {
      $response["status_code"] = "SERVER_ERROR";
  } 

  else 
  {

  	$query = "SELECT * FROM companies;";

        // Run the query, check for sql error or empty response
        $all_companies = mysqli_query($connection, $query);

        if ( !$all_companies )
        {
        	$response["status_code"] = "SQL_ERROR";
            	$response["sql_msg"] = mysqli_error($connection);
        }
        else if ( mysqli_num_rows($all_companies) == 0 ) 
        {
        	$response["status_code"] = "NO_RESULTS";
        }
        else
        {
        		
		$response["status_code"] = "OK";

		// Add each company to the response            
		while($company = mysqli_fetch_assoc($all_companies))
		{
			//$id = $company['id'];
		    	array_push($response, $company);
		}

        }

  }

/* Output pretty JSON */
$json = json_encode($response);
//printf("%s", $json);

foreach ($response as $value) {

	$id 	= $value['id'];
	$name 	= $value['name'];
	$booth 	= $value['booth']; 

	echo "
	<div class=\"media\">
  		<div class=\"media-left\">
    			<a href=\"company_profile?id=".$id."\">
      				<img class=\"media-object\" src=\"...\" alt=\"...\">
    			</a>
  		</div>
  		<div class=\"media-body\">
    			<h4 class=\"media-heading\">".$name."</h4>
    			<h4>hello</h4>
  		</div>
	</div>
	";

}

?>

