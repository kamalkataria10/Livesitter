import React from 'react';
import VideoPlayer from './components/videoPlayer';
import Overlays from './components/overlays';
import { Container, Row, Col } from 'react-bootstrap';
const App = () => {
  return (
 
      <Container fluid>
        <h1 className="text-center">Livestream App</h1>
        <Row>
          <Col xs={3}>
            {/* Adjust the xs value to control the width of the Overlays component */}
            <Overlays />
          </Col>
          <Col xs={9}>
            {/* Adjust the xs value to control the width of the VideoPlayer component */}
            <VideoPlayer />
          </Col>
        </Row>
      </Container>
    );
  
  
};

export default App;
