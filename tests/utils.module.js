$(function(){

    QUnit.module('utils', {
        afterEach: function() {
        }
    });

    /**
     * Test
     */
    QUnit.test('utils-escapeElementId', function(assert) {

        assert.deepEqual(
                Utils.escapeElementId('abc123'),
                'abc123',
                'Should not escape id'
            );

        var chars = ':.[],';
        for (var i = 0; i < chars.length; ++i)
        {
            assert.deepEqual(
                    Utils.escapeElementId('abc' + chars[i] + '123'),
                    'abc\\' + chars[i] + '123',
                    'Should escape \'' + chars[i] + '\' in id'
                );

            assert.deepEqual(
                    Utils.escapeElementId('abc\\' + chars[i] + '123'),
                    'abc\\' + chars[i] + '123',
                    'Should not escape \'\\' + chars[i] + '\' in id'
                );

            assert.deepEqual(
                    Utils.escapeElementId( chars[i] + 'abc123' ),
                    '\\' + chars[i] + 'abc123',
                    'Should escape \'' + chars[i] + '\' prefixing id'
                );

            assert.deepEqual(
                    Utils.escapeElementId( '\\' + chars[i] + 'abc123' ),
                    '\\' + chars[i] + 'abc123',
                    'Should not escape \'\\' + chars[i] + '\' prefixing id'
                );

            assert.deepEqual(
                    Utils.escapeElementId('abc123' + chars[i] ),
                    'abc123\\' + chars[i],
                    'Should escape \'' + chars[i] + '\' trailing in id'
                );

            assert.deepEqual(
                    Utils.escapeElementId('abc123\\' + chars[i] ),
                    'abc123\\' + chars[i],
                    'Should not escape \'\\' + chars[i] + '\' trailing in id'
                );
        }
    });
});