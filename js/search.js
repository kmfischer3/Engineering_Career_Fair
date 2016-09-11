$( document ).ready(function() {
    $( "#search" ).submit(function( event ) {
        var result = search_companies( $("#searchterm").val() );
        $('#navbar-collapse-1').collapse('hide');
        view("display_companies_list", result);
        event.preventDefault();
    });

    $( "#filter" ).submit(function( event ) {

        var degree_masks = encode_degree_input();
        var position_mask = encode_position_input();
        var citizenship_mask = encode_citizenship_input();
        $('#navbar-collapse-1').collapse('hide');
        filter_companies(degree_masks, position_mask, citizenship_mask);
        
        event.preventDefault();
    });
});

function encode_degree_input() {

    var filters = document.getElementById("filter");

    var degree_mask_1 = 0;    // BME  -> CS
    var degree_mask_2 = 0;    // EE   -> IE
    var degree_mask_3 = 0;    // MatE -> NEEP


    /* ENCODE DEGREE MASK 1 */
    
    if ( filters.elements["BME_input"].checked ) {
        degree_mask_1 = (degree_mask_1 | BME_mask);
    }  
    if ( filters.elements["BSE_input"].checked ) {
        degree_mask_1 = (degree_mask_1 | BSE_mask);
    }
    if ( filters.elements["CEE_input"].checked ) {
        degree_mask_1 = (degree_mask_1 | CEE_mask);
    }
    if ( filters.elements["CHE_input"].checked ) {
        degree_mask_1 = (degree_mask_1 | CHE_mask);
    }
    if ( filters.elements["CMPE_input"].checked ) {
        degree_mask_1 = (degree_mask_1 | CMPE_mask);
    }
    if ( filters.elements["CS_input"].checked ) {
        degree_mask_1 = (degree_mask_1 | CS_mask);
    }
    
    
    /* ENCODE DEGREE MASK 2 */

    if ( filters.elements["EE_input"].checked ) {
        degree_mask_2 = (degree_mask_2 | EE_mask);
    }  
    if ( filters.elements["EMA_input"].checked ) {
        degree_mask_2 = (degree_mask_2 | EMA_mask);
    }
    if ( filters.elements["ENG_input"].checked ) {
        degree_mask_2 = (degree_mask_2 | ENG_mask);
    }
    if ( filters.elements["EP_input"].checked ) {
        degree_mask_2 = (degree_mask_2 | EP_mask);
    }
    if ( filters.elements["GLE_input"].checked ) {
        degree_mask_2 = (degree_mask_2 | GLE_mask);
    }
    if ( filters.elements["IE_input"].checked ) {
        degree_mask_2 = (degree_mask_2 | IE_mask);
    }
    
    
    /* ENCODE DEGREE MASK 3 */
    
    if ( filters.elements["MatE_input"].checked ) {
        degree_mask_3 = (degree_mask_3 | MatE_mask);
    }  
    if ( filters.elements["ME_input"].checked ) {
        degree_mask_3 = (degree_mask_3 | ME_mask);
    }
    if ( filters.elements["MS_input"].checked ) {
        degree_mask_3 = (degree_mask_3 | MS_mask);
    }
    if ( filters.elements["MSE_input"].checked ) {
        degree_mask_3 = (degree_mask_3 | MSE_mask);
    }
    if ( filters.elements["NEEP_input"].checked ) {
        degree_mask_3 = (degree_mask_3 | NEEP_mask);
    }
    
    console.log("degree_1: " + degree_mask_1); 
    console.log("degree_2: " + degree_mask_2); 
    console.log("degree_3: " + degree_mask_3);
    
    return [degree_mask_1, degree_mask_2, degree_mask_3];

}
function encode_position_input() {

    var filters = document.getElementById("filter");
    
    var position_mask = 0;    // I,C,E,X
    

    /* ENCODE POSITION MASK */
    
    if ( filters.elements["I_input"].checked ) {
        position_mask = (position_mask | I_mask);
    }  
    if ( filters.elements["C_input"].checked ) {
        position_mask = (position_mask | C_mask);
    }
    if ( filters.elements["E_input"].checked ) {
        position_mask = (position_mask | E_mask);
    }
    if ( filters.elements["X_input"].checked ) {
        position_mask = (position_mask | X_mask);
    }
    
    console.log("position: " + position_mask);
    
    return position_mask;
    
}
function encode_citizenship_input() {

    var filters = document.getElementById("filter");
    
    var citizenship_mask = 0;  // US,PR,VH
    
    
    /* ENCODE CITIZEN MASK */
    
    if ( filters.elements["US_input"].checked ) {
        citizenship_mask = (citizenship_mask | US_mask);
    }  
    if ( filters.elements["PR_input"].checked ) {
        citizenship_mask = (citizenship_mask | PR_mask);
    }
    if ( filters.elements["VH_input"].checked ) {
        citizenship_mask = (citizenship_mask | VH_mask);
    }

    console.log("citizenship: " + citizenship_mask);
    
    return citizenship_mask;
    
}

function filter_companies(degree_masks, position_mask, citizenship_mask) {

    if (citizenship_mask == 0) {
        citizenship_mask = -1;
    }
    
    if (position_mask == 0) {
        position_mask = -1;
    }
    /*
     if ( (degree_masks[0] == 0) && (degree_masks[1] == 0) && (degree_masks[2] == 0) ) {
     degree_masks[0] == -1;
     degree_masks[1] == -1;
     degree_masks[2] == -1;
     }
     */

    for (i=0; i<degree_masks.length; i++) {
        console.log(degree_masks[i]);
    }
    console.log(position_mask);
    console.log(citizenship_mask);
    
    var degree_mask_1 = ( degree_masks[0] & position_mask );
    var degree_mask_2 = ( degree_masks[1] & position_mask );
    var degree_mask_3 = ( degree_masks[2] & position_mask );
    
    results = [];
    for (var company_id in data) {
        
        company = data[company_id];

        if ( (company.citizen_mask & citizenship_mask) != 0 &&
             ((company.degree_mask_1 & degree_mask_1) != 0 ||
              (company.degree_mask_2 & degree_mask_2) != 0 ||
              (company.degree_mask_3 & degree_mask_3) != 0)) {
            results.push(company_id);
        }
        
    }
    
    view("display_companies_list", results);
    
    console.log(results);

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
