#! /usr/bin/env python3
import re
import csv
import bleach
import markdown
import rigidity


SQL_INSERT_COMPANY = '''
INSERT INTO companies (
    id,
    name,
    website,
    description,
    citizen_mask,
    degree_mask_1,
    degree_mask_2,
    degree_mask_3,
    degree_mask_4,
    degree_mask_5,
    degree_mask_6)
VALUES (
    %i, '%s', '%s', '%s', %i, %i, %i, %i, %i, %i, %i
);
'''

DEGREE_MASKS = {
    'amep': 15728640,    # 00000000111100000000000000000000
    'aos': 983040,       # 00000000000011110000000000000000
    'asphys': 61440,     # 00000000000000001111000000000000
    'biochem': 3840,     # 00000000000000000000111100000000
    'bme': 240,          # 00000000000000000000000011110000
    'bse': 15,           # 00000000000000000000000000001111
    'cee': 15728640,     # 00000000111100000000000000000000
    'che': 983040,       # 00000000000011110000000000000000
    'chem': 61440,       # 00000000000000001111000000000000
    'cmpe': 3840,        # 00000000000000000000111100000000
    'cs': 240,           # 00000000000000000000000011110000
    'ect': 15,           # 00000000000000000000000000001111
    'ee': 983040,        # 00000000000011110000000000000000
    'ema': 61440,        # 00000000000000001111000000000000
    'eng': 3840,         # 00000000000000000000111100000000
    'envsci': 240,       # 00000000000000000000000011110000
    'ep': 15,            # 00000000000000000000000000001111
    'foodsci': 1572864,  # 00000000111100000000000000000000
    'geo': 983040,       # 00000000000011110000000000000000
    'gle': 61440,        # 00000000000000001111000000000000
    'ie': 3840,          # 00000000000000000000111100000000
    'lms': 240,          # 00000000000000000000000011110000
    'mate': 15,          # 00000000000000000000000000001111
    'math': 15728640,    # 00000000111100000000000000000000
    'me': 983040,        # 00000000000011110000000000000000
    'mphy': 61440,       # 00000000000000001111000000000000
    'ms': 3840,          # 00000000000000000000111100000000
    'mse': 240,          # 00000000000000000000000011110000
    'neep': 15,          # 00000000000000000000000000001111
    'otm': 983040,       # 00000000000011110000000000000000
    'phm': 61440,        # 00000000000000001111000000000000
    'phy': 3840,         # 00000000000000000000111100000000
    'stat': 240,         # 00000000000000000000000011110000
    'tox': 15,           # 00000000000000000000000000001111
}

I_MASK = 8947848      # 00000000100010001000100010001000
C_MASK = 4473924      # 00000000010001000100010001000100
E_MASK = 2236962      # 00000000001000100010001000100010
X_MASK = 1118481      # 00000000000100010001000100010001

US_MASK = 4  # 100
PR_MASK = 2  # 010
VH_MASK = 1  # 001

FIELDNAMES = ('name', 'website', 'description', 'day', 'citizenship',
              'AMEP', 'AOS', 'ASPHYS', 'BIOCHEM', 'BME', 'BSE', 'CEE', 'CHE',
              'CHEM', 'CMPE', 'CS', 'ECT', 'EE', 'EMA', 'ENG', 'ENVSCI', 'EP',
              'FOODSCI', 'GEO', 'GLE', 'IE', 'LMS', 'MATE', 'MATH', 'ME',
              'MPHY', 'MS', 'MSE', 'NEEP', 'OTM', 'PHM', 'PHY', 'STAT', 'TOX')
reader = csv.DictReader(open('dataset.csv'), fieldnames=FIELDNAMES)


class FixDescription(rigidity.rules.Rule):
    def apply(self, value):
        value = value.replace('''_x000D_
_x000D_''', '\n')
        value = value.replace('_x000D_', '')
        return value


class ValidatePositions(rigidity.rules.Rule):
    valid_characters = ['i', 'c', 'e', 'x']

    def apply(self, value):
        if not isinstance(value, str):
            raise TypeError('`value` must be a string')
        for c in value:
            if c not in self.valid_characters:
                raise ValueError('Invalid position character: \'%s\'' % c)
        return value


class UrlValidator(rigidity.rules.Rule):
    def apply(self, value):
        if value is None:
            return None

        if not (value.startswith('http://') or value.startswith('https://')):
            raise ValueError('URL does not start with http:// or https://')
        if (value.find('http:', 1) != -1) or (value.find('https:', 1) != -1):
            raise ValueError('URL contains an extra http: or https:')

        # Check for a TLD, using a short, but validated list of known TLDs
        if not re.search('\.(com|org|net|edu|jobs|us|gov|mil|co)', value):
            raise ValueError('URL did not have a recognized TLD')

        return value

rules = {
    'name': [rigidity.rules.Unique()],
    'website': [rigidity.rules.Lower(), rigidity.rules.Unique(), UrlValidator()],
    'description': [FixDescription()],

    'citizenship': [rigidity.rules.Lower()],
    'day': [rigidity.rules.ReplaceValue(replacements={
        '1/31/2017': 0,
        '2/2/2017': 1
    }, missing_action=rigidity.rules.ReplaceValue.ACTION_ERROR)],

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
    'MATE': [rigidity.rules.Lower(), ValidatePositions()],
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

r = rigidity.Rigidity(reader, rules, display=rigidity.Rigidity.DISPLAY_SIMPLE)
r.skip()  # Skip header

DEGREE_MASK_NAMES = [
    ('amep', 'aos', 'asphys', 'biochem', 'bme', 'bse'),
    ('cee', 'che', 'chem', 'cmpe', 'cs', 'ect'),
    ('ee', 'ema', 'eng', 'envsci', 'ep'),
    ('foodsci', 'geo', 'gle', 'ie', 'lms', 'mate'),
    ('math', 'me', 'mphy', 'ms', 'mse', 'neep'),
    ('otm', 'phm', 'phy', 'stat', 'tox')
]

company_id = 0
for row in r:
    company_id += 1

    # Generate degree masks
    degree_masks = [0] * 6
    for mask_number in range(0, 6):
        for degree in DEGREE_MASK_NAMES[mask_number]:
            if 'i' in row[degree.upper()]:
                degree_masks[mask_number] |= DEGREE_MASKS[degree] & I_MASK
            if 'c' in row[degree.upper()]:
                degree_masks[mask_number] |= DEGREE_MASKS[degree] & C_MASK
            if 'e' in row[degree.upper()]:
                degree_masks[mask_number] |= DEGREE_MASKS[degree] & E_MASK
            if 'x' in row[degree.upper()]:
                degree_masks[mask_number] |= DEGREE_MASKS[degree] & X_MASK

    # Generate citizen mask
    citizen_mask = 0
    if 'us' in row['citizenship']:
        citizen_mask |= US_MASK
    if 'pr' in row['citizenship']:
        citizen_mask |= PR_MASK
    if 'vh' in row['citizenship']:
        citizen_mask |= VH_MASK

    # SQL-escape name
    sql_name = row['name'].replace('\'', '\\\'')

    # Truncate and html-ize description
    description = row['description']
    if len(description) > 140:
        description =  description[0:140].strip(' \t\r\n.,')
        description = '%s...' % description

    # Output the full description to a file
    long_description = row['description']
    long_description = long_description.replace(r"\'", "'")
    long_description = bleach.clean(markdown.markdown(row['description']),
                                    tags=bleach.ALLOWED_TAGS + ['p'])
    with open('descriptions/%i.html' % company_id, 'w') as fp:
        fp.write(long_description)

    print(SQL_INSERT_COMPANY % (company_id, sql_name, row['website'],
                                description, citizen_mask,
                                degree_masks[0], degree_masks[1],
                                degree_masks[2], degree_masks[3],
                                degree_masks[4], degree_masks[5]))
    print('INSERT INTO day_company_booth (company_id,day_id,booth_id) VALUES (%i,%i,%i);' %
          (company_id, row['day'] + 1, 1))
