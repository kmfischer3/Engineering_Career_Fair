#! /usr/bin/env python3
US_MASK = 4  #100
PR_MASK = 2  #010
VH_MASK = 1  #001

DEGREE_MASKS = {
    'bme': 15728640,  #00000000111100000000000000000000
    'bse': 983040,    #00000000000011110000000000000000
    'cee': 61440,     #00000000000000001111000000000000
    'che': 3840,      #00000000000000000000111100000000
    'cmpe': 240,      #00000000000000000000000011110000
    'cs': 15,         #00000000000000000000000000001111

    'ee':  15728640,  #00000000111100000000000000000000
    'ema':  983040,   #00000000000011110000000000000000
    'eng': 61440,     #00000000000000001111000000000000
    'ep': 3840,       #00000000000000000000111100000000
    'gle': 240,       #00000000000000000000000011110000
    'ie': 15,         #00000000000000000000000000001111

    'mate': 983040,   #00000000000011110000000000000000
    'me': 61440,      #00000000000000001111000000000000
    'ms': 3840,       #00000000000000000000111100000000
    'mse': 240,       #00000000000000000000000011110000
    'neep': 15,       #00000000000000000000000000001111
}
DEGREE_MASK_1_NAMES = ['bme', 'bse', 'cee', 'che', 'cmpe', 'cs']
DEGREE_MASK_2_NAMES = ['ee', 'ema', 'eng', 'ep', 'gle', 'ie']
DEGREE_MASK_3_NAMES = ['mate', 'me', 'ms', 'mse', 'neep']

I_MASK = 8947848     #00000000100010001000100010001000
C_MASK = 4473924     #00000000010001000100010001000100
E_MASK = 2236962     #00000000001000100010001000100010
X_MASK = 1118481     #00000000000100010001000100010001

SQL_INSERT_COMPANY = '''
INSERT INTO companies (
    id,
    name,
    description,
    website,
    citizen_mask,
    degree_mask_1,
    degree_mask_2,
    degree_mask_3)
VALUES (
    %i, '%s', '%s', '%s', %i, %i, %i, %i
);
'''

class Company():
    def __init__(self, company_id, name, description, website, citizen_status, positions):
        self.company_id = company_id
        self.name = name
        self.description = description
        self.website = website
        self.citizen_status = citizen_status
        self.positions = positions

    def generate_sql(self):
        # Create citizen mask
        citizen_mask = 0
        if 'us' in self.citizen_status:
            citizen_mask |= US_MASK
        if 'pr' in self.citizen_status:
            citizen_mask |= PR_MASK
        if 'vh' in self.citizen_status:
            citizen_mask |= VH_MASK

        # Create degree mask 1
        degree_mask_1 = 0
        for degree in DEGREE_MASK_1_NAMES:
            if degree in self.positions:
                degree_mask_1 |= (DEGREE_MASKS[degree] & self.positions[degree])

        # Create degree mask 2
        degree_mask_2 = 0
        for degree in DEGREE_MASK_2_NAMES:
            if degree in self.positions:
                degree_mask_2 |= (DEGREE_MASKS[degree] & self.positions[degree])



        # Create degree mask 3
        degree_mask_3 = 0
        for degree in DEGREE_MASK_3_NAMES:
            if degree in self.positions:
                degree_mask_3 |= (DEGREE_MASKS[degree] & self.positions[degree])

        # Format SQL statement
        return SQL_INSERT_COMPANY % (self.company_id, self.name,
                                     self.description, self.website,
                                     citizen_mask, degree_mask_1, degree_mask_2,
                                     degree_mask_3)

class Main():
    def __init__(self, starting_company_id=0, day_number=1):
        self.company_id=0

        self.outfile = open('out.sql', 'a+')

    def start(self):
        companies = []

        try:
            while True:
                company = self.enter_company_details()
                companies.append(company)
                self.outfile.write(company.generate_sql())
                print('---------')
        except KeyboardInterrupt:
            pass

        for company in companies:
            print(company.generate_sql())


    def enter_company_details(self):
        company_id = self.company_id
        self.company_id += 1

        name = input('name: ')
        description = input('description: ')
        website = input('website: ')
        citizen_status = input('citizen status: ')

        position_table = {}
        while True:
            position = input('position: ')
            if not position:
                break
            pos_name, pos_types = position.split(' ', 1)

            pos_mask = 0
            if 'i' in pos_types:
                pos_mask |= I_MASK
            if 'c' in pos_types:
                pos_mask |= C_MASK
            if 'e' in pos_types:
                pos_mask |= E_MASK
            if 'x' in pos_types:
                pos_mask |= X_MASK

            position_table[pos_name] = pos_mask

        company = Company(company_id, name, description, website,
                          citizen_status, position_table)
        return company

if __name__ == '__main__':
    main = Main()
    main.start()
