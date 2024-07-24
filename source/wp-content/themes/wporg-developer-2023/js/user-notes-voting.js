/**
 * Dynamic functionality for voting on user submitted notes.
 *
 * @param {Object} wp The WordPress JavaScript object.
 */

( function ( wp ) {
	document.addEventListener( 'DOMContentLoaded', function () {
		document.querySelectorAll( 'a[data-vote]' ).forEach( ( element ) => {
			element.addEventListener( 'click', function ( event ) {
				// Bail if the AJAX URL is not defined.
				if ( typeof wporg_note_voting === 'undefined' ) {
					return;
				}
				const target = event.target;
				event.preventDefault();
				const comment = target.closest( '.comment' );

				const params = new URLSearchParams();
				params.append( 'action', 'note_vote' );
				params.append( 'comment', target.getAttribute( 'data-id' ) );
				params.append( 'vote', target.getAttribute( 'data-vote' ) );
				params.append( '_wpnonce', target.parentNode.getAttribute( 'data-nonce' ) );

				fetch( wporg_note_voting.ajaxurl, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded',
					},
					body: params,
				} )
					.then( ( response ) => response.text() )
					.then( ( data ) => {
						if ( '0' !== data ) {
							target.closest( '.user-note-voting' ).outerHTML = data;
							wp.a11y.speak( comment.querySelector( '.user-note-voting-count' ).textContent );
						}
					} );
			} );
		} );
	} );
} )( window.wp );
