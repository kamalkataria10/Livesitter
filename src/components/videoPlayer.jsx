import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { setSocket, setConnected, clearSocket, selectSocket } from '../../redux/liveServerSocket/liveServerSocket';
import { useDrop } from 'react-dnd';
import { dropOverlay, fetchOverlay } from '../../redux/overlay/overlay';

const VideoPlayer = () => {
  const dispatch = useDispatch();
  const socket = useSelector(selectSocket);
  const [videoData, setVideoData] = useState(null);
  const [videoError, setVideoError] = useState(false);
  const [droppedContent, setDroppedContent] = useState(null);
  const [droppedContentId, setDroppedContentId] = useState(null);
  const [overlayPosition, setOverlayPosition] = useState({ top: 0, left: 0, width: 0, height: 0 });
  const overlayState = useSelector((state) => state.overlay);


  useEffect(() => {
    dispatch(fetchOverlay());
    const newSocket = new WebSocket('ws://localhost:3000');

    newSocket.addEventListener('open', () => {
      dispatch(setSocket(newSocket));
      dispatch(setConnected(true));
    });

    newSocket.addEventListener('message', (event) => {
      try {
        const data = JSON.parse(event.data);

        switch (data.type) {
          case 'live-stream':
            setVideoData(data.data);
            setVideoError(false);
            break;
          case 'error':
            setVideoError(true);
            break;
          default:
        }
      } catch (error) {
        console.error('Error parsing WebSocket message:', error);
        setVideoError(true);
      }
    });

    newSocket.addEventListener('close', () => {
      dispatch(clearSocket());
      dispatch(setConnected(false));
      setVideoError(true);
    });

    return () => {
      newSocket.close();
    };
  }, [dispatch]);
  
  const [, drop] = useDrop({
    accept: 'overlayContent',
    drop: async (item, monitor) => {
      // const delta = monitor.getDifferenceFromInitialOffset();
      // const droppedPosition = {
      //   top: delta.y,
      //   left: delta.x,
      // };
      const matchedOverlay = overlayState.overlay?.overlays?.find((overlay) => overlay._id === item.id);
      if (matchedOverlay) {
        setDroppedContent(matchedOverlay.content);
        setDroppedContentId(matchedOverlay._id)
        setOverlayPosition({ top: matchedOverlay.position.x, left: matchedOverlay.position.y, width: matchedOverlay.size.width, height: matchedOverlay.size.height });
      }
    },
  });
  
  
    useEffect(()=>{
      const matchedOverlay = overlayState.overlay?.overlays?.find((overlay) => overlay._id === droppedContentId);
      if(matchedOverlay){
        setDroppedContent(matchedOverlay.content)
        setOverlayPosition({ top: matchedOverlay.position.x, left: matchedOverlay.position.y, width: matchedOverlay.size.width, height: matchedOverlay.size.height });
      }
    },[overlayState.overlay])


  return (
    <Container>
      <Row>
        <Col ref={drop} style={{ position: 'relative' }}>
          <h2 className="mt-4 mb-4">Video Player</h2>
          {!socket && <Alert variant="danger">WebSocket connection is not established.</Alert>}
          <div style={{ position: 'relative', width: '70%', margin: '0 auto' }}>
            <div
              style={{
                position: 'absolute',
                top: overlayPosition.top,
                left: overlayPosition.left,
                width: overlayPosition.width,
                height: overlayPosition.height,
                fontSize: (overlayPosition.width + overlayPosition.height) / 2,
                zIndex: 2,
                color: 'green',
              }}
            >
              {droppedContent}
            </div>
            <video controls width="100%" height="auto" src={videoData} type="video/mp4" style={{ zIndex: 1 }}>
            </video>
          </div>
          {videoError && (
            <Alert variant="danger" className="mt-2" style={{ textAlign: 'center' }}>
              Error in playing the video stream.
            </Alert>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default VideoPlayer;