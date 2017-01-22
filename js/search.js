function search_init() {
    $( "#search" ).submit(function( event ) {
        var result = search_companies( $("#searchterm").val() );
        $('#navbar-collapse-1').collapse('hide');
        view("display_companies_list", {
            company_ids: result,
            search: true,
            source: SOURCE_SEARCH
        });
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
}

function encode_degree_input() {
    var filters = document.getElementById("filter");

    var bitpack = BITPACK_DEGREES_EMPTY.slice(0);
    var degree_selected = false;

    MAJORS.forEach(function(major) {
        var major_index = MAJOR_INDEXES[major];
        if (filters.elements[major + '_input'].checked) {
            degree_selected = true;
            for (var i = 0; i < POSITION_OFFSETS.length; i++) {
                bitpack.setBit(major_index + i, true);
            }
        }
    });

    // If no option checked, don't filter on this field.
    if (!degree_selected) {
        return BITPACK_DEGREES_ALL.slice(0);
    }

    return bitpack;
}

function encode_position_input() {
    var filters = document.getElementById("filter");
    var bitpack = BITPACK_DEGREES_EMPTY.slice(0);

    // If no option checked, don't filter on this field.
    if (!filters.elements['I_input'].checked &&
        !filters.elements['C_input'].checked &&
        !filters.elements['E_input'].checked &&
        !filters.elements['X_input'].checked) {
        return BITPACK_DEGREES_ALL.slice(0);
    }

    // Set mask with selected filters
    var major;
    if (filters.elements['I_input'].checked) {
        for (major in MAJOR_INDEXES) {
            bitpack.setBit(MAJOR_INDEXES[major] + I_OFFSET);
        }
    }
    if (filters.elements['C_input'].checked) {
        for (major in MAJOR_INDEXES) {
            bitpack.setBit(MAJOR_INDEXES[major] + C_OFFSET);
        }
    }
    if (filters.elements['E_input'].checked) {
        for (major in MAJOR_INDEXES) {
            bitpack.setBit(MAJOR_INDEXES[major] + E_OFFSET);
        }
    }
    if (filters.elements['X_input'].checked) {
        for (major in MAJOR_INDEXES) {
            bitpack.setBit(MAJOR_INDEXES[major] + X_OFFSET);
        }
    }

    return bitpack;
}

function encode_citizenship_input() {
    var filters = document.getElementById("filter");
    var bitpack = BITPACK_WORK_AUTH_EMPTY.slice(0);

    // If no option checked, don't filter on this field.
    if (!filters.elements['US_input'].checked &&
        !filters.elements['PR_input'].checked &&
        !filters.elements['VH_input'].checked) {
        return BITPACK_WORK_AUTH_ALL.slice(0);
    }

    // Set mask with selected filters
    if (filters.elements['US_input'].checked)
        bitpack.setBit(US_INDEX, true);
    if (filters.elements['PR_input'].checked)
        bitpack.setBit(PR_INDEX, true);
    if (filters.elements['VH_input'].checked)
        bitpack.setBit(VH_INDEX, true);

    return bitpack;
}

function filter_by_day(day) {
    var results = [];

    for (var company_id in data) {
        var company = data[company_id];
        // TODO: don't generate the company object here
        company = new Company(company_id, company.name, company.website, company.description,
                              'gAAAAAAAAQAAAArAAAAAAAAyAAAAAAzAAAAAAAAA', [[1], [2]]);

        if (company.attends_on_day(day))
            results.push(company_id);
    }

    results.sort(utils.sort_companies);

    return results;
}

function filter_companies(degree_pack, position_pack, authorization_pack, day) {

    console.log({
        degree_pack: degree_pack,
        position_pack: position_pack,
        authorization_pack: authorization_pack,
        day: day
    });

    /*
    if (degree_masks[0] === -1 && degree_masks[1] === -1 && degree_masks[2] === -1 &&
        degree_masks[3] === -1 && degree_masks[4] === -1 && degree_masks[5] === -1 &&
        position_mask === -1 && citizenship_mask === -1) {
        return {
            day: day,
            company_ids: filter_by_day(day),
            source: SOURCE_FILTER
        };
    }
    */

    // Combine position and degree masks
    var degree_position_pack = degree_pack.and(position_pack);

    // Find matching results
    results = [];
    for (var company_id in data) {
        company = data[company_id];
        // TODO: don't generate the company object here
        company = new Company(company_id, company.name, company.website, company.description,
                              'gAAAAAAAAQAAAArAAAAAAAAyAAAAAAzAAAAAAAAA', [[1], [2]]);

        // If the degree_position_pack BitPack is empty, don't filter by
        //   the degree and position information. Otherwise, ensure that at
        //   least one selected degree-position combination matches.
        //   Note that degree_position_pack should never be all zeros because
        //   the encoding functions return all ones if the result is empty.
        // If the authorization_pack BitPack's first byte is zero, it means
        //   that no work authorization information was selected for filtering,
        //   so we ignore it. Otherwise, at least one selected position must
        //   match.
        // Finally, check that the company attends on the selected day. If
        //   not, omit them from the results.
        // (!degree_position_pack.boolOr(BITPACK_DEGREES_EMPTY, 1) ||
        if ((company.attributes.boolAnd(degree_position_pack, 1)) &&
            (authorization_pack.byteAt(0) == 0 || company.attributes.boolAnd(authorization_pack)) &&
            (company.attends_on_day(day))) {
            results.push(company_id);
        }
    }

    results.sort(utils.sort_companies);

    var view_options =
        {
            day: day,
            company_ids: results,
            source: SOURCE_FILTER
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
