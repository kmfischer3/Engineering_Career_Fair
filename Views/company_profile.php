<?php require_once("../includes/session.php"); ?>
<?php require_once("../includes/db_connection.php"); ?>
<?php require_once("../includes/functions.php"); ?>
<?php include("../includes/page_top.php");?>
<?php include("../includes/loremipsum.php");?>

<div class="content">

<?php 

  // Set up json object
  $response = array();
  $response["status_code"] = "UNKNOWN";
  $response["company_data"] = array();

  if (mysqli_connect_errno()) {
      $response["status_code"] = "SERVER_ERROR";
  } 

  else {

  	if ( !empty($_GET["id"]) ) {

		$id = $_GET["id"];		
		
		$query = 
			"
			SELECT * FROM company
			WHERE id = $id;
			";

		$result = mysqli_query($connection, $query);

		if ( !$result ){
			$response["status_code"] = "SQL_ERROR";
		    	$response["sql_msg"] = mysqli_error($connection);
		}
		else {
				
			$response["status_code"] = "OK";

			// Add each info to the response object          
			while($company = mysqli_fetch_assoc($result)) {
			    	array_push($response["company_data"], $company);
			}
		}

	} else {
		$response["status_code"] = "No id";
	}
  }

//print json object for debugging
//printf("%s", json_encode($response));


// if the query returned results, display them.
// else display error message or "no results"
$days = array();
if ($response["company_data"]){

		$value = $response["company_data"][0];

		$id 		= $value['id'];
		$name 		= $value['name'];
		//$booth 		= $response["company_data"]['booth_id']; 
		$attributes 	= $value['attributes'];

	
		$location_query = "SELECT day_id, booth_id from day_company_booth WHERE company_id = $id;";

		$result = mysqli_query($connection, $location_query);

		if ( !$result ){
			echo "SQL_ERROR";
		}
		else {
			// Add each info to the day object          
			while($day = mysqli_fetch_assoc($result)) {
			    	array_push($days, $day);
			}
		}

} else {

	if ($response["status_code"] != "OK") {
		echo $response["status_code"];
	} else {
		//query was ok but returned no results
		echo "No Results.";
	}
}
?>

<div class="page-header">
	  <h1><?php echo $name; ?><br><small>(Subtitle)</small></h1>
</div>
<br>
<div class="attributes-section">

	<div>
		<h4><b>Location</b></h4>
		<table class="table">
			<tr>
				<th>Day</th>
				<th>Map</th>
			</tr>

<?php
for($i = 0; $i < sizeof($days); $i++){

	$booth = $days[$i]["booth_id"];

	if ($days[$i]["day_id"] == 1) {

		echo "	<tr>
				<td>Monday, Sept. 19</td>
				<td>
					<a href=\"day1.php?boothid=$booth\" type=\"button\" class=\"btn btn-info btn-md\">
						<span class=\"glyphicon glyphicon-map-marker\" aria-hidden=\"true\"></span> Booth #$booth
					</a>
				</td>
			</tr>
		";

	} else if ($days[$i]["day_id"] == 2) {

		echo "	<tr>
				<td>Wednesday, Sept. 21</td>
				<td>
					<a href=\"day2.php?boothid=$booth\" type=\"button\" class=\"btn btn-info btn-md\">
						<span class=\"glyphicon glyphicon-map-marker\" aria-hidden=\"true\"></span> Booth #$booth
					</a>
				</td>
			</tr>
		";

	} else {

		echo "	<tr>
				<td>Wednesday, Sept. 28</td>
				<td>
					<a href=\"day3.php?boothid=$booth\" type=\"button\" class=\"btn btn-info btn-md\">
						<span class=\"glyphicon glyphicon-map-marker\" aria-hidden=\"true\"></span> Booth #$booth
					</a>
				</td>
			</tr>
		";

	}
}
?>


		</table>
	</div>

	<br>

	<div>
		<h4><b>Candidate Requirements</b></h4>
		<table class="table">
			<tr>
				<th>Major</th>
				<td>ABC<br>DEF</td>
			</tr>
			<tr>
				<th>Citizenship</th>
				<td>US Citizen<br>Resident</td>
			</tr>
		</table>
	</div>
			
	<div>
		<h4><b>Position Info</b></h4>
		<table class="table">
			<tr>
				<th>Position</th>
				<td>Co-Op<br>Internship</td>
			</tr>
		</table>
	</div>

</div>
<div class="well well-lg">
		<h4>More about <?php echo $name;?>:<br><br><small><?php echo $lorem_long;?></small></h4>
		<a href="#">Website</a>
</div>


</div>

<?php include("../includes/button-add.html");?>
<?php include("../includes/page_bottom.php");?>

