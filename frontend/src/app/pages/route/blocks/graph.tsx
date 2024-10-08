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
    image: string;
    selected: boolean;
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
    const scale = useRef<number>(1);
    const [offset, setOffset] = useState({x: 0, y: 0});

    const [isDragging, setIsDragging] = useState(false);
    const [startDrag, setStartDrag] = useState({x: 0, y: 0});

    const svgRef = useRef<SVGSVGElement | null>(null);
    const animationRef = useRef<number | null>(null);


    const handleMouseDown = (event: MouseEvent<SVGSVGElement>): void => {
        setIsDragging(true);
        setStartDrag({
            x: event.clientX,
            y: event.clientY
        });

        event.currentTarget.style.cursor = 'move';
    };

    const handleMouseMove = (event: MouseEvent<SVGSVGElement>): void => {
        if (!isDragging)
            return;

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
    };

    const handleMouseUp = (event: MouseEvent<SVGSVGElement>): void => {
        setIsDragging(false);
        event.currentTarget.style.cursor = 'default';
    };

    const animateToOffset = ({x, y}: { x: number, y: number }) => {
        const animationStep = () => {
            setOffset((prev) => {
                const newX = prev.x + (x - prev.x) * 0.1;
                const newY = prev.y + (y - prev.y) * 0.1;

                if (Math.abs(newX - x) < 0.1 && Math.abs(newY - y) < 0.1)
                    return {
                        x: x,
                        y: y,
                    };

                return {
                    x: newX,
                    y: newY,
                };
            });

            animationRef.current = requestAnimationFrame(animationStep);
        };

        if (animationRef.current !== null)
            cancelAnimationFrame(animationRef.current);

        animationRef.current = requestAnimationFrame(animationStep);
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

            if (animationRef.current !== null)
                cancelAnimationFrame(animationRef.current);
        };
    }, [isDragging, startDrag]);

    useEffect(() => {
        // Following a route?
        if (props.location === null) {
            scale.current = 1;

            animateToOffset({
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

        const {width, height} = svgRef.current?.getBoundingClientRect();
        const vertex = props.vertices.find((vertex) => vertex.id == props.location);

        animateToOffset({
            x: (width / 2) - (vertex!.x * scale.current),
            y: (height / 2) - (vertex!.y * scale.current),
        });
    }, [props.location]);


    return (
        <svg
            ref={svgRef}
            className={`${props.className ?? ''} select-none`}>
            <g transform={`translate(${offset.x}, ${offset.y}) scale(${scale.current})`}>
                {props.edges.map((edge, index: number) => (
                    <line
                        key={index}

                        x1={props.vertices[edge.origin]?.x}
                        y1={props.vertices[edge.origin]?.y}

                        x2={props.vertices[edge.destination]?.x}
                        y2={props.vertices[edge.destination]?.y}

                        className={props.path !== null
                        && props.path.some((id) => id == edge.origin)
                        && props.path.some((id) => id == edge.destination) ?
                            'text-cyan-300' : 'text-zinc-600'}

                        stroke='currentColor'/>
                ))}

                {props.vertices.map((vertex) => {
                    return (
                        <g key={vertex.id}>
                            <circle
                                r={10}
                                cx={vertex.x}
                                cy={vertex.y}
                                stroke='white'
                                strokeWidth={1}
                                fill='currentColor'
                                className={props.path !== null && props.path.some((id) => id == vertex.id) ?
                                    'text-cyan-300' : 'text-zinc-600'}
                            />
                            <text
                                x={vertex.x}
                                y={vertex.y - 10}
                                fontSize="8px"
                                fill="white"
                                dominantBaseline="middle"
                            >
                                {vertex.title}
                            </text>

                            <defs>
                                <clipPath id={`circleClip-${vertex.id}`}>
                                    <circle fill='currentColor' cx={vertex.x} cy={vertex.y} r={9.5}/>
                                    {/* Ajuste o raio conforme necessário */}
                                </clipPath>
                            </defs>
                            <image
                                href={'public/imgs/' + vertex.image}
                                width="30"
                                height="30"
                                x={vertex.x - 15}
                                y={vertex.y - 15}
                                preserveAspectRatio="xMidYMid meet"
                                clipPath={`url(#circleClip-${vertex.id})`} // Aplica o caminho de recorte
                            />

                        </g>
                    )
                        ;
                })}

            </g>
        </svg>
    );
};

