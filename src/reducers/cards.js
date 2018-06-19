import { FETCH_DATA, SEARCH_CARDS, RESET_CARD_SEARCH, SORT_BEST_WORST, SORT_WORST_BEST, SORT_BY_GROUP, CACH_CARD_DETAIL, sortWorstToBest, sortBestToWorst, groupItems, getLatestItem, calculateRGB, appendFakeColor, filterSubjectAreas } from '../actions'


const INITAL_STATE = {cards:[], searchedCards: [], groupedCards: [], cardDetail: [], cachedCardDetail: [], picker:'By Department', raw_cards: []};

export default function(state = INITAL_STATE, action){
	switch(action.type){

		case FETCH_DATA:
			let cardsWithColor = action.payload.map((card) => appendFakeColor(card));
			let grouped = groupItems(cardsWithColor, j => j.data_set_name);
			let latestItems = getLatestItem(grouped);
	
			return { ...state, cards: latestItems, groupedCards: [], picker:'By Department', raw_cards: latestItems }

		case SEARCH_CARDS:
			let filteredCards = state.cards.slice().filter((card) => card.data_set_name.replace(/_/g, " ").indexOf(action.payload) >= 0 )
			
			return { ...state, searchedCards: filteredCards, groupedCards: [] }

	    case RESET_CARD_SEARCH:
	    	return { ...state, cards: state.raw_cards, searchedCards: [], groupedCards:[], picker:'By Department' }

	    case SORT_BEST_WORST:
	    	let sortedCardsWorst = state.cards.slice().length > 0 ? state.cards.slice().sort((a, b) => b.colorNumber - a.colorNumber) : []
	    	let sortedSearchedCardsWorst = state.searchedCards.slice().length > 0 ? state.searchedCards.slice().sort((a, b) => b.colorNumber - a.colorNumber) : []
	    	let sortedGroupedCardsWorst = state.groupedCards.slice().length > 0 ? state.groupedCards.slice().sort((a, b) => b.colorNumber - a.colorNumber) : []

	    	return { ...state, cards: sortedCardsWorst, searchedCards: sortedSearchedCardsWorst, groupedCards: sortedGroupedCardsWorst, picker: 'Worst to Best' }

	    case SORT_WORST_BEST:
	    	let sortedCardsBest = state.cards.slice().length > 0 ? state.cards.slice().sort((a, b) => a.colorNumber - b.colorNumber) : []
	    	let sortedSearchedCardsBest = state.searchedCards.slice().length > 0 ? state.searchedCards.slice().sort((a, b) => a.colorNumber - b.colorNumber) : []
	    	let sortedGroupedCardsBest = state.groupedCards.slice().length > 0 ? state.groupedCards.slice().sort((a, b) => a.colorNumber - b.colorNumber) : []
	    	
	    	return { ...state, cards: sortedCardsBest, searchedCards: sortedSearchedCardsBest, groupedCards: sortedGroupedCardsBest, picker: 'Best to Worst' }

	    case SORT_BY_GROUP:
	    	let groupedCards = filterSubjectAreas(state.cards.slice(), action.payload)
	    	
	    	return { ...state, groupedCards, picker:'By Department' }
	    
	    case CACH_CARD_DETAIL:
	    	const { cachedCardDetail } = state;

	    	return { ...state, cachedCardDetail: cachedCardDetail.concat([action.payload]) }

		default:
			return state;
	}
}