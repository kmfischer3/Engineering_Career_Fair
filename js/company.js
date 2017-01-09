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
 * Gets the long description for a company from a server and calls the
 * provided callback function with the description. It will cache the
 * description locally to prevent future server hits.
 */
Company.prototype.get_long_description = function(callback) {
    if (this.long_description_loaded) {
        callback(this.long_description);
    }

    // TODO: download long description over the network, then cache it
    //   and return it.
    console.log('Company.get_long_description() not implemented');
};

