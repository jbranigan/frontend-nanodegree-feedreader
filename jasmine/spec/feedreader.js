/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* This function is a helper for the tests that check
         * parts of the allFeeds object
         */
        function testFeedPart(feed, part) {
            it('each feed should have a ' + part, function() {
                expect(feed[part]).toBeDefined();
                expect(feed[part].length).not.toBe(0);
            });
        }

        /* This test loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        for (var i = 0; i < allFeeds.length; i++) {
            testFeedPart(allFeeds[i], 'url');
        }


        /* This test loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        for (var i = 0; i < allFeeds.length; i++) {
            testFeedPart(allFeeds[i], 'name');
        }
    });


    /* This test suite makes sure the menu behavior is correct */
    describe('The menu', function() {
        /* This test ensures the menu element is
         * hidden by default.
         */
        it('is hidden by default', function() {
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

         /* TODO: Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
        it('toggles the menu-hidden class', function() {
            var menuIcon = $('.menu-icon-link');
            menuIcon.click();
            expect($('body').hasClass('menu-hidden')).toBe(false);
            menuIcon.click();
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
    });

    /* This test suite ensures "Initial Entries" aren't empty */
    describe('Initial Entries', function() {
        /* This test ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         */
        beforeEach(function(done) {
            loadFeed(0, function() {
                done();
            });
        });

        it('should populate the feed container', function(done) {
            expect($('.feed').children().length).not.toBe(0);
            done();
        });
    });
    /* TODO: Write a new test suite named "New Feed Selection" */
    describe('New Feed Selection', function() {
        /* This test ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         */

        var oldHeadline = $('.header-title').first().html();
        
        beforeEach(function(done) {
            loadFeed(0, function() {
                done();
            });
        });

        it('should update the feed content', function(done) {
            var newHeadline = $('.header-title').first().html();
            expect(oldHeadline).not.toEqual(newHeadline);
            done();
        });
    });
}());
