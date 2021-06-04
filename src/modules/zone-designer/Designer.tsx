/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, {
  useRef,
  useState,
  DragEvent,
  useEffect,
  forwardRef,
  MutableRefObject,
  RefObject
} from 'react';
import Konva from 'konva';
import { Stage, Layer, Line } from 'react-konva';
import { KonvaEventObject } from 'konva/types/Node';
import { useOnClickOutside } from '@modules/common/hooks';
import { uuid } from '@modules/common/utils';
import { styled } from 'stitches.config';
import { Equipment } from './Equipment';
import { useDesigner } from './useDesigner';
import { toolbarItems } from './items';
import type { KeyboardEvent } from 'react';
import type { DesignerItem } from './types';

type DesignerProps = {
  width?: number;
  height?: number;
  rows?: number;
  columns?: number;
  placedItems: DesignerItem[];
  updatePlacedItems: (newItems: DesignerItem[]) => void;
};

type GridElement = { points: number[] };

const DesignerContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$3',
  userSelect: 'none'
});

const Toolbar = styled('div', {
  color: '$offWhite',
  display: 'flex',
  flexDirection: 'column'
});

const ToolbarSectionTitle = styled('h4', {
  color: '$mediumGray'
});

const ToolbarEquipment = styled('div', {
  display: 'flex',
  gap: '$4'
});

const EquipmentItem = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',

  '& img': {
    filter: 'invert(0.5)',
    cursor: 'pointer'
  },

  '& label': {
    fontSize: '$bodySmall',
    color: '$mediumGray'
  }
});

const Canvas = styled(Stage, {
  '& .konvajs-content': {
    backgroundColor: '$lightGray'
  }
});

// Should be lazy loaded
export const Designer = forwardRef<Konva.Stage, DesignerProps>(
  (
    {
      width = 800,
      height = 800,
      rows = 4,
      columns = 4,
      placedItems = [],
      updatePlacedItems
    },
    canvasRef
  ) => {
    const designerRef = useRef<HTMLDivElement>(null);
    const dragItemSrc = useRef<string>('');
    const dragItemType = useRef<string>('');
    const [selectedItem, setSelectedItem] = useState('');
    const { state, setRows, setColumns } = useDesigner({ rows, columns });
    const [gridColumns, setGridColumns] = useState([] as GridElement[]);
    const [gridRows, setGridRows] = useState([] as GridElement[]);

    useOnClickOutside(designerRef, () => {
      setSelectedItem('');
    });

    const deselectItem = (event: KonvaEventObject<MouseEvent>) => {
      const clickedOnEmpty = event.target === event.target.getStage();

      if (clickedOnEmpty) {
        setSelectedItem('');
      }
    };

    const onDelete = (id: string = selectedItem) => {
      const newItems = placedItems.filter((item) => item.id !== id);
      updatePlacedItems(newItems);
    };

    const onDesignerKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
      if (e.key === 'Backspace') {
        if (selectedItem) {
          onDelete(selectedItem);
        }
      }
    };

    useEffect(() => {
      setRows(rows);
      setColumns(columns);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [rows, columns]);

    useEffect(() => {
      const paddingX = width / state.columns;
      const paddingY = height / state.rows;

      const newColumns = [...Array(state.columns)].map((_, index) => ({
        points: [
          Math.round(index * paddingX),
          0,
          Math.round(index * paddingX),
          height
        ]
      }));

      const newRows = [...Array(state.rows)].map((_, index) => ({
        points: [
          0,
          Math.round(index * paddingY),
          width,
          Math.round(index * paddingY)
        ]
      }));
      setGridColumns(newColumns);
      setGridRows(newRows);
    }, [state.rows, state.columns, width, height]);

    return (
      <DesignerContainer ref={designerRef}>
        <Toolbar>
          <ToolbarSectionTitle>Equipment</ToolbarSectionTitle>
          <ToolbarEquipment>
            {toolbarItems.map((item, index) => (
              <EquipmentItem key={`${index}-${item.type}-${item.name}`}>
                <img
                  draggable
                  alt={item.name}
                  width={64}
                  height={64}
                  src={item.src}
                  onDragStart={(event: DragEvent<HTMLImageElement>) => {
                    const { src } = event.target as HTMLImageElement;
                    dragItemSrc.current = src;
                    dragItemType.current = item.type;
                  }}
                />
                <label>{item.name}</label>
              </EquipmentItem>
            ))}
          </ToolbarEquipment>
        </Toolbar>
        <div
          tabIndex={0}
          onKeyDown={onDesignerKeyDown}
          onDrop={(event: DragEvent<HTMLImageElement>) => {
            event.preventDefault();
            const stage = canvasRef as RefObject<Konva.Stage>;

            if (!stage || !stage.current) {
              return;
            }

            stage.current.setPointersPositions(event);

            updatePlacedItems(
              placedItems.concat([
                {
                  id: uuid(),
                  src: dragItemSrc.current,
                  type: dragItemType.current,
                  x: stage.current.getPointerPosition()?.x ?? 0,
                  y: stage.current.getPointerPosition()?.y ?? 0,
                  width: 64,
                  height: 64
                }
              ])
            );
          }}
          onDragOver={(e) => e.preventDefault()}
        >
          <Canvas
            id='zone-designer'
            width={width}
            height={height}
            ref={canvasRef}
            onMouseDown={deselectItem}
            onTouchStart={deselectItem}
          >
            <Layer>
              {gridColumns.map((line, index) => (
                <Line
                  key={`line-${index}`}
                  points={line.points}
                  stroke='#9BB1D2'
                  strokeWidth={1}
                />
              ))}
              {gridRows.map((line, index) => (
                <Line
                  key={`line-${index}`}
                  points={line.points}
                  stroke='#9BB1D2'
                  strokeWidth={1}
                />
              ))}
            </Layer>
            <Layer>
              {placedItems.map((image, index) => (
                <Equipment
                  key={image.id}
                  id={image.id}
                  src={image.src}
                  x={image.x}
                  y={image.y}
                  height={image.width}
                  width={image.height}
                  isSelected={selectedItem === image.id}
                  onSelect={() => setSelectedItem(image.id)}
                  onDelete={onDelete}
                  onChange={(attributes) => {
                    // console.log('Onchange', { ...image, ...attributes });
                    const items = placedItems.slice();
                    items[index] = { ...image, ...attributes };
                    updatePlacedItems(items);
                  }}
                />
              ))}
            </Layer>
          </Canvas>
        </div>
      </DesignerContainer>
    );
  }
);
