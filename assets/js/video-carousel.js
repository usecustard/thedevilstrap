(function() {
    var wrapper         = document.querySelector( 'div.home-video-wrapper' ),
        totalVideos     = wrapper.querySelectorAll( 'video.vid' ).length,
        initialVideo    = wrapper.querySelector( 'video.vid-current' ),
        logo            = wrapper.querySelector( 'div.logo-holder img' ),

        controls        = document.querySelector( 'footer.vid-controls' ),
        prevBttn        = controls.querySelector( 'a.prev' ),
        nextBttn        = controls.querySelector( 'a.next' ),
        clipCurrent     = controls.querySelector( 'span.clip-current' ),
        clipTotal       = controls.querySelector( 'span.clips-total' );

        transEndEventNames = {
            'WebkitTransition': 'webkitTransitionEnd',
            'MozTransition': 'transitionend',
            'OTransition': 'oTransitionEnd',
            'msTransition': 'MSTransitionEnd',
            'transition': 'transitionend'
        },
        transEndEventName = transEndEventNames[ Modernizr.prefixed( 'transition' ) ],
        support = { transitions : Modernizr.csstransitions };



    function getCurrentVideoObj() {
        var currentVideoObj = wrapper.querySelector( 'video.vid-current' );
        return currentVideoObj;
    }

    function getCurrentVideoNum() {

        var currentVideoId = getCurrentVideoObj().id;
        var videoNumber = currentVideoId.replace( /^\D+/g, ''); /* replace all leading non-digits with nothin */
        videoNumber = parseInt(videoNumber);

        return videoNumber;

    }

    function prevVideoNum() {

        if ( getCurrentVideoNum() === 1 ) {
            var nextNo = totalVideos ;
        } else {
            var nextNo = getCurrentVideoNum() - 1;
        }

        return nextNo;
        
    }

    function nextVideoNum() {

        if ( getCurrentVideoNum() === totalVideos ) {
            var nextNo = 1 ;
        } else {
            var nextNo = getCurrentVideoNum() + 1;
        }

        return nextNo;

    }

    function switchVideo( targetVideoNum ) {

        currentVid      = getCurrentVideoObj();
        targetID        = 'video' + targetVideoNum;
        targetVid       = document.getElementById(targetID);

        clipCurrent.innerHTML = targetVideoNum;
        targetVid.play();
        currentVid.pause();
        classie.remove( currentVid , 'vid-current' );
        classie.add( targetVid , 'vid-current' );

        currentVid.removeEventListener( 'ended', nextVideo );
        targetVid.addEventListener( 'ended', nextVideo );

        if ( targetVideoNum === 1 ) {

            console.log ('fire A');

            if ( classie.has( logo , 'shown' ) ) {
                classie.remove( logo , 'shown' );
                console.log ('fire number 1');
            }

        } else {

            if ( !classie.has( logo , 'shown' ) ) {
                classie.add( logo , 'shown' );
            }

        }


        

    }

    function prevVideo() {
        switchVideo( prevVideoNum() );
    }

    function nextVideo() {
        switchVideo( nextVideoNum() );
    }

    document.onkeydown = function(e) {

        switch(e.which) {
            case 37: // left
            break;

            case 38: // up
            nextVideo();
            break;

            case 39: // right
            break;

            case 40: // down
            prevVideo();
            break;

            default: return; // exit this handler for other keys
        }

        e.preventDefault(); // prevent the default action (scroll / move caret)

    };

    initialVideo.addEventListener( 'ended', nextVideo );
    prevBttn.addEventListener( 'click', prevVideo );
    nextBttn.addEventListener( 'click', nextVideo );
    initialVideo.play();

})();
