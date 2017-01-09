describe('MAJOR_INDEXES', () => {
    it('should have a value for every value in MAJORS', () => {
        MAJORS.forEach((v) => {
            expect(MAJOR_INDEXES[v]).toBeGreaterThan(-1);
        });
    });
});
