import React from 'react';
import { useDrag } from 'react-dnd';

const DraggableOverlayContent = ({ content,id }) => {
  const [, drag] = useDrag({
    type: 'overlayContent',
    item: { content,id },
  });

  return <div ref={drag}>{content}</div>;
};

export default DraggableOverlayContent;
