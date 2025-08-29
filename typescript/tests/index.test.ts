import { GildedRose, Item } from '../src';

// kody, ellis, rob, sam, matt
describe('Gilded Rose Approval', () => {
    it('should foo', () => {
        const gildedRose = new GildedRose([new Item('foo2', 0, 0)]);
        const items = gildedRose.updateQuality();

        expect(items).toMatchSnapshot();
    });
});