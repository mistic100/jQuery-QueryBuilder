$(function () {

    QUnit.module('utils');

    /**
     * Test iterateOptions
     */
    QUnit.test('iterateOptions', function (assert) {
        var output;
        function callback(a, b) {
            output.push(a, b);
        }

        output = [];
        Utils.iterateOptions(['one', 'foo', 'bar'], callback);
        assert.deepEqual(
            output,
            ['one', 'one', 'foo', 'foo', 'bar', 'bar'],
            'Should iterate simple array'
        );

        output = [];
        Utils.iterateOptions({1: 'one', 2: 'foo', 3: 'bar'}, callback);
        assert.deepEqual(
            output,
            ['1', 'one', '2', 'foo', '3', 'bar'],
            'Should iterate simple hash-map'
        );

        output = [];
        Utils.iterateOptions([{1: 'one'}, {2: 'foo'}, {3: 'bar'}], callback);
        assert.deepEqual(
            output,
            ['1', 'one', '2', 'foo', '3', 'bar'],
            'Should iterate array of hash-maps'
        );
    });

    /**
     * Test groupSort
     */
    QUnit.test('groupSort', function (assert) {
        var input = [
            {id: '1'},
            {id: '1.1', group: '1'},
            {id: '2'},
            {id: '2.1', group: '2'},
            {id: '1.2', group: '1'},
            {id: '2.2', group: '2'},
            {id: '3'},
            {id: '1.3', group: '1'}
        ];

        var output = [
            {id: '1'},
            {id: '1.1', group: '1'},
            {id: '1.2', group: '1'},
            {id: '1.3', group: '1'},
            {id: '2'},
            {id: '2.1', group: '2'},
            {id: '2.2', group: '2'},
            {id: '3'}
        ];

        assert.deepEqual(
            Utils.groupSort(input, 'group'),
            output,
            'Should sort items by group'
        );
    });

    /**
     * Test fmt
     */
    QUnit.test('fmt', function (assert) {
        assert.equal(
            Utils.fmt('{0} is equal to {1}', 1, 'one'),
            '1 is equal to one',
            'Should replace arguments'
        );

        assert.equal(
            Utils.fmt('{0} is equal to {0}', 1),
            '1 is equal to 1',
            'Should replace one argument multiple times'
        );
    });

    /**
     * Test changeType
     */
    QUnit.test('changeType', function (assert) {
        assert.ok(
            Utils.changeType('10', 'integer') === 10,
            '"10" should be parsed as integer'
        );

        assert.ok(
            Utils.changeType('10.5', 'integer') === 10,
            '"10.5" should be parsed as integer'
        );

        assert.ok(
            Utils.changeType('10.5', 'double') === 10.5,
            '"10.5" should be parsed as double'
        );

        assert.ok(
            Utils.changeType('true', 'boolean') === true,
            '"true" should be parsed as boolean'
        );

        assert.ok(
            Utils.changeType('false', 'boolean', true) === 0,
            '"false" should be parsed as integer'
        );
    });

    /**
     * Test escapeElementId
     */
    QUnit.test('escapeElementId', function (assert) {
        assert.equal(
            Utils.escapeElementId('abc123'),
            'abc123',
            'Should not alter id'
        );

        var chars = ':.[],';
        for (var i = 0; i < chars.length; ++i) {
            assert.equal(
                Utils.escapeElementId('abc' + chars[i] + '123'),
                'abc\\' + chars[i] + '123',
                'Should escape \'' + chars[i] + '\' in id'
            );

            assert.equal(
                Utils.escapeElementId('abc\\' + chars[i] + '123'),
                'abc\\' + chars[i] + '123',
                'Should not escape \'\\' + chars[i] + '\' in id'
            );

            assert.equal(
                Utils.escapeElementId(chars[i] + 'abc123'),
                '\\' + chars[i] + 'abc123',
                'Should escape \'' + chars[i] + '\' prefixing id'
            );

            assert.equal(
                Utils.escapeElementId('\\' + chars[i] + 'abc123'),
                '\\' + chars[i] + 'abc123',
                'Should not escape \'\\' + chars[i] + '\' prefixing id'
            );

            assert.equal(
                Utils.escapeElementId('abc123' + chars[i]),
                'abc123\\' + chars[i],
                'Should escape \'' + chars[i] + '\' trailing in id'
            );

            assert.equal(
                Utils.escapeElementId('abc123\\' + chars[i]),
                'abc123\\' + chars[i],
                'Should not escape \'\\' + chars[i] + '\' trailing in id'
            );
        }
    });
});
