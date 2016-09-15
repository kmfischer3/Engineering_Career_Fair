#! /usr/bin/env python3

MONDAY_ID = 1
SQL_INSERT_COMPANY = '''
INSERT INTO day_company_booth (
    id,
    day_id,
    company_id,
    booth_id)
VALUES (
    %i, %i, %i, %i
);
'''

# company_ids[index] holds the id of the company at booth[index] on monday
company_ids = [
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

for i in range(1, len(company_ids)):

    company_id = company_ids[i]

    if company_id is None:
        continue

    # Booth_id starts at zero and increments with x. For future maps, x 
    # will start where this iteration ends, and booth_id will start over
    # at zero and continue incrementing with x.
    print (SQL_INSERT_COMPANY % (i, MONDAY_ID, company_id, i) )

