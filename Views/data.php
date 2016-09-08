<?php
 header('Content-type: text/javascript');
 require_once("../includes/db_connection.php"); 
 require_once("../includes/functions.php");
?>
var data = <?php echo get_company_db_json(); ?>;
var map_data = <?php echo get_day_company_booth_db_json(); ?>;
