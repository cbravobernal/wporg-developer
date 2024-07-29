import { getElement, store } from '@wordpress/interactivity';
/**
 * Takes care of hiding and displaying sections with tabs
 *
 * Allow users to switch focus between the aria-selected tab and the content.
 * Change focus between tabs using the left and right arrow keys.
 * Use the TAB key as normal to focus the first element inside the visible tab panel.
 *
 * Html markup needed for a tabbed list
 *
 * <div class=".tab-container">
 *     <ul class="tablist">
 *         <li><a href="#section-1">Section 1</a></li>
 *         <li><a href="#section-2">Section 2</a></li>
 *     </ul>
 *     <div id="section-1" class="tab-section">Section 1 content</div>
 *     <div id="section-2" class="tab-section">Section 2 content</div>
 * </div>
 * @param $
 */

const { state } = store( 'wporg-developer/tabs', {
	actions: {
		tabClick: ( event ) => {
			event.preventDefault();
			const element = getElement();
			state.tabSelected = element.ref.getAttribute( 'href' );
		},
	},
	// eslint-disable-next-line object-shorthand
	state: {
		tabSelected: '#comment-form-comment',
		tabActive: () => {
			const { ref } = getElement();
			return ref?.hash === state.tabSelected;
		},
		sectionActive: () => {
			const { ref } = getElement();
			return `#${ ref?.id }` === state.tabSelected;
		},
		tabIndex: () => {
			return state.tabActive() ? '0' : '-1';
		},
	},
} );
