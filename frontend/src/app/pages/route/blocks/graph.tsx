import {
    MouseEvent,
    ReactNode,
    useEffect,
    useRef,
    useState,
} from 'react';


export interface Vertex {
    id: number;
    title: string;

    x: number;
    y: number;
}

export interface Edge {
    origin: number;
    destination: number;
}

interface GraphViewportProps {
    edges: Edge[];
    vertices: Vertex[];

    origin: number;
    destination: number;

    path: number[] | null;
    location: number | null;

    className?: string;
}


export function GraphViewport(props: GraphViewportProps): ReactNode {
    const scale = useRef<number>(2);
    const [offset, setOffset] = useState({ x: 0, y: 0 });

    const [isDragging, setIsDragging] = useState(false);
    const [startDrag, setStartDrag] = useState({ x: 0, y: 0 });

    const svgRef = useRef<SVGSVGElement | null>(null);


    const handleMouseDown = (event: MouseEvent<SVGSVGElement>): void => {
        if (props.location !== null)
            return;

        setIsDragging(true);
        setStartDrag({
            x: event.clientX,
            y: event.clientY
        });

        event.currentTarget.style.cursor = 'move';
    };

    const handleMouseMove = (event: MouseEvent<SVGSVGElement>): void => {
        if (isDragging) {
            const dx = event.clientX - startDrag.x;
            const dy = event.clientY - startDrag.y;

            setOffset((prev) => ({
                x: prev.x + dx,
                y: prev.y + dy
            }));

            setStartDrag({
                x: event.clientX,
                y: event.clientY
            });
        }
    };

    const handleMouseUp = (event: MouseEvent<SVGSVGElement>): void => {
        setIsDragging(false);
        event.currentTarget.style.cursor = 'default';
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

    useEffect(() => {
        // Following a route?
        if (props.location === null) {
            scale.current = 2;

            setOffset({
                x: 0,
                y: 0,
            })

            return;
        }

        // Following, then set zoom in on current location
        scale.current = 10;

        // Focus on location
        if (svgRef.current == null)
            return;

        const { width, height } = svgRef.current?.getBoundingClientRect();
        const vertex = props.vertices.find((vertex) => vertex.id == props.location);

        setOffset({
            x: (width / 2) - (vertex!.x * scale.current),
            y: (height / 2) - (vertex!.y * scale.current),
        });
    }, [props.location]);


    return (
        <svg
            ref={svgRef}
            className={`${props.className ?? ''}`}>
            <g transform={`translate(${offset.x}, ${offset.y}) scale(${scale.current})`}>
                {props.edges.map((edge, index: number) => (
                    <line
                        key={index}

                        x1={props.vertices[edge.origin]?.x}
                        y1={props.vertices[edge.origin]?.y}

                        x2={props.vertices[edge.destination]?.x}
                        y2={props.vertices[edge.destination]?.y}

                        stroke='white' />
                ))}

                {props.vertices.map((vertex) => {
                    return (
                        <circle
                            key={vertex.id}

                            r={10}
                            cx={vertex.x}
                            cy={vertex.y}

                            stroke='white'
                            strokeWidth={2}

                            fill='currentColor'

                            className='text-zinc-600' />
                    );
                })}
            </g>
        </svg>
    );
};

