/**
 *
 * PlaceDashboard
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectPlaceDashboard from './selectors';
import reducer from './reducer';
import saga from './saga';
import PersonCard from '../../components/PersonCard';
import PhotoGrid from '../../components/PhotoGrid';
import TweetList from '../../components/TweetList';
import Trends from '../../components/Trends';

/* eslint-disable react/prefer-stateless-function */
export class PlaceDashboard extends React.PureComponent {
  render() {
    return (
      <article>
      
      <div className="container-fluid" style={{ marginTop: '2em' }}>

        <div className="row">
          <div className="col">
            <PersonCard topicInfo={this.props.topicInfo}  twitterInfo={this.props.twitterInfo}/>
          </div>

          <div className="col">
            <PhotoGrid topicImage={this.props.topicImage}/>
          </div>

        </div>

        <div className="row">
          <br /> <br /><br /><br />
        </div>

        <div className="row" >
          <div className="col-12" >
            <TweetList topicTweet={this.props.topicTweet} />
          </div>
        </div>


        <div className="row">
          <br /> <br /><br /><br />
        </div>
      </div >
    </article>
    );
  }
}

PlaceDashboard.propTypes = {
  dispatch: PropTypes.func.isRequired,
  topicInfo: PropTypes.object,
  topicTweet: PropTypes.array,
  topicImage: PropTypes.array,
  twitterInfo: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  placeDashboard: makeSelectPlaceDashboard(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'placeDashboard', reducer });
const withSaga = injectSaga({ key: 'placeDashboard', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(PlaceDashboard);
