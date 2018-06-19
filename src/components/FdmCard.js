import React, { PureComponent } from 'react';
import { Button, Card, CardTitle, CardText, CardActions, Icon } from 'react-mdl';
import { titles, roundNumber, numberWithCommas } from '../actions';
import '../css/FdmCard.css';

class FdmCard extends PureComponent {
    render(){
        const { data, color, id } = this.props
        const { current_fytd, previous_fytd, data_set_name } = data;
        let percentChange = ((current_fytd/previous_fytd) - 1) * 100;
        let percentChangeYtd = numberWithCommas(Math.round(percentChange * 100) / 100);
        let department = data_set_name.substr(0, data_set_name.indexOf('_')).toUpperCase()
        if(percentChangeYtd == 'Infinity') percentChangeYtd = '100'
            console.log('CARD RENDERED')
            return(
                    <Card id={id} className='card' shadow={0} style={{background:data.color}}>
                        
                        <CardTitle id="titleMeasure" expand >
                            <h5 id="cardTitle">{titles(data_set_name) !== data_set_name ? titles(data_set_name): data.data_set_name.replace(/_/g, " ")}</h5>
                            <div id="cardDetail">
                                <div id="dep">
                                    <p>{department == 'deb' ? 'dep' : department}</p>
                                </div>
                                <div id="date">
                                    <p >{data.as_of_dt}</p>
                                </div>
                            </div>
                        </CardTitle>

                        
                        <CardText id="percentMeasure">
                            <h4>{percentChangeYtd > 0 ? `+${percentChangeYtd}` : percentChangeYtd}%</h4>
                        </CardText>

                        <CardActions id="yearlyMeasures" border>
                            <div id="currentFytd">
                                <div>Current</div>
                                <div><b>{numberWithCommas(roundNumber(data.current_fytd, 2))}</b></div>
                            </div>
                            <div id="prevFytd" colored>
                                <div>Previous</div>
                                <div><b>{numberWithCommas(roundNumber(data.previous_fytd, 2))}</b></div>
                            </div>
                        </CardActions>
                        
                    </Card>
            )
    }
}


export default FdmCard;

