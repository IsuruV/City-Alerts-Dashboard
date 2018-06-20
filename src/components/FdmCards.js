import React, { Component } from 'react';
import { connect } from 'react-redux';
import $ from 'jquery';
import { getDispatcher, fetchCardsData, hideOrShowSlider, URL, FETCH_DATA } from '../actions';
import '../css/FdmCards.css';
import FdmCard from './FdmCard';
import FdmGrid from './FdmGrid';
import FdmFilter from './FdmFilter';
import { Content, Cell } from 'react-mdl';
import { Link } from 'react-router-dom';
import Loading from './Loading';

class FdmCards extends Component {

  componentWillMount(){
    const { getDispatcher } = this.props;
    const { cards, groupedCards, searchedCards } = this.props.cards;
    if (cards.length == 0) getDispatcher('GET', 'api', FETCH_DATA)
  }

  componentDidMount(){
    $('.mdl-layout__drawer-button').show()
    this.fadeHeader()
    //hideOrShowSlider(window)
  }

  componentDidUpdate(prevProps, prevState){
    if (this.props.cards.groupedCards.length > 0){
        $('.mdl-layout__header').fadeIn(10);
        $('#FILTER').fadeIn(10);
    }
  }

  fadeHeader(){
      $(document).ready(function() {
        let lastScrollTop = 0;
        let filter = $('.mdl-layout__header');

        $('div').bind("scroll", function() {

        let scrolled = $(this).scrollTop();
        if (scrolled > lastScrollTop)
          {
            console.log(filter[0]['position'])
            filter.hide();
            $('#FILTER').hide();
            scrolled = $(this).scrollTop();
           }
        else
          {
            console.log($(this).scrollTop())
            filter.show();
            $('#FILTER').show();
         }
         lastScrollTop = scrolled;

       });
     });
  }

  renderCards(){
    //fixes plotly resizing error
    window.onresize = null;
    hideOrShowSlider(window);
    const { cards, searchedCards, groupedCards } = this.props.cards;
    if(groupedCards.length > 0 ){
      return groupedCards.map((dataPoint) => !!(dataPoint.data_set_name !== 'doc_dept_use_of_force_incidents') && <Cell id="groupedCards" key={dataPoint.data_set_name} col={4}><Link to={{pathname: `/${dataPoint.data_set_name}`, state: {data: dataPoint} }} style={{color: 'black'}}><FdmCard id={dataPoint.data_set_name} data={dataPoint}/></Link></Cell>);
    }
    if(searchedCards.length > 0 ){
      return searchedCards.map((dataPoint) => <Cell id="searchedCards" key={dataPoint.data_set_name} col={4}><Link to={{pathname: `/${dataPoint.data_set_name}`, state: {data: dataPoint} }} style={{color: 'black'}}><FdmCard id={dataPoint.data_set_name} data={dataPoint}/></Link></Cell>);
    }
    if(cards.length > 0 && searchedCards.length == 0 ){
       return cards.map((dataPoint) => !!(dataPoint.data_set_name.indexOf('doe') <= -1 && (dataPoint.data_set_name !='Unspecified')) && <Cell id="generalCards" key={dataPoint.data_set_name} col={4}><Link to={{pathname: `/${dataPoint.data_set_name}`, state: {data: dataPoint} }} ><FdmCard id={dataPoint.data_set_name} color="#330000" data={dataPoint}/></Link></Cell>);
    }else {
      return <Loading/>
    }
  }

  render() {
    return (
      <Content>
        <FdmFilter/>
        <FdmGrid>
            {this.renderCards()}
        </FdmGrid>
      </Content>
    );
  }
}

const  mapStateToProps = state => {
  const { cards, searchedCards, groupedCards } = state
  return { cards, searchedCards, groupedCards  }
}

export default connect(mapStateToProps, {fetchCardsData, getDispatcher})(FdmCards);
