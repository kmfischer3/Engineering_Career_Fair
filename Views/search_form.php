<?php require_once("../includes/functions.php"); ?>
<?php include("../includes/page_top.php");?>

<div class="content">
	
	<p id="print_search_term"></p>
	<p id="print_encoded_filters"></p>

	<br><br>
	
	<form id="search" class="form-inline">
		<div class="form-group">
			<input type="text" class="form-control" placeholder="Search Companies" id="searchterm">
		</div>
		<input type="submit" class="btn btn-default">
	</form>
	
	<br><br>
	
	<form id="filter" class="form">
		<div class="row">
			<label for="degree_filters_1" class="col-xs-4">Degree:</label>
			<div class="col-xs-8">
				<div class="form-group">
					<div class="checkbox">
						<label><input type="checkbox" id="BME_input">BME</label>
					</div>
					<div class="checkbox">
						<label><input type="checkbox" id="BSE_input">BSE</label>
					</div>
					<div class="checkbox">
						<label><input type="checkbox" id="CEE_input">CEE</label>
					</div>
					<div class="checkbox">
						<label><input type="checkbox" id="CHE_input">CHE</label>
					</div>
					<div class="checkbox">
						<label><input type="checkbox" id="CMPE_input">CMPE</label>
					</div>
					<div class="checkbox">
						<label><input type="checkbox" id="CS_input">CS</label>
					</div>
					<div class="checkbox">
						<label><input type="checkbox" id="EE_input">EE</label>
					</div>
					<div class="checkbox">
						<label><input type="checkbox" id="EMA_input">EMA</label>
					</div>
					<div class="checkbox">
						<label><input type="checkbox" id="ENG_input">ENG</label>
					</div>
					<div class="checkbox">
						<label><input type="checkbox" id="EP_input">EP</label>
					</div>
					<div class="checkbox">
						<label><input type="checkbox" id="GLE_input">GLE</label>
					</div>
					<div class="checkbox">
						<label><input type="checkbox" id="IE_input">IE</label>
					</div>
					<div class="checkbox">
						<label><input type="checkbox" id="MatE_input">MatE</label>
					</div>
					<div class="checkbox">
						<label><input type="checkbox" id="ME_input">ME</label>
					</div>
					<div class="checkbox">
						<label><input type="checkbox" id="MS_input">MS</label>
					</div>
					<div class="checkbox">
						<label><input type="checkbox" id="MSE_input">MSE</label>
					</div>
					<div class="checkbox">
						<label><input type="checkbox" id="NEEP_input">NEEP</label>
					</div>
				</div>
			</div>
		</div>
		
		<br><br>
		
		<div class="row">
				<label for="position_filters" class="col-xs-4">Position Type:</label>
				<div class="col-xs-8">
					<div class="form-group">
						<div class="checkbox">
							<label><input type="checkbox" id="I_input">Internship</label>
						</div>
						<div class="checkbox">
							<label><input type="checkbox" id="C_input">Co-Op</label>
						</div>
						<div class="checkbox">
							<label><input type="checkbox" id="E_input">Entry Professional</label>
						</div>
						<div class="checkbox">
							<label><input type="checkbox" id="X_input">Experienced Professional</label>
						</div>
					</div>
				</div>
		</div>
		
		<br><br>
		
		<div class="row">
				<label for="citizenship_filters" class="col-xs-4">Citizenship:</label>
				<div class="col-xs-8">
					<div class="form-group">
						<div class="checkbox">
							<label><input type="checkbox" id="US_input">US Citizen</label>
						</div>
						<div class="checkbox">
							<label><input type="checkbox" id="PR_input">US Permanent Resident</label>
						</div>
						<div class="checkbox">
							<label><input type="checkbox" id="VH_input">Visa Holder</label>
						</div>
					</div>
				</div>
		</div>
		<input type="submit" class="btn btn-default">
	</form>

</div>

<?php include("../includes/button-add.html");?>
<?php include("../includes/page_bottom.php");?>
