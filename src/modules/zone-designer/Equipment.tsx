/* eslint-disable no-shadow */
import React, { useEffect, useRef } from 'react';
import Konva from 'konva';
import { Image, Transformer } from 'react-konva';
import useImage from 'use-image';
import { sleep } from '@modules/common/utils';

type ShapeAttributes =
  | {
      x: number;
      y: number;
    }
  | { width: number; height: number };

type EquipmentProps = {
  // Image source
  id: string;
  src: string;
  x: number;
  width: number;
  height: number;
  y: number;
  isSelected: boolean;
  onSelect: () => void;
  onDelete: (id: string) => void;
  onChange: (attributes: ShapeAttributes) => void;
};

export const Equipment = ({
  id,
  onDelete,
  src,
  x,
  y,
  height,
  width,
  isSelected,
  onSelect,
  onChange
}: EquipmentProps) => {
  const transformerRef = useRef<Konva.Transformer>(null);
  const shapeRef = useRef<Konva.Image>(null);
  const [img] = useImage(src);

  useEffect(() => {
    if (shapeRef.current) {
      shapeRef.current.width(height);
      shapeRef.current.height(width);
    }
    // Sets initial size
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!isSelected || !transformerRef.current || !shapeRef.current) {
      return;
    }

    const deleteButton = new Konva.Path({
      x: 0,
      y: -16,
      fill: 'red',

      data:
        'M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm3.5 10.1l-1.4 1.4L8 9.4l-2.1 2.1-1.4-1.4L6.6 8 4.5 5.9l1.4-1.4L8 6.6l2.1-2.1 1.4 1.4L9.4 8l2.1 2.1z'
    });

    /*   shapeRef.current.moveToTop();
    transformerRef.current.moveToTop();
    deleteButton.moveToTop(); */
    transformerRef.current.nodes([shapeRef.current]);
    transformerRef.current.getLayer()?.batchDraw();

    transformerRef.current.add(
      deleteButton.x(transformerRef.current?.getWidth() + 8)
    );

    transformerRef.current.on('transform', () => {
      deleteButton.x(transformerRef.current?.getWidth() + 8);
    });

    deleteButton.on('click', () => {
      onDelete(id);
    });
  }, [id, isSelected, onDelete]);

  return (
    <>
      <Image
        draggable
        ref={shapeRef}
        image={img}
        x={x}
        y={y}
        onClick={onSelect}
        onTap={onSelect}
        onDragEnd={(event) => {
          onChange({
            x: event.target.x(),
            y: event.target.y()
          });
        }}
        onTransformEnd={async () => {
          if (!shapeRef.current) {
            return;
          }
          // transformer is changing scale of the node
          // and NOT its width or height
          // but in the store we have only width and height
          // to match the data better we will reset scale on transform end
          const node = shapeRef.current;

          const scaleX = node.scaleX();
          const scaleY = node.scaleY();
          const width = Math.max(5, node.width() * scaleX);
          const height = node.height() * scaleY;

          // Changes size of the node directly and uses onChange just to keep track of its size
          node.scaleX(1);
          node.scaleY(1);
          node.width(width);
          node.height(height);

          onChange({
            width,
            height
          });
        }}
      />
      {isSelected && (
        <Transformer
          keepRatio={false}
          /*  
          enabledAnchors={[
            'top-left',
            'top-right',
            'bottom-left',
            'bottom-right'
          ]} */
          ref={transformerRef}
          boundBoxFunc={(oldBox, newBox) => {
            // Limit resize
            if (newBox.width < 5 || newBox.height < 5) {
              return oldBox;
            }
            return newBox;
          }}
        />
      )}
    </>
  );
};
