$(document).keypress(function( event ) {
    switch (event.which) {
        case 74: // J
        case 106: // j
//            console.log('next');
            var currentPost = $('.post_container.selected');
            if (currentPost.length == 0) {
                var firstPost = $('.post_container').first();
                firstPost.addClass('selected');
                var postPosition = firstPost[0].offsetTop - 30;
                window.scrollTo(0, postPosition);
            }
            else {
                var nextPost = currentPost.nextAll('.post_container');
                if (nextPost.length == 0) {
                    // Nothing to do here...you're at the end of the list.
                    // TODO:  Maybe look for the next PAGE and navigate to that?
//                    console.log('No more posts...');
                }
                else {
                    currentPost.toggleClass('selected', false);
                    nextPost.first().toggleClass('selected', true);
                    var postPosition = nextPost.first()[0].offsetTop - 30;
                    window.scrollTo(0, postPosition);
                }
            }
            break;
        case 75: // K
        case 107: // k
            var currentPost = $('.post_container.selected');
            if (currentPost.length == 0) {
//                console.log('No post currently selected...nothing to do.');
            }
            else {
                var prevPost = currentPost.prevAll('.post_container');
                if (prevPost.length == 0) {
                    // Nothing to do here...you're at the end of the list.
                    // TODO:  Maybe look for the previous PAGE and navigate to that?
//                    console.log('No more posts...');
                }
                else {
                    currentPost.toggleClass('selected', false);
                    prevPost.first().toggleClass('selected', true);
                    var postPosition = prevPost.first()[0].offsetTop - 30;
                    window.scrollTo(0, postPosition);
                }
            }
//            console.log('prev');
            break;
        default:
            console.log(event.which);
            console.log(String.fromCharCode(event.which));
            break;
    }
});
$(document).ready(function() {
    window.setTimeout(function() {
        var currentPostPointer = $('.point_to_post');
        if (currentPostPointer.length > 0) {
            var currentPost = currentPostPointer.parents('.post_container');
            if (currentPost.length > 0) {
                var selectedPost = currentPost.first();
                selectedPost.addClass('selected');
                var postPosition = selectedPost[0].offsetTop - 30;
                window.scrollTo(0, postPosition);
            }
        }
    }, 500);
});

console.log('potnfixes.js loaded.');
