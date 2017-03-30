describe('Company()', () => {
    it('should populate fields with the passed values', () => {
        var company = new Company('12', 'CompanyX', 'http://example.com/',
                                  'A company...', 'AAAA', [[], [1]]);
        expect(company.id).toBe('12');
        expect(company.name).toBe('CompanyX');
        expect(company.website).toBe('http://example.com/');
        expect(company.description).toBe('A company...');
        expect(company.attributes.constructor).toBe(BitPack);
        expect(company.tables).toEqual([[], [1]]);
    });
});

describe('Company.attends_on_day()', () => {
    it('should return true for days a company attends', () => {
        var company = new Company('a', 'a', 'a', 'a', 'AAAA',
                                  [[1], []]);
        expect(company.attends_on_day(0)).toBe(true);

        company = new Company('a', 'a', 'a', 'a', 'AAAA',
                              [[], [1]]);
        expect(company.attends_on_day(1)).toBe(true);
    });

    it('should return false for days the company does not attend', () => {
        var company = new Company('a', 'a', 'a', 'a', 'AAAA',
                                  [[1], []]);
        expect(company.attends_on_day(1)).toBe(false);
    });

    it('should return false for days outside of the range', () => {
        var company = new Company('a', 'a', 'a', 'a', 'AAAA',
                                  [[1], []]);
        expect(company.attends_on_day(2)).toBe(false);
    });
});

describe('Company.tables_on_day()', () => {
    it('shold return [] when not attending on given day', () => {
        var company = new Company('a', 'a', 'a', 'a', 'AAAA',
                                  [[1], []]);
        expect(company.tables_on_day(1)).toEqual([]);
        expect(company.tables_on_day(2)).toEqual([]);
    });

    it('should return an array containing the tables for a given day', () => {
        var company = new Company('a', 'a', 'a', 'a', 'AAAA',
                                  [[1, 2], [3]]);
        expect(company.tables_on_day(0)).toEqual([1, 2]);
        expect(company.tables_on_day(1)).toEqual([3]);
    });
});

describe('Company.get_work_authorization()', () => {
    it('should return "No info submitted" when no auth bits are set', () => {
        var company = new Company('a', 'a', 'a', 'a', 'AAAA', []);
        expect(company.get_work_authorization()).toBe('No info submitted');
    });

    it('should return coresponding auth string with a single bit set', () => {
        var company = new Company('a', 'a', 'a', 'a', 'gAAA', []);
        expect(company.get_work_authorization()).toBe('US Citizen');

        company = new Company('a', 'a', 'a', 'a', 'QAAA', []);
        expect(company.get_work_authorization()).toBe('US Permanent Resident');

        company = new Company('a', 'a', 'a', 'a', 'IAAA', []);
        expect(company.get_work_authorization()).toBe('Visa Holder');
    });

    it('should return multiple work auth strings with commas', () => {
        var company = new Company('a', 'a', 'a', 'a', 'wAAA', []);
        expect(company.get_work_authorization()).toBe(
            'US Citizen, US Permanent Resident'
        );

        company = new Company('a', 'a', 'a', 'a', 'YAAA', []);
        expect(company.get_work_authorization()).toBe(
            'US Permanent Resident, Visa Holder'
        );
    });
});
