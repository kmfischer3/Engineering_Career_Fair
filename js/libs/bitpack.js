function BitPack(data, b64) {
    if (b64 == undefined) {
        b64 = true;
    }

    if (b64) {
        try {
            this.data = atob(data);
        } catch (InvalidCharacterError) {
            this.data = '';
        }
    } else {
        this.data = data;
    }
}

BitPack.prototype.byteAt = function(index) {
    if (index >= this.len() || index < 0) {
        throw new RangeError();
    }
    return this.data.charCodeAt(index) & 0xff;
};

BitPack.prototype.setByte = function(index, value) {
    if (index >= this.len() || index < 0) {
        throw new RangeError();
    }
    this.data = this.data.substr(0, index) + String.fromCharCode(value) +
        this.data.substr(index + 1);    
};

BitPack.prototype.bitAt = function(index, bitIndex) {
    if (bitIndex == undefined) {
        bitIndex = index % 8;
        index = Math.floor(index / 8);
    }

    if (this.byteAt(index) & (0x80 >> bitIndex)) {
        return true;
    }

    return false;
};

BitPack.prototype.setBit = function(index, bitIndex, value) {
    if (value == undefined) {
        value = bitIndex;
        bitIndex = index % 8;
        index = Math.floor(index / 8);
    }

    var byte = this.byteAt(index);
    if (value) {
        byte |= 0x80 >> bitIndex;
    } else {
        byte ^= 0x80 >> bitIndex;
    }

    this.setByte(index, byte);
};

BitPack.prototype.len = function() {
    return this.data.length;
};

BitPack.prototype.or = function(pack, index) {
    index = index | 0;

    // if this reads past the end of our data, throw a range error
    if (pack.len() > index + this.len()) {
        throw new RangeError();
    }

    var resultData = '';
    for (var i = 0; i < pack.len(); i++) {
        resultData += String.fromCharCode(
            this.byteAt(index + i) | pack.byteAt(i)
        );
    }

    return new BitPack(resultData, false);
};

BitPack.prototype.boolOr = function(pack, index) {
    index = index | 0;

    // oring with an empty pack should always return true.
    if (pack.len() == 0) {
        return true;
    }

    // if this check reads past the end of our data, return false
    if (index + pack.len() > this.len()) {
        return false;
    }

    
    for (var i = 0; i < pack.len(); i++) {
        if (this.byteAt(index + i) | pack.byteAt(i)) {
            return true;
        }
    }
    return false;
};

BitPack.prototype.and = function(pack, index) {
    index = index | 0;

    // if this reads past the end of our data, throw a range error
    if (pack.len() > index + this.len()) {
        throw new RangeError();
    }

    var resultData = '';
    for (var i = 0; i < pack.len(); i++) {
        resultData += String.fromCharCode(
            this.byteAt(index + i) & pack.byteAt(i)
        );
    }

    return new BitPack(resultData, false);
};

BitPack.prototype.boolAnd = function(pack, index) {
    index = index | 0;

    // anding with an empty pack should always return true.
    if (pack.len() == 0) {
        return true;
    }

    // if this reads past the end of our data, throw a range error
    if (index + pack.len() > this.len()) {
        throw new RangeError();
    }
    
    for (var i = 0; i < pack.len(); i++) {
        if (this.byteAt(index + i) & pack.byteAt(i)) {
            return true;
        }
    }
    return false;
};

BitPack.prototype.slice = function(start, end) {
    return new BitPack(this.data.slice(start, end), false);
};
