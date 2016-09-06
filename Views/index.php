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
<div id="company_profile" class="content hidden"> this is the company profile
</div>

<script src="../includes/js/functions.js"></script>
<script type="text/javascript">
	load_companies();
</script>

<?php include("../includes/page_bottom.php");?>

