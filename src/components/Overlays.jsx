import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOverlay, addOverlay, updateOverlay, deleteOverlay } from '../../redux/overlay/overlay';
import { Dropdown, ButtonGroup, Button } from 'react-bootstrap';
import AddOverlay from './addOverlay';
import UpdateOverlayModel from './updateOverlayModel';
import DraggableOverlayContent from './DraggableOverlayContent';
const Overlays = () => {
    const dispatch = useDispatch();
    const { loading, overlay, error } = useSelector((state) => state.overlay);
    const [showModel, setShowModel] = useState(false);
    const [selectedOverlay, setSelectedOverlay] = useState(null);
  
    useEffect(() => {
      dispatch(fetchOverlay());
    }, [dispatch]);
  
    const handleAddOverlay = (addNewOverlay) => {
      dispatch(addOverlay(addNewOverlay));
      dispatch(fetchOverlay());
    };
  
    const handleUpdateOverlay = (overlay) => {
      dispatch(updateOverlay(overlay));
      dispatch(fetchOverlay());
      setSelectedOverlay(overlay);
      setShowModel(true);
    };
  
    const handleDeleteOverlay = (overlayId) => {
      dispatch(deleteOverlay(overlayId));
      dispatch(fetchOverlay());
    };
  
    if (loading) {
      return <p>Loading...</p>;
    }
  
    if (error) {
      return <p>Error: {error}</p>;
    }
  
    return (
      <div>
        <h2>Overlays</h2>
  
        <Dropdown as={ButtonGroup}>
          <Dropdown.Toggle variant="success" id="overlay-dropdown">
            Select Overlay
          </Dropdown.Toggle>
  
          <Dropdown.Menu>
            {overlay?.overlays && overlay.overlays.length > 0 ? (
              overlay.overlays.map((o) => (
                <Dropdown.Item key={o._id}>
                  Position: X:{o.position.x}, Y:{o.position.y} | Size: {o.size.width}x{o.size.height}
                  <DraggableOverlayContent content={o.content} id={o._id} />
                  <p style={{textDecoration:'underline', fontSize:10}}>Drag Me</p>
                  {/* <div>Content: {o.content}</div> */}
                  <ButtonGroup>
                    <Button className='m-1' onClick={() => handleUpdateOverlay(o)}>Update</Button>
                    <Button className='m-1' onClick={() => handleDeleteOverlay(o._id)}>Delete</Button>
                  </ButtonGroup>

                </Dropdown.Item>
              ))
            ) : (
              <Dropdown.Item>No overlays available</Dropdown.Item>
            )}

            <hr />
            <p>** Please drag the content on the video player</p>
          </Dropdown.Menu>
        </Dropdown>
  
        <h3>Add New Overlay</h3>
        <AddOverlay handleAddOverlay={handleAddOverlay} />
        {showModel && selectedOverlay && (
          <UpdateOverlayModel
            overlay={selectedOverlay}
            handleUpdateOverlay={handleUpdateOverlay}
            onClose={() => setShowModel(false)}
          />
        )}
      </div>
    );
  };
  
  export default Overlays;
  