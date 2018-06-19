import { URL, FETCH_DATA, SET_CARD_PLOT, DEFAULT_HEADERS, CACH_CARD_DETAIL } from './types';
import { getDispatcher, titlize } from './globalActions';

export const groupItems = (list, keyGetter) => {
    const map = new Map();
    list.forEach((item) => {
        const key = keyGetter(item);
        const collection = map.get(key);
        if (!collection) {
            map.set(key, [item]);
        } else {
            collection.push(item);
        }
    });
    return map;
}



export const getLatestItem = (map) =>{
	let itemArr = Array.from(map);
	let latestItems = itemArr.map((item) => {

        let filtereZeros = item[1].filter((n) =>  n.current_fytd != '0' || n.previous_fytd != '0')
        let filterNones = filtereZeros.filter((n) =>  n.current_fytd !== 'None' || n.previous_fytd !== 'None')
        return filterNones[0];

        //return item[1][0] 
    } )
    console.log(itemArr)
    console.log(latestItems)
	return latestItems.filter(function(n){ return n != undefined });
}

export const fetchCardsData = () => {
    console.log("FETCHING  DATA")
  return getDispatcher('GET', URL, FETCH_DATA)
}


export const calculateHue = (percent, start, end) => {
  var a = percent / 100,
      b = (end - start) * a,
      c = b + start;

  // Return a CSS HSL string
  return 'hsl('+c+', 100%, 50%)';
}

export const calculateRGB = ( ) => {
    let randNum = Math.floor(Math.random() * 10);
    switch(randNum){
        case 0:
            return ['rgb(8, 130, 70)', 0]
        case 1:
            return ['rgb(55, 157, 78)', 1]
        case 2:
            return ['rgb(102, 183, 87)', 2]
        case 3:
            return ['rgb(149, 210, 95)', 3]
        case 4:
            return ['rgb(204, 233, 148)', 4]
        case 5:
            return ['rgb(251, 190, 121)', 5]
        case 6:
            return ['rgb(250, 160, 82)', 6]
        case 7:
            return ['rgb(248, 130, 44)', 7]
        case 8:
            return ['rgb(239, 99, 43)', 8]
        case 9:
            return ['rgb(222, 38, 42)', 9]
        default:
            return ['rgb(222, 38, 42)', 10];
    }
}

export const appendFakeColor = (card) =>{
    let color = calculateRGB()
    card['color'] = color[0];
    card['colorNumber'] = color[1];
    return card;
}

export const titles = (datasetName) => {
        switch(datasetName){
        case 'homeless_encampment_311':
            return titlize('NYPD Homeless - Chronic or Encampment Complaints')
        case 'landlord_complaints_311':
            return titlize('HPD Landlord Complaints')
        case 'noise_complaints_311':
            return titlize('NYPD Noise Complaints ')
        case 'homeless_inquiry_311':
            return titlize('Homeless Calls to 311')
        case 'service_request_311':
            return titlize('Service Requests per 1,000 Residents')
        case 'acs_abuse_neglect':
            return titlize('Substantiated Child Abuse and/or Neglect Reports')
        case 'acs_youth_on_youth_assault':
            return titlize('Youth on Youth Assault with Injury')
        case 'ccrb_complaints':
            return 'Civilian Complaints Against Police'
        case 'dcas_critical_fleet_out_of_service_rate':
            return titlize('Critical Fleet Out of Service Rate')
        case 'dcas_overall_fleet_out_of_service_rate':
            return titlize('Overall Fleet Out of Service Rate')
        case 'dep_wmb':
            return titlize('Water Main Breaks per 100 Miles')
        case 'dep_sbu':
            return titlize('Sewer Backups per 100 Miles')
        case 'dhs_adult_shelter':
            return titlize('Single Adults in DHS shelter')
        case 'dhs_withchildren_shelter':
            return titlize('Families with Children census in DHS shelter')
        case 'dhs_families_shelter':
            return titlize('Families census in DHS shelter')
        case 'dob_new_construction_permits':
            return titlize('New Construction Permits')
        case 'dob_construction_floor_area':
            return titlize('New Construction Floor Area')
        case 'dob_days_to_complete_first_plan_review':
            return titlize('Days to Complete First Plan Review for New Buildings')
        case 'doc_inmate_fight_incidents':
            return titlize('Fight/Assault Infractions')
        case 'doc_slashing_stabbing_incidents':
            return titlize('Slashing/Stabbing Incidents')
        case 'doc_inmate_assault_on_staff_a':
            return titlize('Inmate Assaults on Staff - Class A')
        case 'doc_inmate_assault_on_staff':
            return titlize('Inmate Assaults on Staff - Total')
        case 'doc_average_daily_population':
            return titlize('Average Daily Population in Jail')
        case 'doc_dept_use_of_force_incidents':
            return titlize('Department Use of Force - Class A Incidents')
        case 'doc_dept_use_of_force_total_incidents':
            return titlize('Department Use of Force - Total Incidents')
        case 'dohmh_new_tuberculosis_cases':
            return titlize('Number of Tuberculosis cases')
        case 'dohmh_number_of_infant_deaths':
            return titlize('Number of Infant Deaths')
        case 'dop_num_rearrests_adult':
            return titlize('Rearrests for Violent Felonies - Adult')
        case 'dop_num_rearrests_juvenile':
            return titlize('Rearrests for Violent Felonies - Juvenile')
        case 'dot_potholes_repaired':
            return titlize('Potholes Repaired')
        case 'dsny_curbside_recycling_diversion_rate':
            return titlize('Curbside and Containerized Recycling Diversion Rate')
        case 'dsny_streets_clean':
            return titlize('Streets Rated Acceptably Clean')
        case 'dsny_tons_of_refuse_disposed':
            return titlize('Tons of Refuse Disposed')
        case 'fdny_911_fire_times':
            return titlize('911 Fire Response Times')
        case 'fdny_ambulance_times':
            return titlize('911 Ambulance Response Times')
        case 'fdny_civilian_fire_fatalities':
            return titlize('Civilian Fire Fatalities')
        case 'fdny_structural_fires':
            return titlize('911 Structural Fires Response Time')
        case 'deb_wmb':
            return titlize('Water Main Breaks per 100 Miles')
        case 'nypd_shooting':
            return titlize('NYPD Shooting')
        case 'nypd_total_crime':
            return titlize('NYPD Total Crime')
        case 'tlc_legal_street_hail':
            return titlize('TLC Legal Street Hail')
        case 'tlc_legal_street_hail_green':
            return titlize('TLC Legal Street Hail Green Light')
        case 'tlc_legal_street_hail_yellow':
            return titlize('TLC Legal Street Hail Yellow Light')
        case 'hra_snap_benefits':
            return titlize('HRS Snap Benefits')
        case 'hhc_general_care_length_of_stay':
            return titlize('HHC General Care Length of Stay')
        case 'omb_private_employment':
            return titlize('OMB Private Employment')
        case 'hpd_total_units_preserved':
            return titlize('HPD Total Units Preserved')
        case 'idnyc_cards_produced':
            return titlize('ID-NYC Cards Produced')
        case 'hra_clients_hra_helped_obtain_employment':
            return titlize('Clients HRA Helped Obtain Employment')
        case 'nycha_open_maintenance_work_orders':
            return titlize('NYCHA Open Maintenance Work Orders')
        case 'hpd_total_starts':
            return titlize('HPD Total Starts')
        case 'nycha_major_felony_crimes_public_housing':
            return titlize('NYCHA Major Felony Crimes Public Housing')
        case 'hpd_total_housing_starts':
            return titlize('HPD Total Housing Starts')
        case 'idnyc_total_requests':
            return titlize('ID-NYC Total Requests')
        case 'hra_cash_assistance':
            return titlize('HRS Cash Assistance')
        case 'nypd_murder':
            return titlize('NYPD Murder')
        case 'nypd_motorist_fatalities':
            return titlize('NYPD Motorist Fatalities')
        case 'nycha_time_prepare_vacant':
            return titlize('NYCHA Time Prepare Vacant')
        case 'tlc_trips_fhv_app':
            return titlize('TLC Trips requested by App')
        case 'hpd_time_to_close_emergency_complaints':
            return titlize('HPD Time to Close Emergency Complaints')
        case 'nypd_nonmotorist_fatalities':
            return titlize('NYPD Non-Motorist Fatalities')
        case 'nypd_911_inprogress_time':
            return titlize('NYPD 911 In Progress Time')
        case 'omb_tax_withholding':
            return titlize('OMB Tax Withholding')
        default:
            return titlize(datasetName.replace(/_/g," "));
    }
}


export const cachDetail = (data) => {
    return { type: CACH_CARD_DETAIL, payload: data }
}

export const hideOrShowSlider = (window) => {
    const { document } = window;
    if(!!document.getElementsByClassName('mdl-layout__drawer-button')[0]){
        if(!!window.location.href.substr(window.location.href.lastIndexOf('/')+1,window.location.href.length)){
            document.getElementsByClassName('mdl-layout__drawer-button')[0].style.visibility = 'hidden'
        }else{
            document.getElementsByClassName('mdl-layout__drawer-button')[0].style.visibility = ''
            }
    }
}