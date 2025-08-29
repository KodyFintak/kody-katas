import {execSync} from 'node:child_process';

// kody, ellis, rob, matt, meng
describe('Gilded Rose Approval', () => {
    // sellIn, quality
    it('should thirtyDays', () => {
        const consoleOutput = execSync(
            'tsx tests/golden-master-test.ts 30',
            {encoding: 'utf-8'}
        );

        expect(consoleOutput).toMatchSnapshot();
    });

});