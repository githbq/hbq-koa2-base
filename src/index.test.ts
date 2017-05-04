import { expect } from 'chai';
import { add } from './index'
/**
 * 同步测试
 */
describe('test add', () => {
    it('1 + 1 should be equal to 2', () => {
        expect(add(1, 1)).to.equal(2);
    })
})

/**
 * 异步测试
 */
describe('test async add', () => {
    it('2 + 2 should be equal to 4', (done) => {
        setTimeout(() => {
            expect(add(2, 2)).to.equal(4);
            done()
        }, 2000)
    })
})