import React from 'react';
import { Grid } from 'react-mdl'; 
import '../css/fdmGrid.css';

const FdmGrid = (props) =>{
	const { children } = props
         return(
                 <Grid id="map" className="fcm-grid">
                    	{ children }
                 </Grid>
             )
}

export default FdmGrid;