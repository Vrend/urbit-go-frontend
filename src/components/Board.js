import {useRef, useState} from 'react';


// h are the viewbox's width and height, which is the same since it's a square
const BoardBack = ({x, y, h}) => (
  <g>
    <rect x={x} y={y} width={h} height={h} fill="#c1ac90"/>
  </g>
);

// Create an array of grid lines based on size of viewbox, and board size
function buildGridLines(x, y, h, size) {
  let lines = []
  let gap = (h-6)/(size-1);
  for(let i = 0; i < size; i++) {
    lines.push(<line key={i} x1={x} y1={y+(i*gap)} x2={h-3} y2={y+(i*gap)} stroke="#272727" strokeWidth="0.1"/>);
    lines.push(<line key={i+size+1} x1={x+(i*gap)} y1={y} x2={x+(i*gap)} y2={h-3} stroke="#272727" strokeWidth="0.1"/>);
  }
  return lines;
}

const Grid = ({x, y, h, size}) => (
  <g>
  {buildGridLines(x,y,h,size)}
  </g>
);

const Piece = ({x, y, color, size}) => (
  <g>
    <circle cx={x+3} cy={y+3} r={size === 19 ? 1.75 : (size === 14 ? 2 : 2.25)} fill={color}/>
  </g>
);

function Board() {

  const svg = useRef();
  const viewHeight = 100;
  const size = 14;
  const gap = 94/(size-1);
  const [pieces, setPieces] = useState([]);

  function placePiece(evt) {
    const pt = svg.current.createSVGPoint();
    pt.x = evt.clientX;
    pt.y = evt.clientY;
    const svgPt = pt.matrixTransform(svg.current.getScreenCTM().inverse());
    // console.log('x: '+svgPt.x+', y: '+svgPt.y);
    for(var i = 0; i < size; i++) {
      for(var j = 0; j < size; j++) {
        if(Math.abs(svgPt.x-((gap*i)+3)) <= 2 && Math.abs(svgPt.y-((gap*j)+3)) <= 2) {
          // console.log(`Place on ${i},${j}`);
          let temparr = pieces;
          const id = `${i}-${j}`;
          if(temparr.filter(e => e.key === id).length > 0) {
            return;
          }
          temparr.push(<Piece key={`${i}-${j}`} x={gap*i} y={gap*j} color='black' size={size}/>);
          setPieces([...temparr]);
          return;
        }
      }
    }
  }

  return (
  <div>
    <svg viewBox={`0 0 ${viewHeight} ${viewHeight}`} ref={svg} onClick={placePiece}>
      <BoardBack x={0} y={0} h={viewHeight}/>
      <Grid x={3} y={3} h={viewHeight} size={size}/>
      {pieces}
    </svg>
  </div>
  );
}

export default Board;
