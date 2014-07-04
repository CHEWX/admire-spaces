(function( global ) {

	// Autor: maximeparmentier.com

    var Pinterest = (function() {

        // Variables
        var options = {
            username: 'admirespaces',
            numEntries: 50,
            container: '.feed-reel'
        };

        var feed,
            container;


        // Functions
        var loadFeed = function() {
            google.load("feeds", "1", {callback:function(){
                container = $(options.container)
                feed = new google.feeds.Feed('http://pinterest.com/'+options.username+'/feed.rss');
                feed.setNumEntries(options.numEntries);
                feed.load(buildGrid);
            }});
        };

        var buildGrid = function(result) {
            if (!result.error) {
                container.html('');
                for (var i = 0; i < result.feed.entries.length; i++) {
                    var entry = result.feed.entries[i];
                    var html = $('<article class="item"><div>'+entry.content+'<div></article>');

                    console.log(entry);

                    html.find('a').attr('href', entry.link);
                    html.find('a').attr('target', '_blank');
                    container.append(html);

                }
            }
        };

        return {
            init: function(params) {

                //Set params
                params = params || {};
                for(var i in params) {
                    options[i] = params[i];
                }

                //Init
                loadFeed();
            }
        };
    })();

    // expose our module to the global object
    global.Pinterest = Pinterest;
})( this );


Pinterest.init({
    username: 'admirespaces',
    numEntries: 50,
    container: '.feed-reel',
});

$(document).ready(function(){

	$(".item p:last-child").hide();

	//$( ".item" ).find( "p:last-child" ).css( "background-color", "red" );

	var i = 0;

	$(".feed-reel p").each(function(i) {
		$(".feed-reel p").addClass("item"+(i+1));
	});

	i++;


});

