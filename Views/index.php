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

	for (var company_id in data) {
		var company = data[company_id];

		var a = document.createElement("a");
		a.href = "#";
		$(a).click(company.id, function(e) {
			company_id = e.data;
			load_company_profile(company_id);
		});
		a.className = "list-group-item";

		var h4 = document.createElement("h4");
		h4.className = "list-group-item-heading";
		h4.appendChild(document.createTextNode(company.name));

		var p = document.createElement("p");
		p.className = "list-group-item-text";
		p.appendChild(document.createTextNode(company.description));

		div.appendChild(a);
		a.appendChild(h4);
		a.appendChild(p);
	}

	content_div.appendChild(div);


</script>

<?php include("../includes/page_bottom.php");?>

