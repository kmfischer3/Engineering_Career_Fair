<?php require_once("../includes/session.php"); ?>
<?php require_once("../includes/db_connection.php"); ?>
<?php require_once("../includes/functions.php"); ?>
<?php include("../includes/page_top.php");?>

<script type="text/javascript">

	var data = <?php echo get_company_db_json(); ?>;

</script>

<div id="company_list" class="content">
</div>

<script type="text/javascript">

var content_div = document.getElementById("company_list");

for (var i = 0; i < data.length; i++) {
	console.log(i);

	var id 		= data[i]['id'];
	var name 	= data[i]['name'];

	var div = document.createElement("div");
	var media_body = document.createElement("div");
	var h4 = document.createElement("h4");
	h4.class = "media-heading";
	h4.innerHTML = name;
	
	div.appendChild(media_body)
	media_body.appendChild(h4);

	content_div.appendChild(div);
}

</script>

<?php include("../includes/page_bottom.php");?>

