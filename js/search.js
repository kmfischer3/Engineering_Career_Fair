$( document ).ready(function() {
    $( "#search" ).submit(function( event ) {
        var result = search_companies( $("#searchterm").val() );
        $('#navbar-collapse-1').collapse('hide');
        view("display_companies_list", {company_ids: result, search: true});
        event.preventDefault();
    });

    $( "#filter" ).submit(function( event ) {

        var degree_masks = encode_degree_input();
        var position_mask = encode_position_input();
        var citizenship_mask = encode_citizenship_input();
        var day = get_day_input();
        $('#navbar-collapse-1').collapse('hide');
        var view_options = filter_companies(degree_masks, position_mask, citizenship_mask, day);
        //display_companies_map(view_options);
        view("display_companies_list", view_options);
        event.preventDefault();
    });
});

function encode_degree_input() {

    var filters = document.getElementById("filter");

    var degree_mask_1 = 0;
    var degree_mask_2 = 0;
    var degree_mask_3 = 0;
    var degree_mask_4 = 0;
    var degree_mask_5 = 0;
    var degree_mask_6 = 0;

    // Encode the degrees in the first mask
    if ( filters.elements["AMEP_input"].checked )
        degree_mask_1 |= AMEP_mask;
    if ( filters.elements["AOS_input"].checked )
        degree_mask_1 |= AOS_mask;
    if ( filters.elements["ASPHYS_input"].checked )
        degree_mask_1 |= ASPHYS_mask;
    if ( filters.elements["BIOCHEM_input"].checked )
        degree_mask_1 |= BIOCHEM_mask;
    if ( filters.elements["BME_input"].checked )
        degree_mask_1 |= BME_mask;
    if ( filters.elements["BSE_input"].checked )
        degree_mask_1 |= BSE_mask;

    // Encode the degrees in the second mask
    if ( filters.elements["CEE_input"].checked )
        degree_mask_2 |= CEE_mask;
    if ( filters.elements["CHE_input"].checked )
        degree_mask_2 |= CHE_mask;
    if ( filters.elements["CHEM_input"].checked )
        degree_mask_2 |= CHEM_mask;
    if ( filters.elements["CMPE_input"].checked )
        degree_mask_2 |= CMPE_mask;
    if ( filters.elements["CS_input"].checked )
        degree_mask_2 |= CS_mask;
    if ( filters.elements["ECT_input"].checked )
        degree_mask_2 |= ECT_mask;

    // Encode the degrees in the third mask
    if ( filters.elements["EE_input"].checked )
        degree_mask_3 |= EE_mask;
    if ( filters.elements["EMA_input"].checked )
        degree_mask_3 |= EMA_mask;
    if ( filters.elements["ENG_input"].checked )
        degree_mask_3 |= ENG_mask;
    if ( filters.elements["ENVSCI_input"].checked )
        degree_mask_3 |= ENVSCI_mask;
    if ( filters.elements["EP_input"].checked )
        degree_mask_3 |= EP_mask;
        
    // Encode the degrees in the fourth mask
    if ( filters.elements["FOODSCI_input"].checked )
        degree_mask_4 |= FOODSCI_mask;
    if ( filters.elements["GEO_input"].checked )
        degree_mask_4 |= GEO_mask;
    if ( filters.elements["GLE_input"].checked )
        degree_mask_4 |= GLE_mask;
    if ( filters.elements["IE_input"].checked )
        degree_mask_4 |= IE_mask;
    if ( filters.elements["LMS_input"].checked )
        degree_mask_4 |= LMS_mask;
    if ( filters.elements["MatE_input"].checked )
        degree_mask_4 |= MatE_mask;

    // Encode the degrees in the fifth mask
    if ( filters.elements["MATH_input"].checked )
        degree_mask_5 |= MATH_mask;
    if ( filters.elements["ME_input"].checked )
        degree_mask_5 |= ME_mask;
    if ( filters.elements["MPHY_input"].checked )
        degree_mask_5 |= MPHY_mask;
    if ( filters.elements["MS_input"].checked )
        degree_mask_5 |= MS_mask;
    if ( filters.elements["MSE_input"].checked )
        degree_mask_5 |= MSE_mask;
    if ( filters.elements["NEEP_input"].checked )
        degree_mask_5 |= NEEP_mask;

    // Encode the degrees in the sixth mask
    if ( filters.elements["OTM_input"].checked )
        degree_mask_6 |= OTM_mask;
    if ( filters.elements["PHM_input"].checked )
        degree_mask_6 |= PHM_mask;
    if ( filters.elements["PHY_input"].checked )
        degree_mask_6 |= PHY_mask;
    if ( filters.elements["STAT_input"].checked )
        degree_mask_6 |= STAT_mask;
    if ( filters.elements["TOX_input"].checked )
        degree_mask_6 |= TOX_mask;

    // If no degrees selected, match all results
    if (degree_mask_1 === 0 && degree_mask_2 === 0 && degree_mask_3 === 0 && degree_mask_4 === 0 && degree_mask_5 === 0 && degree_mask_6 === 0)
        return [-1, -1, -1, -1, -1, -1];

    return [degree_mask_1, degree_mask_2, degree_mask_3, degree_mask_4, degree_mask_5, degree_mask_6];

}

function encode_position_input() {

    var filters = document.getElementById("filter");
    var position_mask = 0;    // I,C,E,X

    // Set mask with selected filters
    if ( filters.elements["I_input"].checked )
        position_mask |= I_mask;
    if ( filters.elements["C_input"].checked )
        position_mask |= C_mask;
    if ( filters.elements["E_input"].checked )
        position_mask |= E_mask;
    if ( filters.elements["X_input"].checked )
        position_mask |= X_mask;

    // If no filters selected, match all results
    if ( position_mask === 0 )
        return -1;

    return position_mask;

}
function encode_citizenship_input() {

    var filters = document.getElementById("filter");
    var citizenship_mask = 0;  // US,PR,VH

    // Set mask with selected filters
    if ( filters.elements["US_input"].checked )
        citizenship_mask |= US_mask;
    if ( filters.elements["PR_input"].checked )
        citizenship_mask |= PR_mask;
    if ( filters.elements["VH_input"].checked )
        citizenship_mask |= VH_mask;

    // If no filters selected, match all results
    if ( citizenship_mask === 0 )
        return -1;

    return citizenship_mask;

}

function filter_companies(degree_masks, position_mask, citizenship_mask, day_input) {

    console.log({
        degree_masks: degree_masks,
        position_mask: position_mask,
        citizenship_mask: position_mask
    });

    // Combine position and degree masks
    var degree_mask_1 = ( degree_masks[0] & position_mask );
    var degree_mask_2 = ( degree_masks[1] & position_mask );
    var degree_mask_3 = ( degree_masks[2] & position_mask );
    var degree_mask_4 = ( degree_masks[3] & position_mask );
    var degree_mask_5 = ( degree_masks[4] & position_mask );
    var degree_mask_6 = ( degree_masks[5] & position_mask );

    // Find matching results
    results = [];
    for (var company_id in data) {
        company = data[company_id];

        if ( (company.citizen_mask & citizenship_mask) != 0 &&
             ((company.degree_mask_1 & degree_mask_1) != 0 ||
              (company.degree_mask_2 & degree_mask_2) != 0 ||
              (company.degree_mask_3 & degree_mask_3) != 0 ||
              (company.degree_mask_4 & degree_mask_4) != 0 ||
              (company.degree_mask_5 & degree_mask_5) != 0 ||
              (company.degree_mask_6 & degree_mask_6) != 0) &&
             company.tables[day_input] != null ) {
                 results.push(company_id);
             }
    }

    var view_options =
        {
            day: day_input,
            company_ids: results
        };

    return view_options;
}

function get_day_input() {

    if ( document.getElementById("day0").checked ) {
        return 0;
    }
    if ( document.getElementById("day1").checked ) {
        return 1;
    }
    if ( document.getElementById("day2").checked ) {
        return 2;
    }

    return -1;

}

/*
 * Split the search keywords by space characters. Any company that
 * includes one of these keywords in its name will have its ID included
 * in the result set.
 */
function search_companies(keywords) {
    keywords = keywords.toLowerCase();
    terms = keywords.split(" ");

    results = [];
    terms.forEach(function(term, index, array) {
        for (var company_id in data) {
            company = data[company_id];
            if (company.name.toLowerCase().indexOf(term) != -1) {
                if (results.indexOf(company_id) == -1) {
                    results.push(company_id);
                }
            }
        }
    });

    return results;
}
