import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, FormGroup, FormControl } from 'react-bootstrap';
import { onSearch, resetCardSearch, sortWorstToBest, sortBestToWorst, fetchCardsData } from '../actions';
import { Link } from 'react-router-dom';

class FdmFilter extends Component {

    handleChange(e){
        const { value } = e.target;
        if (value.length > 1 ) this.props.onSearch(value)
        if(value.length == 0) this.props.resetCardSearch()
    }

    sortByDepartment(){
        if(this.props.groupedCards.length == 0) this.props.fetchCardsData()
    }

    renderMenuItem(){
        if(this.props.groupedCards.length == 0){
            return <MenuItem eventKey="4.1" onClick={ (e) => { this.props.resetCardSearch() } } className="menuItem">By Department</MenuItem>
        }
    }

    render(){
        const { sortBestToWorst, sortWorstToBest } = this.props;
        console.log('RENDERED FILTER')
        return(
            <Navbar inverse id="FILTER">
            <Nav>
            <NavItem>
                <NavDropdown eventKey="4" title="Compare" id="nav-dropdown">
                    <MenuItem eventKey="4.1" className="menuItem">Year to Date</MenuItem>
                    <MenuItem eventKey="4.2" className="menuItem" >Same Period Last Year</MenuItem>
                    <MenuItem eventKey="4.3" className="menuItem">Last Month/Week/Day</MenuItem>
                    <MenuItem divider />
                    <MenuItem eventKey="4.4" id="menuItem"></MenuItem>
                </NavDropdown>
            </NavItem>
            <NavItem>    
                <NavDropdown eventKey="4" title={this.props.picker} id="nav-dropdown">
                    {
                        this.renderMenuItem()
                    }
                    <MenuItem eventKey="4.2" onClick={ (e) => { sortBestToWorst() } } className="menuItem">Worst to Best</MenuItem>
                    <MenuItem eventKey="4.3" onClick={ (e) => { sortWorstToBest() } } className="menuItem">Best to Worst</MenuItem>
                    <MenuItem divider />
                    <MenuItem eventKey="4.4"></MenuItem>
                </NavDropdown>
            </NavItem>
            </Nav>
            <Nav pullRight>
                <Navbar.Form pullRight>
                    <FormGroup>
                        <FormControl type="text" placeholder="Search" onChange={this.handleChange.bind(this)} />
                    </FormGroup>{' '}
                </Navbar.Form>
            </Nav >
            </Navbar>
            )
    }
}


const  mapStateToProps = state => {
  const { picker, groupedCards } = state.cards 
  return { picker, groupedCards }
}

export default connect(mapStateToProps, { onSearch, resetCardSearch, sortWorstToBest, sortBestToWorst, fetchCardsData })(FdmFilter);