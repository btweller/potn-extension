var keylistener = new window.keypress.Listener();

keylistener.register_combo({
    keys: "t d",
    is_sequence: true,
    is_exclusive: true,
    on_release: function() {
        var enabled = cbool(localStorage.getItem('potn_extension_enabled'), true);
        localStorage.setItem('potn_extension_enabled', !enabled);
        $('body').toggleClass('dark', !enabled);
    }
});

keylistener.register_combo({
    keys: "g t",
    is_sequence: true,
    is_exclusive: true,
    on_release: function() {
        openNotifications();
    }
});

keylistener.register_combo({
    keys: "g f",
    is_sequence: true,
    is_exclusive: true,
    on_release: function() {
        gotoFollowedPosts();
    }
});

keylistener.register_combo({
    keys: "g n",
    is_sequence: true,
    is_exclusive: true,
    on_release: function() {
        gotoNewPosts();
    }
});

keylistener.register_combo({
    keys: "g h",
    is_sequence: true,
    is_exclusive: true,
    on_release: function() {
        gotoHome();
    }
});

keylistener.register_combo({
    keys: "j",
    is_exclusive: true,
    is_solitary: true,
    on_keydown: function() {
        switch (getPage()) {
            case "Homepage":
                gotoNextForum();
                break;
            case "Forum":
            case "New":
            case "Followed":
                gotoNextThread();
                break;
            case "Thread":
                gotoNextPost();
                break;
            case "Notifications":
                break;
        }
    }
});

keylistener.register_combo({
    keys: "k",
    is_exclusive: true,
    is_solitary: true,
    on_keydown: function() {
        switch (getPage()) {
            case "Homepage":
                gotoPreviousForum();
                break;
            case "Forum":
            case "New":
            case "Followed":
                gotoPreviousThread();
                break;
            case "Thread":
                gotoPreviousPost();
                break;
            case "Notifications":
                break;
        }
    }
});


keylistener.register_combo({
    keys: "n",
    is_exclusive: true,
    is_solitary: true,
    on_keydown: function() {
        switch (getPage()) {
            case "Homepage":
                gotoNextForumGroup();
                break;
            case "Forum":
            case "New":
            case "Followed":
            case "Thread":
                gotoNextPage();
                break;
            case "Notifications":
                break;
        }
    }
});

keylistener.register_combo({
    keys: "p",
    is_exclusive: true,
    is_solitary: true,
    on_keydown: function() {
        switch (getPage()) {
            case "Homepage":
                gotoPreviousForumGroup();
                break;
            case "Forum":
            case "New":
            case "Followed":
            case "Thread":
                gotoPreviousPage();
                break;
            case "Notifications":
                break;
        }
    }
});


keylistener.register_combo({
    keys: "o",
    is_exclusive: true,
    is_solitary: true,
    on_keydown: function() {
        switch (getPage()) {
            case "Homepage":
                openSelectedForum();
                break;
            case "Forum":
            case "New":
            case "Followed":
                openSelectedThread();
                break;
            case "Thread":
                break;
            case "Notifications":
                break;
        }

    }
});



function getPage() {
    var pageUrl = document.location.href;

    if (areNotificationsDisplayed()) {
        return "Notifications";
    }

    if (pageUrl == 'http://photography-on-the.net/forum/' ||
        pageUrl.indexOf('http://photography-on-the.net/forum/index.php') != -1) {
        // Homepage.
        return "Homepage";
    }
    if (pageUrl.indexOf('http://photography-on-the.net/forum/newposts.php') != -1) {
        if (pageUrl.indexOf('http://photography-on-the.net/forum/newposts.php?followed=1') != -1) {
            // Followed + Own
            return "Followed";
        }
        else {
            return "New";
        }
    }

    if (pageUrl.indexOf('http://photography-on-the.net/forum/forumdisplay.php') != -1) {
        return "Forum";
    }

    if (pageUrl.indexOf('http://photography-on-the.net/forum/showthread.php') != -1) {
        return "Thread";
    }

    return "Unknown";
}

function areNotificationsDisplayed() {
    return false;
}

function gotoHome() {
    $("#toplogo a")[0].click();
}

function gotoNewPosts() {
    $("a.main_link[href*='http://photography-on-the.net/forum/newposts.php']").first()[0].click();
}

function gotoFollowedPosts() {
    $("a[href*='http://photography-on-the.net/forum/newposts.php?followed=1']").first()[0].click();
}

function openNotifications() {
    var notificationsLinks = $('a.AMASS_notification_status.yes_notifications');
    if (notificationsLinks.length > 0) {
        notificationsLinks.first()[0].click();
    }
}

function openSelectedForum() {
    openSelectedThread();
}

function openSelectedThread() {
    var currentThread = $('.threadrow.selected');
    if (currentThread.length == 0) {
        return;
    }

    var currentThreadLink = currentThread.find('.threadlist_title a');

    if (currentThreadLink.length > 0) {
        currentThreadLink.first()[0].click();
    }
}

function gotoNextForumGroup() {
    var currentThread = $('.threadrow.selected');
    if (currentThread.length == 0) {
        var firstThread = $('.threadlist').first().children('.threadrow').first();
        firstThread.addClass('selected');
        var position = getScrollPosition(firstThread[0]);
        window.scrollTo(0, position);
    }
    else {
        var nextThreadList = currentThread.parents('.threadlist').parent().nextAll('div');
        if (nextThreadList.length == 0) {
            // Nothing to do here...you're at the end of the list.
        }
        else {
            currentThread.toggleClass('selected', false);
            var nextThread = nextThreadList.first().children('.threadlist').children('tbody').children('.threadrow').first()
            nextThread.toggleClass('selected', true);
            var position = getScrollPosition(nextThread.first()[0]);
            window.scrollTo(0, position);
        }
    }

}

function gotoPreviousForumGroup() {
    var currentThread = $('.threadrow.selected');
    if (currentThread.length == 0) {
//        var firstThread = $('.threadlist').first().children('.threadrow').first();
//        firstThread.addClass('selected');
//        var position = getScrollPosition(firstThread[0]);
//        window.scrollTo(0, position);
    }
    else {
        var prevThreadList = currentThread.parents('.threadlist').parent().prevAll('div');
        if (prevThreadList.length == 0) {
            // Nothing to do here...you're at the end of the list.
        }
        else {
            currentThread.toggleClass('selected', false);
            var prevThread = prevThreadList.first().children('.threadlist').children('tbody').children('.threadrow').first()
            prevThread.toggleClass('selected', true);
            var position = getScrollPosition(prevThread.first()[0]);
            window.scrollTo(0, position);
        }
    }

}

function gotoNextForum() {
    gotoNextThread();
//    var currentForum = $('.threadrow.selected');
//    if (currentForum.length == 0) {
//        var firstForum = $('.threadrow').first();
//        firstForum.addClass('selected');
//        var position = firstForum[0].offsetTop - 30;
//        window.scrollTo(0, position);
//    }
//    else {
//        var nextForum = currentForum.nextAll('.threadrow');
//        if (nextForum.length == 0) {
//            // Nothing to do here...you're at the end of the list.
//        }
//        else {
//            currentForum.toggleClass('selected', false);
//            nextForum.first().toggleClass('selected', true);
//            var position = nextForum.first()[0].offsetTop - 30;
//            window.scrollTo(0, position);
//        }
//    }
}

function gotoPreviousForum() {
    gotoPreviousThread();
//    var currentForum = $('.threadrow.selected');
//    if (currentForum.length == 0) {
//    }
//    else {
//        var prevForum = currentForum.prevAll('.threadrow');
//        if (prevForum.length == 0) {
//            // Nothing to do here...you're at the end of the list.
//        }
//        else {
//            currentForum.toggleClass('selected', false);
//            prevForum.first().toggleClass('selected', true);
//            var position = prevForum.first()[0].offsetTop - 30;
//            window.scrollTo(0, position);
//        }
//    }
}

function gotoNextThread() {
    var currentThread = $('.threadrow.selected');
    if (currentThread.length == 0) {
        var firstThread = $('.threadrow').first();
        firstThread.addClass('selected');
        var position = firstThread[0].offsetTop - 30;
        window.scrollTo(0, position);
    }
    else {
        var nextThread = currentThread.nextAll('.threadrow');
        if (nextThread.length == 0) {
            // Nothing to do here...you're at the end of the list.
        }
        else {
            currentThread.toggleClass('selected', false);
            nextThread.first().toggleClass('selected', true);
            var position = getScrollPosition(nextThread.first()[0]);
            window.scrollTo(0, position);
        }
    }
}

function gotoPreviousThread() {
    var currentThread = $('.threadrow.selected');
    if (currentThread.length == 0) {
    }
    else {
        var prevThread = currentThread.prevAll('.threadrow');
        if (prevThread.length == 0) {
            // Nothing to do here...you're at the end of the list.
        }
        else {
            currentThread.toggleClass('selected', false);
            prevThread.first().toggleClass('selected', true);
            var position = getScrollPosition(prevThread.first()[0]);
            window.scrollTo(0, position);
        }
    }
}


function getScrollPosition(e) {
    var position = 0;
    var currentElement = e;
    while (currentElement != undefined && currentElement.offsetParent != currentElement) {
        position += currentElement.offsetTop;
        currentElement = currentElement.offsetParent;
    }

    return position;
}


function gotoNextPage() {

    var nextPages = $('a.currentpage').nextAll('.otherpage');
//    var nextPages = $('.pag_top.navigation .currentpage').nextAll('.otherpage');
    if (nextPages.length > 0) {
        var nextPage = nextPages.first()[0];
        nextPage.click();
    }
}

function gotoPreviousPage() {
    var prevPages = $('a.currentpage').prevAll('.otherpage');
//    var prevPages = $('.pag_top.navigation .currentpage').prevAll('.otherpage');
    if (prevPages.length > 0) {
        var prevPage = prevPages.first()[0];
        prevPage.click();
    }
}

function gotoNextPost() {
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
        }
        else {
            currentPost.toggleClass('selected', false);
            nextPost.first().toggleClass('selected', true);
            var postPosition = nextPost.first()[0].offsetTop - 30;
            window.scrollTo(0, postPosition);
        }
    }
}

function gotoPreviousPost() {
    var currentPost = $('.post_container.selected');
    if (currentPost.length == 0) {
    }
    else {
        var prevPost = currentPost.prevAll('.post_container');
        if (prevPost.length == 0) {
            // Nothing to do here...you're at the end of the list.
        }
        else {
            currentPost.toggleClass('selected', false);
            prevPost.first().toggleClass('selected', true);
            var postPosition = prevPost.first()[0].offsetTop - 30;
            window.scrollTo(0, postPosition);
        }
    }
}

//$(document).keypress(function( event ) {
//    switch (event.which) {
//        case 78: // N
//        case 110: // n
//            var nextPages = $('.pag_top.navigation .currentpage').nextAll('.otherpage');
//            if (nextPages.length > 0) {
//                var nextPage = nextPages.first()[0];
//                nextPage.click();
//            }
//            break;
//        case 80: // P
//        case 112: // p
//            var prevPages = $('.pag_top.navigation .currentpage').prevAll('.otherpage');
//            if (prevPages.length > 0) {
//                var prevPage = prevPages.first()[0];
//                prevPage.click();
//            }
//            break;
//        case 74: // J
//        case 106: // j
////            console.log('next');
//            var currentPost = $('.post_container.selected');
//            if (currentPost.length == 0) {
//                var firstPost = $('.post_container').first();
//                firstPost.addClass('selected');
//                var postPosition = firstPost[0].offsetTop - 30;
//                window.scrollTo(0, postPosition);
//            }
//            else {
//                var nextPost = currentPost.nextAll('.post_container');
//                if (nextPost.length == 0) {
//                    // Nothing to do here...you're at the end of the list.
//                    // Look for the next PAGE and navigate to that?
////                    var nextPages = $('.pag_top.navigation .currentpage').nextAll('.otherpage');
////                    if (nextPages.length > 0) {
////                        var nextPage = nextPages.first()[0];
////                        nextPage.click();
////                    }
//                }
//                else {
//                    currentPost.toggleClass('selected', false);
//                    nextPost.first().toggleClass('selected', true);
//                    var postPosition = nextPost.first()[0].offsetTop - 30;
//                    window.scrollTo(0, postPosition);
//                }
//            }
//            break;
//        case 75: // K
//        case 107: // k
//            var currentPost = $('.post_container.selected');
//            if (currentPost.length == 0) {
////                console.log('No post currently selected...nothing to do.');
//            }
//            else {
//                var prevPost = currentPost.prevAll('.post_container');
//                if (prevPost.length == 0) {
//                    // Nothing to do here...you're at the end of the list.
//                    // Look for the previous PAGE and navigate to that?
////                    var prevPages = $('.pag_top.navigation .currentpage').prevAll('.otherpage');
////                    if (prevPages.length > 0) {
////                        var prevPage = prevPages.first()[0];
////                        prevPage.click();
////                    }
//                }
//                else {
//                    currentPost.toggleClass('selected', false);
//                    prevPost.first().toggleClass('selected', true);
//                    var postPosition = prevPost.first()[0].offsetTop - 30;
//                    window.scrollTo(0, postPosition);
//                }
//            }
////            console.log('prev');
//            break;
//        default:
//            console.log(event.which);
//            console.log(String.fromCharCode(event.which));
//            break;
//    }
//});

function cbool(value, defaultValue) {
    if (value == undefined) {
        return defaultValue;
    }
    switch(value.toLowerCase()){
		case "true": case "yes": case "1": return true;
		case "false": case "no": case "0": case null: return false;
		default: return defaultValue;
	}
}

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

//debugger;
var isEnabled = cbool(localStorage.getItem('potn_extension_enabled'), true);

console.log('potnfixes.js loaded.');
if (isEnabled) {
    $('body').toggleClass('dark');
}
