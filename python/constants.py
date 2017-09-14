WORK_AUTH_INDEX = 0
US_INDEX = 0
PR_INDEX = 1
VH_INDEX = 2

MAJORS_OFFSET = 8
I_OFFSET = 0
C_OFFSET = 1
E_OFFSET = 2
X_OFFSET = 3


MAJORS = ['AMEP', 'AOS', 'ASPHYS', 'BIOCHEM', 'BME', 'BSE', 'CEE', 'CHE',
          'CHEM', 'CMPE', 'CS', 'ECT', 'EE', 'EMA', 'ENG', 'ENVSCI', 'EP',
          'FOODSCI', 'GEO', 'GLE', 'IE', 'LMS', 'MatE', 'MATH', 'ME', 'MPHY',
          'MS&E', 'MSE', 'NEEP', 'OTM', 'PHM', 'PHY', 'STAT', 'TOX']

#: A mapping of the major name to its bit offset relative to the start of the
#: major data in the attributes BitPack.
MAJOR_OFFSETS = {major: i * 4 for i, major in enumerate(MAJORS)}

#: A mapping from the major name to the column name used in the spreadsheet.
MAJOR_SPREDSHEET_HEADIGNS = {x: x for x in MAJORS}
MAJOR_SPREDSHEET_HEADIGNS['MS&E'] = 'MS'
#MAJOR_SPREDSHEET_HEADIGNS['MatE'] = 'MATE'

FIELDNAMES = ('name', 'website', 'description', 'day', 'citizenship',
              'AMEP', 'AOS', 'ASPHYS', 'BIOCHEM', 'BME', 'BSE', 'CEE', 'CHE',
              'CHEM', 'CMPE', 'CS', 'ECT', 'EE', 'EMA', 'ENG', 'ENVSCI', 'EP',
              'FOODSCI', 'GEO', 'GLE', 'IE', 'LMS', 'MATE', 'MATH', 'ME',
              'MPHY', 'MS', 'MSE', 'NEEP', 'OTM', 'PHM', 'PHY', 'STAT', 'TOX')
