
// h are the viewbox's width and height, which is the same since it's a square
const BoardBack = ({x, y, h}) => (
  <g>
    <rect x={x} y={y} width={h} height={h} fill="#c1ac90"/>
    <rect x={x+3} y={y+3} width={h-6} height={h-6} stroke="#272727" fill="none" strokeWidth="0.1"/>
  </g>
);

// Create an array of grid lines based on size of viewbox, and board size
function buildGridLines(x, y, h, size) {
  let lines = []
  let gap = h/(size-1);
  for(let i = 1; i < size-1; i++) {
    lines.push(<line key={i} x1={x} y1={y+(i*gap)} x2={h} y2={y+(i*gap)} stroke="#272727" strokeWidth="0.1"/>);
    lines.push(<line key={i+size} x1={x+(i*gap)} y1={y} x2={x+(i*gap)} y2={h} stroke="#272727" strokeWidth="0.1"/>);
  }
  return lines;
}

const Grid = ({x, y, h, size}) => (
  <g>
  {buildGridLines(x,y,h,size)}
  </g>
);

const Piece = ({x, y, color}) => (
  <g>
    <circle cx={x} cy={y} r={2.5} fill={color}/>
  </g>
);

function Board() {
  const viewHeight = 100;
  const gap = 97/8;
  return (
  <div>
    <svg viewBox={`0 0 ${viewHeight} ${viewHeight}`}>
      <BoardBack x={0} y={0} h={viewHeight}/>
      <Grid x={3} y={3} h={viewHeight-3} size={9}/>
      <Piece x={3} y={3} color="black"/>
      <Piece x={gap+3} y={gap+3} color="black"/>
      <Piece x={gap*2+3} y={gap*2+3} color="white"/>
      <Piece x={gap*3+3} y={gap*3+3} color="black"/>
      <Piece x={gap*5+3} y={gap*2+3} color="white"/>
    </svg>
  </div>
  );
}

export default Board;
