import { GildedRose, Item } from '../src';

// kody, ellis, rob, sam, matt
describe('Gilded Rose Approval', () => {
    // sellIn, quality
    it('should foo', () => {
        const gildedRose = new GildedRose([new Item('foo', 0, 0)]);
        const items = gildedRose.updateQuality();

        expect(items).toMatchSnapshot();
    });

    it('should sulfaras', () => {
        const gildedRose = new GildedRose([new Item('Sulfuras, Hand of Ragnaros', 0, 5)]);
        const items = gildedRose.updateQuality();

        expect(items).toMatchSnapshot();
    });
});