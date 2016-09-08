<?php
 header('Content-type: text/javascript');
 require_once("db_connection.php");
 require_once("functions.php");
?>
var data = <?php echo get_company_db_json(); ?>;
