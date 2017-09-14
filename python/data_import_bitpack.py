#! /usr/bin/env python3
import csv
import json

import bitpack
import rigidity

import utils
import constants
from constants import *
from validators import FixDescription, ValidatePositions, UrlValidator

rules = {
    'name': [rigidity.rules.Unique()],
    'website': [rigidity.rules.Lower(), UrlValidator()],
    'description': [FixDescription()],

    'citizenship': [rigidity.rules.Lower()],
    'day': [rigidity.rules.ReplaceValue(replacements={
        '9/14/2017': 0,
        '9/18/2017': 1,
        '9/20/2017': 2,
    }, missing_action=rigidity.rules.ReplaceValue.ACTION_ERROR)],

    'TABLEID': [],

    'AMEP': [rigidity.rules.Lower(), ValidatePositions()],
    'AOS': [rigidity.rules.Lower(), ValidatePositions()],
    'ASPHYS': [rigidity.rules.Lower(), ValidatePositions()],
    'BIOCHEM': [rigidity.rules.Lower(), ValidatePositions()],
    'BME': [rigidity.rules.Lower(), ValidatePositions()],

    'BSE': [rigidity.rules.Lower(), ValidatePositions()],
    'CEE': [rigidity.rules.Lower(), ValidatePositions()],
    'CHE': [rigidity.rules.Lower(), ValidatePositions()],
    'CHEM': [rigidity.rules.Lower(), ValidatePositions()],
    'CMPE': [rigidity.rules.Lower(), ValidatePositions()],

    'CS': [rigidity.rules.Lower(), ValidatePositions()],
    'ECT': [rigidity.rules.Lower(), ValidatePositions()],
    'EE': [rigidity.rules.Lower(), ValidatePositions()],
    'EMA': [rigidity.rules.Lower(), ValidatePositions()],
    'ENG': [rigidity.rules.Lower(), ValidatePositions()],

    'ENVSCI': [rigidity.rules.Lower(), ValidatePositions()],
    'EP': [rigidity.rules.Lower(), ValidatePositions()],
    'FOODSCI': [rigidity.rules.Lower(), ValidatePositions()],
    'GEO': [rigidity.rules.Lower(), ValidatePositions()],
    'GLE': [rigidity.rules.Lower(), ValidatePositions()],

    'IE': [rigidity.rules.Lower(), ValidatePositions()],
    'LMS': [rigidity.rules.Lower(), ValidatePositions()],
    'MatE': [rigidity.rules.Lower(), ValidatePositions()],
    'MATH': [rigidity.rules.Lower(), ValidatePositions()],
    'ME': [rigidity.rules.Lower(), ValidatePositions()],

    'MPHY': [rigidity.rules.Lower(), ValidatePositions()],
    'MS': [rigidity.rules.Lower(), ValidatePositions()],
    'MSE': [rigidity.rules.Lower(), ValidatePositions()],
    'NEEP': [rigidity.rules.Lower(), ValidatePositions()],
    'OTM': [rigidity.rules.Lower(), ValidatePositions()],

    'PHM': [rigidity.rules.Lower(), ValidatePositions()],
    'PHY': [rigidity.rules.Lower(), ValidatePositions()],
    'STAT': [rigidity.rules.Lower(), ValidatePositions()],
    'TOX': [rigidity.rules.Lower(), ValidatePositions()],
}


class Company:

    def __init__(self, id, name, website=None, description=''):
        self.id = id
        self.name = name
        self.website = website
        self.description = description
        self.attributes = bitpack.BitPack('AAAAAAAAAAAAAAAAAAAAAAAAAAA=')
        self.tables = []

    def add_major(self, major_name, i, c, e, x):
        '''
        :param bool i:
        :param bool c:
        :param bool e:
        :param bool x:
        '''
        offset = MAJORS_OFFSET + MAJOR_OFFSETS[major_name]
        self.attributes.set_bit(i, offset + I_OFFSET)
        self.attributes.set_bit(c, offset + C_OFFSET)
        self.attributes.set_bit(e, offset + E_OFFSET)
        self.attributes.set_bit(x, offset + X_OFFSET)

    def add_citizenship(self, us, pr, vh):
        '''
        :param bool us:
        :param bool pr:
        :param bool vh:
        '''
        self.attributes.set_bit(us, WORK_AUTH_INDEX + US_INDEX)
        self.attributes.set_bit(pr, WORK_AUTH_INDEX + PR_INDEX)
        self.attributes.set_bit(vh, WORK_AUTH_INDEX + VH_INDEX)

    def add_table(self, day, table_id):
        '''
        Adds a mapping from the company to the given table ID for the
        given day.

        :param int day: The day index for which the table mapping
          should be added.
        :param int table_id: The ID of the table which is assigned for
          the specified day.
        '''
        while len(self.tables) <= day:
            self.tables.append([])
        self.tables[day].append(table_id)

    def to_dict(self):
        '''
        :returns: A dict containing the data stored in this object.
        '''
        return {
            'name': self.name,
            'website': self.website,
            'description': self.description,
            'attributes': self.attributes.base64().decode('ascii'),
            'tables': self.tables
        }


if __name__ == '__main__':
    reader = csv.DictReader(open('dataset.csv'))
    r = rigidity.Rigidity(reader, rules,
                          display=rigidity.Rigidity.DISPLAY_SIMPLE)
    r.skip()  # Skip header

    company_id = 1
    companies = {}
    for row in r:
        print(row)
        company = Company(company_id, row['name'], row['website'],
                          utils.truncate_description(row['description']))

        # Iterate over all majors and add their data to the company
        for major in MAJORS:
            column_heading = constants.MAJOR_SPREDSHEET_HEADIGNS[major]
            position_tuple = utils.extract_position_tuple(row[column_heading])
            company.add_major(major, *position_tuple)

        # Add citizenship data to the company
        citizenship_tuple = utils.extract_citizenship_tuple(row['citizenship'])
        company.add_citizenship(*citizenship_tuple)

        # Add tables
        tables = utils.extract_tables(row['TABLEID'])
        for table_id in tables:
            company.add_table(row['day'], table_id)

        # Write the full description for this company to an HTML file
        with open('descriptions/%i.html' % company_id, 'w') as fp:
            fp.write(utils.format_description(row['description']))

        # Store the company data for later JSOn export
        companies[company_id] = company.to_dict()

        company_id += 1
    print(json.dumps(companies, indent=2))
