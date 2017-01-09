describe('utils.get_day_string()', () => {
    it('should return "No Map Data" if day index out of bounds', () => {
        expect(get_day_string(100)).toBe("No Map Data");
    });
});
