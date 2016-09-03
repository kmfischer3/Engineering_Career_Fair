<?php

if ( !empty($_SESSION['degree_mask']) || !empty($_SESSION['position_mask']) || !empty($_SESSION['citizenship_mask']) || ( !empty($_SESSION['search_term']) ) {

	echo "<a href=\"#\" style=\"color:red;\" onclick=\"submitForm(0, '');\"><span class=\"glyphicon glyphicon-remove\" aria-hidden=\"true\"></span> clear filters</a>";

}

?>
