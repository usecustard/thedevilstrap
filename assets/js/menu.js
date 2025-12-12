(function() {
	var triggerBttn = document.getElementById( 'trigger-overlay' ),
		body = document.querySelector( 'body' ),
		overlay = document.querySelector( 'div.primary-navigation' ),
		closeBttn = overlay.querySelector( 'div.primary-navigation a.close-menu' );
		transEndEventNames = {
			'WebkitTransition': 'webkitTransitionEnd',
			'MozTransition': 'transitionend',
			'OTransition': 'oTransitionEnd',
			'msTransition': 'MSTransitionEnd',
			'transition': 'transitionend'
		},
		transEndEventName = transEndEventNames[ Modernizr.prefixed( 'transition' ) ],
		support = { transitions : Modernizr.csstransitions };

	/* stop body scroll */
	function stopBodyScrolling (bool) {
	    if (bool === true) {
	        document.body.addEventListener("touchmove", freezeVp, false);
	    } else {
	        document.body.removeEventListener("touchmove", freezeVp, false);
	    }
	}



	/* default prevent for above function */
	var freezeVp = function(e) {
	    e.preventDefault();
	}

	function toggleOverlay() {
		if( classie.has( overlay, 'open' ) ) {
			classie.remove( overlay, 'open' );
			classie.remove( body, 'menu-opened' );
			classie.add( overlay, 'close' );
			stopBodyScrolling(false);
			var onEndTransitionFn = function( ev ) {
				if( support.transitions ) {
					if( ev.propertyName !== 'visibility' ) return;
					this.removeEventListener( transEndEventName, onEndTransitionFn );
				}
				classie.remove( overlay, 'close' );
			};
			if( support.transitions ) {
				overlay.addEventListener( transEndEventName, onEndTransitionFn );
			}
			else {
				onEndTransitionFn();
			}
		}
		else if( !classie.has( overlay, 'close' ) ) {
			classie.add( overlay, 'open' );
			classie.add( body, 'menu-opened' );
			stopBodyScrolling(true);
		}
	}

	document.onkeydown = function(evt) {

	    evt = evt || window.event;

	    var isEscape = false;

	    if ("key" in evt) {
	        isEscape = (evt.key == "Escape" || evt.key == "Esc");
	    } else {
	        isEscape = (evt.keyCode == 27);
	    }

	    if (isEscape && classie.has( overlay, 'open' ) ) {
			toggleOverlay();
		}

	};

	triggerBttn.addEventListener( 'click', toggleOverlay );
	closeBttn.addEventListener( 'click', toggleOverlay );


})();
