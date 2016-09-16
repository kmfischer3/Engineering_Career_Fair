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


# ------------------------ BEGIN TABLE ASSIGNMENTS FOR DAY 2 (first Wednesday):
company_ids_2 = [
None,       #(0)
None,
None,
None,
None,

116,        #(5)
115,
110,
110,
109,
107,

17,        #(11)
21,
24,
28,

None,        #(15)
56,
66,
75,

None,        #(19)
47,
65,
73,

50,        #(23)
50,
49,
None,

76,        #(27)
82,
92,
3,

44,        #(31)
42,
34,
30,

102,        #(35)
101,
95,
95,

77,        #(39)
86,
96,
9,

173,        #(43)
177,
235,
234,

180,        #(47)
180,
181,
231,
224,
220,

182,        #(53)
194,
201,
219,
213,
211,
210,
205,

241,          #(61)
247,
248,
252,
252,
253,
256,
257,
258,

294,          #(70)
291,
290,
286,
283,
277,
273,
265,
259,

105,           #(79)
105,
304,
304,
299,
172,
171,
157,

150,           #(87)
150,
146,
147,
139,
133,
151,
155,
148,
145,
143,
141,

None,            #(99)

124,           #(100)
122,
126,
None,
121,
119,
117,
305,

2,            #(108)
2,
51,
297,
114,

100,            #(113)
100,
137,
232,
232
]


# ------------------------ BEGIN TABLE ASSIGNMENTS FOR DAY 3 (second Wednesday):
company_ids_3 = [
None,       #(0)
None,
None,
None,
None,

178,        #(5)
183,
184,
186,
190,
191,

245,        #(11)
243,
242,
240,

249,        #(15)
251,
260,
263,

275,        #(19)
221,
267,
262,

269,        #(23)
270,
271,
274,

239,        #(27)
230,
202,
206,

228,        #(31)
217,
216,
207,

193,        #(35)
195,
200,
200,

237,        #(39)
227,
208,
196,

18,        #(43)
20,
79,
72,

22,        #(47)
29,
31,
69,
67,
60,

33,        #(53)
36,
40,
43,
58,
54,
53,
45,

81,          #(61)
84,
87,
91,
98,
99,
103,
108,
113,

134,          #(70)
131,
130,
129,
128,
127,
125,
120,
118,

302,           #(79)
164,
169,
174,
13,
278,
279,
281,

161,           #(87)
161,
160,
159,
158,
158,
282,
284,
285,
287,
288,
295,

None,            #(99)

144,           #(100)
140,
138,
136,
298,
300,
301,
303,

48,            #(108)
27,
27,
250,
163,

142,            #(113)
142,
7,
11,
14
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
