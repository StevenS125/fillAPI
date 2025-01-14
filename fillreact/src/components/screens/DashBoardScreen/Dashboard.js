import React, { useEffect, useState, Fragment } from 'react';
import { Row, Col, Button } from 'reactstrap';

// Components
import DashBoardSeriesCard from './DashboardSeriesCard'
import NewSeriesModal from './NewSeriesModal'
import { Link } from 'react-router-dom';
// import GOTO_FEATHER_SVG from '../../../assets/svg/GOTO_FEATHER_SVG';
import ARROW_LEFT_FEATHER_SVG from '../../../assets/svg/ARROW_LEFT_FEATHER_SVG';
import PLUS_ADD_FEATHER_SVG from '../../../assets/svg/PLUS_ADD_FEATHER_SVG';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import ErrorScreen from '../../error/ErrorScreen';


const DashboardSeriesScreen = ({ toggleScreen }) => {
  const [seriesData, setSeriesData] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [err, setErr] = useState(null);
  const [modal, setModal] = useState(false);
  const toggle = () => {
    setModal(!modal);
  }

  useEffect(() => {
    fetchSeriesData();
  }, []);

  const fetchSeriesData = async () => {
    try {
      let res = await fetch('https://thefill.herokuapp.com/api/series', {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:3000',
      }
      );
      let newData = await res.json();
      setSeriesData(newData);
      setIsLoaded(true)
    } catch (err) {
      setErr(err);
      setIsLoaded(true);
    }
  };

  if (err) {
    return <ErrorScreen error={err} />
  }
  else if (!isLoaded) {
    return <LoadingScreen />
  }
  else {
    return (
      <Fragment>
        {/* {!isLoaded ? */}
        {/* <LoadingScreen /> */}
        {/* : */}
        <div>
          <Row>
            <Col>
              {/* <div style={{ display: 'flex' }}> */}
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>
                  <Button
                    style={{
                      display: 'inline-flex', alignItems: 'center'
                    }}
                    tag={Link} to="/"
                    small outline className="the-fill-app-button" > <ARROW_LEFT_FEATHER_SVG size='20' color='rgb(250, 146, 164)' />Home
                  </Button>
                </div>
                {/* <div style={{ display: 'flex' }}> */}
                <div>
                <Button
                    style={{
                      display: 'inline-flex', alignItems: 'center'
                    }}
                    small outline className="the-fill-app-button"
                    tag={Link} to="/editcarousel"
                  > <PLUS_ADD_FEATHER_SVG
                      size='20' color='rgb(250, 146, 164)' />Edit Carousel
                  </Button>
                  <Button
                    style={{
                      display: 'inline-flex', alignItems: 'center'
                    }}
                    small outline className="the-fill-app-button"
                    modalopen={modal} onClick={toggle}
                  > <PLUS_ADD_FEATHER_SVG
                      size='20' color='rgb(250, 146, 164)' />Add New Series
                  </Button>
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            {seriesData.map((series, index) => {
              return <Col key={index} xs="12" sm="6"><DashBoardSeriesCard toggleScreen={toggleScreen} seriesData={series} /></Col>
            })
            }
            {/* <Col xs="12" sm="6">
              <Card>
                <CardBody>
                  <CardTitle tag="h3">Add New Series</CardTitle>
                  <Button modalopen={modal} onClick={toggle}>Click to Add</Button>
                </CardBody>
              </Card>
            </Col> */}
          </Row>
          <NewSeriesModal isOpen={modal} toggle={toggle} />
        </div>

      </Fragment>
    );
  }
}

export default DashboardSeriesScreen;