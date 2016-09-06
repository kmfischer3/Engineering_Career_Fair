<?php require_once("../includes/session.php"); ?>
<?php require_once("../includes/db_connection.php"); ?>
<?php require_once("../includes/functions.php"); ?>
<?php include("../includes/page_top.php");?>
<?php include("../includes/loremipsum.php");?>

<script type="text/javascript">

	var data = <?php echo get_company_db_json(); ?>;

</script>

<div id="company_list" class="content">
</div>

<div id="company_profile" class="hidden">
	<div class="jumbotron">
		<h1 id="company_profile_name">Company Name</h1>
	</div>

	<div class="content">
		<div id="company_profile_day_list" class="list-group">
		</div>
	
		<h2>Available Positions</h2>
		<table class="table"> 
			<thead> 
				<tr> 
					<th></th> 
					<th>Intern</th>
					<th>Co-op</th>
					<th>Entry Level</th>
					<th>Experienced</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<th scope="row">BME</th>
					<td><span class="glyphicon glyphicon-ok"></span></td>
					<td></td>
					<td></td>
					<td><span class="glyphicon glyphicon-ok"></span></td>
				</tr>
				<tr>
					<th scope="row">BSE</th>
					<td><span class="glyphicon glyphicon-ok"></span></td>
					<td><span class="glyphicon glyphicon-ok"></span></td>
					<td></td>
					<td></td>
				</tr>
				<tr>
					<th scope="row">CEE</th>
					<td></td>
					<td><span class="glyphicon glyphicon-ok"></span></td>
					<td><span class="glyphicon glyphicon-ok"></span></td>
					<td><span class="glyphicon glyphicon-ok"></span></td>
				</tr>
				<tr>
					<th scope="row">CHE</th>
					<td></td>
					<td><span class="glyphicon glyphicon-ok"></span></td>
					<td></td>
					<td></td>
				</tr>
				<tr>
					<th scope="row">CMPE</th>
					<td></td>
					<td></td>
					<td><span class="glyphicon glyphicon-ok"></span></td>
					<td><span class="glyphicon glyphicon-ok"></span></td>
				</tr>
				<tr>
					<th scope="row">CS</th>
					<td><span class="glyphicon glyphicon-ok"></span></td>
					<td><span class="glyphicon glyphicon-ok"></span></td>
					<td><span class="glyphicon glyphicon-ok"></span></td>
					<td><span class="glyphicon glyphicon-ok"></span></td>
				</tr>
				<tr>
					<th scope="row">EE</th>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
				</tr>
				<tr>
					<th scope="row">EMA</th>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
				</tr>
				<tr>
					<th scope="row">ENG</th>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
				</tr>
				<tr>
					<th scope="row">EP</th>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
				</tr>
				<tr>
					<th scope="row">GLE</th>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
				</tr>
				<tr>
					<th scope="row">IE</th>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
				</tr>
				<tr>
					<th scope="row">MatE</th>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
				</tr>
				<tr>
					<th scope="row">ME</th>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
				</tr>
				<tr>
					<th scope="row">ME</th>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
				</tr>
				<tr>
					<th scope="row">MS</th>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
				</tr>
				<tr>
					<th scope="row">MSE</th>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
				</tr>
				<tr>
					<th scope="row">NEEP</th>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
				</tr>
			</tbody>
		</table>
	</div>
</div>

<script src="../includes/js/functions.js"></script>
<script type="text/javascript">
	load_companies();
</script>

<?php include("../includes/page_bottom.php");?>

