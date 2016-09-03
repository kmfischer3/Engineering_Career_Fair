<?php require_once("../includes/session.php"); ?>
<?php

	//$_SESSION['attributes'] = 0;
	//$_SESSION['searchterm'] = null;

	//set session vars to user's search criteria (if any), or clear all (if none)

	$_SESSION['degree_mask'] = ( isset($_GET['degree_mask']) ) ? (int)$_GET['degree_mask'] : 0);
	$_SESSION['position_mask'] = ( isset($_GET['position_mask']) ) ? (int)$_GET['position_mask'] : 0);
	$_SESSION['citizenship_mask'] = ( isset($_GET['citizenship_mask']) ) ? (int)$_GET['citizenship_mask'] : 0);

	//$_SESSION['search_term'] = ( isset($_GET['search_term']) ) ? $_GET['search_term'] : '');
	$_SESSION['search_term'] = ( isset($_GET['search_term']) ) ? $_GET['search_term'] : null);

	
	//for debugging:
	echo '<pre>';
		var_dump($_SESSION);
	echo '</pre>';

?>
