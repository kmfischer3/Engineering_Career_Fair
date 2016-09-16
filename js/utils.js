var utils = {};

/*
 * Add the filters string to the header view, but only
 *   if filters (excluding day) have been selected.
 */
utils.display_filter_string = function(element) {
    var filter_string = get_filter_string();
    if ( filter_string != null ) {
        element.html("<small>Filters: " + filter_string + "</small>").show();
    } else {
        element.hide();
    }
}

utils.sort_companies = function(a, b) {
    if (data[a].name < data[b].name)
        return -1;
    else if (data[a].name > data[b].name)
        return 1;
    else
        return 0;
}

function get_day_string(day) {

    if ( day == 0 )
        return "Monday, Sept. 19";
    if ( day == 1 )
        return "Wednesday, Sept. 21";
    if ( day == 2 )
        return "Wednesday, Sept. 28";

    return "No Map Data";
}

function get_filter_string() {

	// loop through form elements, if element is checked, add it to the return string
	var filters = document.getElementById("filter");
    var ret_array = [];

    // Deg 1
    if ( filters.elements["AMEP_input"].checked )
        ret_array.push("AMEP");
    if ( filters.elements["AOS_input"].checked )
        ret_array.push("AOS");
    if ( filters.elements["ASPHYS_input"].checked )
        ret_array.push("ASPHYS");
    if ( filters.elements["BIOCHEM_input"].checked )
        ret_array.push("BIOCHEM");
    if ( filters.elements["BME_input"].checked )
        ret_array.push("BME");
    if ( filters.elements["BSE_input"].checked )
        ret_array.push("BSE");

    // Deg 2
    if ( filters.elements["CEE_input"].checked )
        ret_array.push("CEE");
    if ( filters.elements["CHE_input"].checked )
        ret_array.push("CHE");
    if ( filters.elements["CHEM_input"].checked )
        ret_array.push("CHEM");
    if ( filters.elements["CMPE_input"].checked )
        ret_array.push("CMPE");
    if ( filters.elements["CS_input"].checked )
        ret_array.push("CS");
    if ( filters.elements["ECT_input"].checked )
        ret_array.push("ECT");

    // Deg 3
    if ( filters.elements["EE_input"].checked )
        ret_array.push("EE");
    if ( filters.elements["EMA_input"].checked )
        ret_array.push("EMA");
    if ( filters.elements["ENG_input"].checked )
        ret_array.push("ENG");
    if ( filters.elements["ENVSCI_input"].checked )
        ret_array.push("ENVSCI");
    if ( filters.elements["EP_input"].checked )
        ret_array.push("EP");

    // Deg 4
    if ( filters.elements["FOODSCI_input"].checked )
        ret_array.push("FOODSCI");
    if ( filters.elements["GEO_input"].checked )
        ret_array.push("GEO");
    if ( filters.elements["GLE_input"].checked )
        ret_array.push("GLE");
    if ( filters.elements["IE_input"].checked )
        ret_array.push("IE");
    if ( filters.elements["LMS_input"].checked )
        ret_array.push("LMS");
    if ( filters.elements["MatE_input"].checked )
        ret_array.push("MatE");

    // Deg 5
    if ( filters.elements["MATH_input"].checked )
        ret_array.push("MATH");
    if ( filters.elements["ME_input"].checked )
        ret_array.push("ME");
    if ( filters.elements["MPHY_input"].checked )
        ret_array.push("MPHY");
    if ( filters.elements["MSandE_input"].checked )
        ret_array.push("MS&E");
    if ( filters.elements["MSE_input"].checked )
        ret_array.push("MSE");
    if ( filters.elements["NEEP_input"].checked )
        ret_array.push("NEEP");

    // Deg 6
    if ( filters.elements["OTM_input"].checked )
        ret_array.push("OTM");
    if ( filters.elements["PHM_input"].checked )
        ret_array.push("PHM");
    if ( filters.elements["PHY_input"].checked )
        ret_array.push("PHY");
    if ( filters.elements["STAT_input"].checked )
        ret_array.push("STAT");
    if ( filters.elements["TOX_input"].checked )
        ret_array.push("TOX");

    // Position
    if ( filters.elements["I_input"].checked )
        ret_array.push("Internship");
    if ( filters.elements["C_input"].checked )
        ret_array.push("Co-op");
    if ( filters.elements["E_input"].checked )
        ret_array.push("Entry Professional");
    if ( filters.elements["X_input"].checked )
        ret_array.push("Experienced Professional");

    // Citizen
    if ( filters.elements["US_input"].checked )
        ret_array.push("US Citizen");
    if ( filters.elements["PR_input"].checked )
        ret_array.push("Permanent US Resident");
    if ( filters.elements["VH_input"].checked )
        ret_array.push("Visa Holder");

    console.log(ret_array);

    if (ret_array.length != 0)
        return ret_array.join(", ");

    // return null if no filters selected.
    return null;

}
