#! /usr/bin/env python3

# company_ids_day[index] holds the id of the company at booth[index] on that day

# days are zero-indexed in code, but the db starts them at 1
MONDAY_ID = 1
FIRST_WEDNESDAY_ID = 2
SECOND_WEDNESDAY_ID = 3

TOTAL_NUM_TABLES = 117

SQL_INSERT_COMPANY = '''
INSERT INTO day_company_booth (
    day_id,
    company_id,
    booth_id)
VALUES (
    %i, %i, %i
);
'''


# ------------------------ BEGIN TABLE ASSIGNMENTS FOR DAY 1 (Monday):
company_ids_1 = [
None,
None,
None,
None,
None,

175,
176,
179,
185,
187,
197,

189,
192,
188,
198,

296,
264,
203,
204,

209, 
212,
214,
215,

218,
222,
225,
233,

229,
229,
246,
244,

226,
226,
236,
238,

276,
289,
272,
272,

254,
255,
280,
292,

199,
199,
154,
153,

156,
162,
165,
152,
149,
132,

166,
167,
168,
170,
111,
106,
104,
97,

16,
15,
10,
8,
6,
5,
4,
1,
1,

19,
23,
25,
26,
32,
35,
37,
38,
38,

223,
223,
261,
266,
64,
68,
70,
71,

63,
61,
59,
59,
57,
55,
74,
74,
78,
80,
83,
88,

None,

52,
46,
41,
39,
90,
93,
93,
94,

89,
112,
112,
123,
135,

12,
12,
62,
85,
268
]


# ------------------------ BEGIN TABLE ASSIGNMENTS FOR DAY 2 (First Wednesday):
company_ids_2 = [
None,       #(0)
None,
None,
None,
None,

x,        #(5)
x,
x,
x,
x,
x,

x,        #(11)
x,
x,
x,

x,        #(15)
x,
x,
x,

x,        #(19)
x,
x,
x,

x,        #(23)
x,
x,
x,

x,        #(27)
x,
x,
x,

x,        #(31)
x,
x,
x,

x,        #(35)
x,
x,
x,

x,        #(39)
x,
x,
x,

x,        #(43)
x,
x,
x,

x,        #(47)
x,
x,
x,
x,
x,

x,        #(53)
x,
x,
x,
x,
x,
x,
x,

x,          #(61)
x,
x,
x,
x,
x,
x,
x,
x,

x,          #(70)
x,
x,
x,
x,
x,
x,
x,
x,

x,           #(79)
x,
x,
x,
x,
x,
x,
x,

x,           #(87)
x,
x,
x,
x,
x,
x,
x,
x,
x,
x,
x,

x,            #(99)

x,           #(100)
x,
x,
x,
x,
x,
x,
x,

x,            #(108)
x,
x,
x,
x,

x,            #(113)
x,
x,
x,
x
]


# ------------------------ BEGIN TABLE ASSIGNMENTS FOR DAY 3 (second Wednesday):
company_ids_3 = [
None,       #(0)
None,
None,
None,
None,

x,        #(5)
x,
x,
x,
x,
x,

x,        #(11)
x,
x,
x,

x,        #(15)
x,
x,
x,

x,        #(19)
x,
x,
x,

x,        #(23)
x,
x,
x,

x,        #(27)
x,
x,
x,

x,        #(31)
x,
x,
x,

x,        #(35)
x,
x,
x,

x,        #(39)
x,
x,
x,

x,        #(43)
x,
x,
x,

x,        #(47)
x,
x,
x,
x,
x,

x,        #(53)
x,
x,
x,
x,
x,
x,
x,

x,          #(61)
x,
x,
x,
x,
x,
x,
x,
x,

x,          #(70)
x,
x,
x,
x,
x,
x,
x,
x,

x,           #(79)
x,
x,
x,
x,
x,
x,
x,

x,           #(87)
x,
x,
x,
x,
x,
x,
x,
x,
x,
x,
x,

x,            #(99)

x,           #(100)
x,
x,
x,
x,
x,
x,
x,

x,            #(108)
x,
x,
x,
x,

x,            #(113)
x,
x,
x,
x
]


# INSERT day assignments
for i in range(0, TOTAL_NUM_TABLES+1):
    booth_id = i
    company_id1 = company_ids_1[i]
    company_id2 = company_ids_2[i]
    company_id3 = company_ids_3[i]

    if company_id1 is not None:
        print (SQL_INSERT_COMPANY % (MONDAY_ID, company_id1, booth_id) )
        
    if company_id2 is not None:
        print (SQL_INSERT_COMPANY % (FIRST_WEDNESDAY_ID, company_id2, booth_id) )
    
    if company_id3 is not None:
        print (SQL_INSERT_COMPANY % (SECOND_WEDNESDAY_ID, company_id3, booth_id) )

#reset i because I've ran this script like 2139586490 times
i = 0
