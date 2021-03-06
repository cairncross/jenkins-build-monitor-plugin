'use strict';

describe('buildMonitor', function () {

    describe('jenkins', function () {

        describe('proxy provider', function() {

            var url   = '/$stapler/bound/97daf472-ab2b-4e96-a02b-968970e68030',
                crumb = '1d7eae2a-3c33-4fbe-b717-726ac4da8a52';

            var jellyGeneratedServerSideBindings = {
                exampleServerSideCalculator: {
                    url:     url,
                    crumb:   crumb,
                    methods: ['add']
                }
            }

            // before proxies can be used,
            // they need to be configured using bindings generated by a Jelly BindTag
            beforeEach(module('jenkins', function ($provide, proxyProvider) {
                $provide.constant('CSRF_CRUMB_FIELD_NAME', '.crumb');

                proxyProvider.configureProxiesUsing(jellyGeneratedServerSideBindings);
            }));

            it('allows access to bound server-side objects', inject(function (proxy) {
                expect(proxy.exampleServerSideCalculator).toBeAn('object');
                expect(proxy.exampleServerSideCalculator).toHaveFollowingMethods(['add']);
            }));
        });
    });
});