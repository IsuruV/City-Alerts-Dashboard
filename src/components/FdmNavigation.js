import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Layout, Header, Drawer, Navigation, Content } from 'react-mdl';
import { filterByDataSet, fetchCardsData, resetCardSearch, publicList, operationsList, equityList, urgentList, sortWorstToBest, sortBestToWorst } from '../actions';
import $ from 'jquery';
import {withRouter} from 'react-router-dom'

class FdmNavigation extends Component{
    
    constructor(props){
        super(props)
        this.state = { title: 'All Indicators' }
    }

    componentDidMount(){
        let container = document.getElementsByClassName("mdl-layout__drawer-button")
        container[0].style["background-color"] ="black"
    }

    closeDrawerer(){
        let container = document.getElementsByClassName("mdl-layout__obfuscator is-visible")[0]
        let drawer = document.getElementsByClassName("mdl-layout__drawer is-visible")[0]
        container.className = "mdl-layout__obfuscator"
        drawer.className = "mdl-layout__drawer"
    }
    
    filterBy(name, e=null){
        if(name == 'All Indicators') {this.props.resetCardSearch()} else { this.props.filterByDataSet(name) };
        e ?  this.setState({title: e.target.text}) : this.setState({title: name})
        this.closeDrawerer();
    }
    sortWorst(){
        this.props.sortBestToWorst()
        this.closeDrawerer();
    }
    sortBest(){
        this.props.sortWorstToBest()
        this.closeDrawerer();
    }

    determineRoute(window){
        const { href } = window.location;
       if(!!href.substr(href.lastIndexOf('/')+1,href.length)){
            this.props.history.push('/')
       }else{
         this.props.fetchCardsData()
       }
    }

    render(){
        return(
                <Layout id="HEADER" fixedHeader>
                    <Header title={<span><span style={{ color: '#ddd'}}></span><a id="fdm-title" href="" onClick={ (e) => this.determineRoute(window) }><strong>FDM Indicators</strong></a></span>}>
                            <Navigation style={{display: 'flex'}}>
                                <li>Sign Out</li>
                                <li><img id="gear-setting-icon" style={{height:"30px", width:"30px"}} src={'https://www.materialui.co/materialIcons/action/settings_white_192x192.png'}/></li>
                            </Navigation>
                    </Header>
                        <Drawer title={<b>{this.state.title}</b>} id="COLORTHIS">
                            <Navigation>
                                <a onClick={(e) => this.filterBy('All Indicators') }>All Indicators</a>
                                <a onClick={(e) => this.filterBy(operationsList,e) }>Operations</a>
                                <a onClick={(e) => this.filterBy(equityList, e) }>Equity</a>
                                <a onClick={(e) => this.filterBy(publicList, e) }>Public</a>
                                <a onClick={(e) => this.filterBy(urgentList, e) }>Urgent</a>
                                <a onClick={(e) => {this.sortWorst(); this.setState({title: 'Worsening'})} }>Worsening</a>
                                <a onClick={(e) => {this.sortBest(); this.setState({title:'Improving or Stable'})} }>Imporving or Stable</a>
                                <a></a>
                                <hr></hr>
                                <a onClick={(e) => this.filterBy(['311'], e) }>311</a>
                                <a onClick={(e) => this.filterBy(['acs'], e) }>ACS</a>
                                <a onClick={(e) => this.filterBy(['ccrb'], e) }>CCRB</a>
                                <a onClick={(e) => this.filterBy(['dcas'], e) }>DCAS</a>
                                <a onClick={(e) => this.filterBy(['dep'], e) }>DEP</a>
                                <a onClick={(e) => this.filterBy(['dhs'], e) }>DHS</a>
                                <a onClick={(e) => this.filterBy(['dob'], e) }>DOB</a>
                                <a onClick={(e) => this.filterBy(['doc'], e) }>DOC</a>
                                <a onClick={(e) => this.filterBy(['doe'], e) }>DOE</a>
                                <a onClick={(e) => this.filterBy(['dohmh'], e) }>DOHMH</a>
                                <a onClick={(e) => this.filterBy(['dop'], e) }>DOP</a>
                                <a onClick={(e) => this.filterBy(['dot'], e) }>DOT</a>
                                <a onClick={(e) => this.filterBy(['dsny'], e) }>DSNY</a>
                                <a onClick={(e) => this.filterBy(['fdny'], e) }>FDNY</a>
                            </Navigation>
                        </Drawer>

                    <Content>
                        {this.props.children}
                    </Content>
                </Layout>
            )
    }
}


export default withRouter(connect(null, { filterByDataSet, fetchCardsData, resetCardSearch, sortWorstToBest, sortBestToWorst })(FdmNavigation));