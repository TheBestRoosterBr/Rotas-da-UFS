import {
    MouseEvent,
    ReactNode,
    useEffect,
    useRef,
    useState,
    WheelEvent
} from 'react';


interface Vertex {
    id: number;

    x: number;
    y: number;
}

interface Edge {
    origem: number;
    destine: number;
}

interface GraphViewportProps {
    vertices: Vertex[];
    edges: Edge[];

    className?: string;
}


export function GraphViewport(props: GraphViewportProps): ReactNode {
    const scale = useRef<number>(2);
    const [offset, setOffset] = useState({ x: 0, y: 0 });

    const [isDragging, setIsDragging] = useState(false);
    const [startDrag, setStartDrag] = useState({ x: 0, y: 0 });

    const svgRef = useRef<SVGSVGElement | null>(null);


    const handleMouseDown = (event: MouseEvent<SVGSVGElement>): void => {
        setIsDragging(true);
        setStartDrag({ x: event.clientX, y: event.clientY });

        event.currentTarget.style.cursor = 'move';
    };

    const handleMouseMove = (event: MouseEvent<SVGSVGElement>): void => {
        if (isDragging) {
            const dx = event.clientX - startDrag.x;
            const dy = event.clientY - startDrag.y;
            setOffset((prev) => ({ x: prev.x + dx, y: prev.y + dy }));
            setStartDrag({ x: event.clientX, y: event.clientY });
        }
    };

    const handleMouseUp = (event: MouseEvent<SVGSVGElement>): void => {
        event.currentTarget.style.cursor = 'default';
        setIsDragging(false);
    };


    useEffect(() => {
        const svg: SVGSVGElement | null = svgRef.current;

        if (svg === null)
            return;

        const localHandleMouseUp = (event: any): void => handleMouseUp(event);
        const localHandleMouseDown = (event: any): void => handleMouseDown(event);
        const localHandleMouseMove = (event: any): void => handleMouseMove(event);

        svg.addEventListener('mousedown', localHandleMouseDown);
        svg.addEventListener('mousemove', localHandleMouseMove);
        svg.addEventListener('mouseup', localHandleMouseUp);
        svg.addEventListener('mouseleave', localHandleMouseUp);

        return () => {
            svg.removeEventListener('mousedown', localHandleMouseDown);
            svg.removeEventListener('mousemove', localHandleMouseMove);
            svg.removeEventListener('mouseup', localHandleMouseUp);
            svg.removeEventListener('mouseleave', localHandleMouseUp);
        };
    }, [isDragging, startDrag]);

    return (
        <svg
            ref={svgRef}
            className={`${props.className ?? ''}`}>
            <g transform={`translate(${offset.x}, ${offset.y}) scale(${scale.current})`}>
                {props.edges.map((edge, index: number) => (
                    <line
                        key={index}

                        x1={props.vertices[edge.origem]?.x}
                        y1={props.vertices[edge.origem]?.y}

                        x2={props.vertices[edge.destine]?.x}
                        y2={props.vertices[edge.destine]?.y}

                        stroke='white' />
                ))}

                {props.vertices.map((vertex) => (
                    <circle
                        key={vertex.id}

                        r={10}
                        cx={vertex.x}
                        cy={vertex.y}

                        stroke='white'
                        strokeWidth={2}

                        fill='currentColor'

                        className='text-zinc-600' />
                ))}
            </g>
        </svg>
    );
};

