import { MiniTestTest } from './mini';

describe("first test", () => {
  let mini: MiniTestTest;

  beforeEach(() => {
    mini = new MiniTestTest();
  });

  it('test', () => {
    expect(mini.something() == "hello");
  })
})