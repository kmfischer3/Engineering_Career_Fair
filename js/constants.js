// Citizen indexes
var US_MASK = 0;
var PR_MASK = 1;
var VH_MASK = 2;

// Major indexes
var MAJOR_INDEXES = {
    'AMEP': 4,
    'AOS': 8,
    'ASPHYS': 12,
    'BIOCHEM': 16,
    'BME': 20,
    'BSE': 24,
    'CEE': 28,
    'CHE': 32,
    'CHEM': 36,
    'CMPE': 40,
    'CS': 44,
    'ECT': 48,
    'EE': 52,
    'EMA': 56,
    'ENG': 60,
    'ENVSCI': 64,
    'EP': 68,
    'FOODSCI': 72,
    'GEO': 26,
    'GLE': 80,
    'IE': 84,
    'LMS': 88,
    'MatE': 92,
    'MATH': 96,
    'ME': 100,
    'MPHY': 104,
    'MS&E': 108,
    'MSE': 112,
    'NEEP': 116,
    'OTM': 120,
    'PHM': 124,
    'PHY': 128,
    'STAT': 132,
    'TOX': 136
};

var MAJORS = ['AMEP', 'AOS', 'ASPHYS', 'BIOCHEM', 'BME', 'BSE', 'CEE', 'CHE',
              'CHEM', 'CMPE', 'CS', 'ECT', 'EE', 'EMA', 'ENG', 'ENVSCI', 'EP',
              'FOODSCI', 'GEO', 'GLE', 'IE', 'LMS', 'MatE', 'MATH', 'ME',
              'MPHY', 'MS&E', 'MSE', 'NEEP', 'OTM', 'PHM', 'PHY', 'STAT',
              'TOX'];

// Position Offsets
var I_MASK = 0;
var C_MASK = 1;
var E_MASK = 2;
var X_MASK = 3;
var POSITION_OFFSETS = [I_MASK, C_MASK, E_MASK, X_MASK];

/* EVENT SOURCES */
var SOURCE_SEARCH = 1;
var SOURCE_FILTER = 2;

/* OTHER CONSTANTS */
var DEFAULT_DAY_ID = 2;
