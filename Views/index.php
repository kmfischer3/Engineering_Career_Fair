<?php require_once("../includes/session.php"); ?>
<?php require_once("../includes/db_connection.php"); ?>
<?php require_once("../includes/functions.php"); ?>
<?php include("../includes/page_top.php");?>
<?php include("../includes/loremipsum.php");?>

<div id="company_list" class="content">
</div>

<div id="company_profile" class="hidden">
	<div id="company_profile_name" class="jumbotron">
	</div>

	<div class="content">
	
		<div id="company_profile_day_list" class="list-group">
		</div>
		
		<div id="company_profile_degree_position_table">
		</div>
	
		<div id="company_profile_citizenship">
		</div>
	
	</div>
	

</div>

<script type="text/javascript">
	load_companies();
</script>

<?php include("../includes/page_bottom.php");?>

