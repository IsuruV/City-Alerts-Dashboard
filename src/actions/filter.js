import { SEARCH_CARDS, RESET_CARD_SEARCH, SORT_BEST_WORST, SORT_WORST_BEST, SORT_BY_GROUP, DEFAULT_HEADERS, CACH_CARD_DETAIL } from './types';
import { getDispatcher } from '../actions'
import axios from 'axios';


export const onSearch = (text) => {
	return { type: SEARCH_CARDS, payload: text }
}

export const resetCardSearch = () => {
	return { type: RESET_CARD_SEARCH }
}

export const stripDepartment = (department) => {
	var strip = []
	for(var i=0; i<department.length; i++){
	    if(department[i] == "_"){
	        break;
	    }else{
	        strip.push(department[i])
	    }
	}
	strip.join("")
}

export const sortWorstToBest = () =>{

    return { type: SORT_WORST_BEST }
}

export const sortBestToWorst = () =>{
    
    return { type: SORT_BEST_WORST }
}

export const filterByDataSet = (dataSetName) =>{
    console.log("FILTERED DATA")
    return { type: SORT_BY_GROUP, payload: dataSetName }
}

export const filterSubjectAreas = (cards, dataSetNames) =>{
	let results = [];
	dataSetNames.forEach((set) => {
		let foundCards = cards.filter((card) => card.data_set_name.replace(/_/g, " ").indexOf(set) >= 0 )
		foundCards.forEach(card => results.push(card))
	});
	return results
}

export const publicList = ['homeless encampment 311', 'homeless inquiry 311', 'street conditions 311','noise complaints 311','landlord complaints 311'];
export const operationsList = ['fdny civilian fire fatalities', 'doc dept use of force incidents', 'nypd motorist fatalities', 
							   'tlc legal street hail green', 'dep wmb', 'dot potholes repaired', 'doc dept use of force incidents', 'tlc legal street hail yellow',
							   'nycha open maintenance work orders', 'fdny structural fires', 'doc inmate assault on staff', 'hhc general care length of stay',
							   'dsny streets clean', 'fdny 911 fire times', 'dsny tons of refuse disposed', 'dcas overall fleet out of service rate', 
							   'fdny ambulance times', 'dcas critical fleet out of service rate', 'dsny curbside recycling diversion rate', 'dohmh number of infant deaths',
							   'dop num rearrests adult', 'dob construction floor area', 'omb private employment', 'nypd 911 inprogress time', 'dob new construction permits',
							   'dop num rearrests juvenile', ]
export const equityList = ['hpd total starts', 'hra', 'dhs', 'service requests 311', 'nycha time prepare vacant', 'doe renewal school attend k8', 'ccrb', 
						   'acs abuse neglect', 'hpd total unites preserved']
export const urgentList = ['fdny civilian fire fatalities', 'doc dept use of force incidents', 'nypd motorist fatalities', 'nypd nonmotorist fatalities', 
						   'tlc legal street hail green', 'hpd total starts', 'homeless inquiry 311', 'wmb', 'clients hra', 'dot potholes', 'doc dep use of force incidents', 
						   'tlc legal street hail yellow', 'street conditions 311']


