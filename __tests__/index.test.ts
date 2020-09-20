
import { add } from '../src'

describe('add函数', () => {
  test('Check literal value', () => {
    expect(add(1, 2)).toEqual(3)
  })
})