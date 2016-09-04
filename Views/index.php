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

	var content_div = document.getElementById("company_list");
	var div = document.createElement("div");
	div.className = "list-group";

	for (var i = 0; i < data.length; i++) {

		var id 		= data[i]['id'];
		var name 	= data[i]['name'];
		var desc 	= "<?php echo $lorem_med; ?>";

		var a = document.createElement("a");
		a.href = "#";
		$(a).click(i, function(e) {
			company_index = e.data;
			load_company_profile(company_index);
		});
		a.className = "list-group-item";

		var h4 = document.createElement("h4");
		h4.className = "list-group-item-heading";
		h4.appendChild(document.createTextNode(name));

		var p = document.createElement("p");
		p.className = "list-group-item-text";
		p.appendChild(document.createTextNode(desc));
	
		div.appendChild(a);
		a.appendChild(h4);
		a.appendChild(p);

	}

	content_div.appendChild(div);


</script>

<?php include("../includes/page_bottom.php");?>

