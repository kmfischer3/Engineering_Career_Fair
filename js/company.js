function Company(id, name, website, description, attributes, tables) {
    this.id = id;
    this.name = name;
    this.website = website;
    this.description = description;
    this.attributes = new BitPack(attributes);
    this.tables = tables;

    this.long_description = '';
    this.long_description_loaded = false;
}

/**
 * Returns true if the company attends the career fair on the given day
 * index. Returns false otherwise.
 */
Company.prototype.attends_on_day = function(day) {
    // If the index is outside of our tables array, return false.
    //   (The array of days may be truncated.)
    if (day >= this.tables.length) {
        return false;
    }

    if (this.tables[day].length > 0) {
        return true;
    }

    return false;
};

/**
 * Returns an array of tabe numbers that a company will be present at
 *   on the given day index.
 * Returns an empty array if the company does not attend on the given
 *   day index.
 */
Company.prototype.tables_on_day = function(day) {
    if (day >= this.tables.length) {
        return [];
    }

    return this.tables[day];
};

/**
 * Gets the profile description for a company from a server and calls
 * the provided callback function with the description. It will cache
 * the description locally to prevent future server hits.
 */
Company.prototype.get_profile_description = function(callback) {
    if (this.long_description_loaded) {
        callback(this.long_description);
    }

    $.ajax('/static/descriptions/' + this.id.toString() + '.html')
        .done(function(data) {
            this.long_description = data;
            this.long_description_loaded = true;
            callback(data);
        })
        .fail(function(data) {
            callback('<p>Loading description failed. Sorry :(</p>');
        });
};

Company.prototype.get_work_authorization = function() {
    var response = [];

    if (this.attributes.bitAt(US_MASK))
        response.push('US Citizen');
    if (this.attributes.bitAt(PR_MASK))
        response.push('US Permanent Resident');
    if (this.attributes.bitAt(VH_MASK))
        response.push('Visa Holder');

    if (response.length == 0)
        return 'No info submitted';

    return response.join(', ');
};
