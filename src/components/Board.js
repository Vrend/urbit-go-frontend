import {useRef} from 'react';


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

function Board(props) {

  const svg = useRef();
  const viewHeight = 100;
  const size = props.size;
  const gap = 94/(size-1);
  const pieces = props.board;

  let render_pieces = () => {
      var piece_arr = [];
      for(const piece of pieces) {
        const coords = piece[0].split(" ");
        piece_arr.push(<Piece key={coords} x={gap*Number(coords[0]-1)} y={gap*Number(coords[1]-1)} color={piece[1]} size={size}/>)
      }
      return piece_arr;
  };


  function placePiece(evt) {
    const pt = svg.current.createSVGPoint();
    pt.x = evt.clientX;
    pt.y = evt.clientY;
    const svgPt = pt.matrixTransform(svg.current.getScreenCTM().inverse());
    // console.log('x: '+svgPt.x+', y: '+svgPt.y);
    for(var i = 0; i < size; i++) {
      for(var j = 0; j < size; j++) {
        if(Math.abs(svgPt.x-((gap*i)+3)) <= 2 && Math.abs(svgPt.y-((gap*j)+3)) <= 2) {
          props.move(i+1, j+1);
        }
      }
    }
  }


  return (
  <div>
    <svg height='75vh' viewBox={`0 0 ${viewHeight} ${viewHeight}`} ref={svg} onClick={placePiece}>
      <BoardBack x={0} y={0} h={viewHeight}/>
      <Grid x={3} y={3} h={viewHeight} size={size}/>
      {render_pieces()}
    </svg>
  </div>
  );
}

export default Board;
