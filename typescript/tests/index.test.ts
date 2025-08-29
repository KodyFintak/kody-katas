import { GildedRose, Item } from '../src';

// kody, ellis, rob, sam, matt
describe('Gilded Rose Approval', () => {
    // sellIn, quality
    it('should foo', () => {
        const gildedRose = new GildedRose([new Item('foo', 0, 0)]);
        const items = gildedRose.updateQuality();

        expect(items).toMatchSnapshot();
    });

    it('should "Sulfuras", being a legendary item, never has to be sold or decreases in Quality', () => {
        const gildedRose = new GildedRose([
          new Item('Sulfuras, Hand of Ragnaros', 0, 5),
          new Item("Sulfuras, Hand of Ragnaros", 0, 80), //
          new Item("Sulfuras, Hand of Ragnaros", -1, 80)
        ]);
        const items = gildedRose.updateQuality();


        expect(items).toMatchSnapshot();
    });


});