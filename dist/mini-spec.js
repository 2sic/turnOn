import { MiniTestTest } from './mini';
describe("first test", function () {
    var mini;
    beforeEach(function () {
        mini = new MiniTestTest();
    });
    it('test', function () {
        expect(mini.something() == "hello");
    });
});
//# sourceMappingURL=mini-spec.js.map