import boroughBoundries from '../geoJson/boroughBoundaries';
import communityDistricts from '../geoJson/communityDistricts';
import policePrecincts from '../geoJson/policePrecincts'


export const formatJSON = (cordList)=> {
	 var cordSet= cordList.features.map((geo) => {
	 	const { precinct, BoroCode, BoroCD, id } = geo.properties;

	 	if(geo.geometry.type == "Polygon"){
	 		let points = geo.geometry.coordinates[0].map(
	 				 	(cords) => { return {lng: cords[0], lat: cords[1] }} )

	 		return { geo_id: precinct || BoroCode || BoroCD ||id, points }
	 	}

	 	if(geo.geometry.type == "MultiPolygon"){
	 		// let arrOne = geo.geometry.coordinates[0].map(
	 		// 			(cords) => { return cords.map(
	 		// 				(innerCords) => { return {lng: innerCords[0], lat: innerCords[1]} }) })[0]
	 		// let arrTwo = geo.geometry.coordinates[1].map(
	 		// 			(cords) => { return cords.map(
	 		// 				(innerCords) => { return {lng: innerCords[0], lat: innerCords[1]} }) })[0]

	 		// let arrThree = geo.geometry.coordinates[2].map(
	 		// 			(cords) => { return cords.map(
	 		// 				(innerCords) => { return {lng: innerCords[0], lat: innerCords[1]} }) })[0]
	 		let points = geo.geometry.coordinates.map((coordLine) =>{
	 			return coordLine.map((cords)=> {
	 				return cords.map((innerCords)=>{
	 					return {lng: innerCords[0], lat:innerCords[1]}
	 				})
	 			})[0]
	 		})

	 		return {geo_id: precinct || BoroCode || BoroCD || id, points}	
	 	}



	 })

	 return cordSet
}

export const determineMapType = (coordinates) =>{

	for(let i =0; i< coordinates.length; i++){
		if(coordinates[i].geo_type == "nycd"){
			return "nycd"; break
		}else if(coordinates[i].geo_type == "nypp"){
			return "nypp"; break
		}else if(coordinates[i].geo_type == "nybb"){
			return "nybb"; break
		}
	}
}

export const determineMapLayout = (mapType) => {
	console.log("MAPE TYPE: ",mapType)
		switch(mapType){
		case "nycd":
			return formatJSON(communityDistricts)
		case "nypp":
			return formatJSON(policePrecincts)
		case "nybb":
			return formatJSON(boroughBoundries)
		default:
			return '';
	}
}

export const mergeLayOutGraphPoints = (layoutPoints, graphPoints) => {
	let pointsArray = []
	layoutPoints.forEach((point) =>{
		return graphPoints.forEach((graphPoint) =>{
			if(Number(point.geo_id) == Number(graphPoint.geo_id)){
				pointsArray.push({ graph: graphPoint, layout: point})
			}
		})
	})
	return pointsArray
}