import {
    ReactNode,
    useEffect,
    useState
} from 'react';

import {
    ArrowCircleLeft, ArrowLeft,
    ArrowRight,
    ArrowsHorizontal,
    HandPalm,
    PiggyBank,
    Pizza,
    Skull,
    Star,
    TrafficSign
} from '@phosphor-icons/react';

import {
    Edge,
    GraphViewport,
    Vertex
} from './blocks/graph';

import { ThemeMode } from '@/components/themeMode';
import { useSearchParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import notification from "../../components/notification";

interface SearchPath {
    search: number;
    path: number[];
}


export function RoutePage(): ReactNode {
    const navigate = useNavigate();
    const searchNames: { [key: number]: string }  = {
        0: 'Largura',
        1: 'Profundidade',
        2: 'Gulosa',
        3: 'Custo Uniforme',
        4: 'A estrela',
    };


    const [searchAlgorithmHover, setSearchAlgorithmHover] = useState<number>(-1);
    const [searchAlgorithm, setSearchAlgorithm] = useState<number>(-1);
    const [searchsPathCache, setSearchsPathCache] = useState<SearchPath[]>([]);

    const [isRunningRoute, setRunningRoute] = useState<boolean>(false);
    const [isOnInicio, setOnInicio] = useState<boolean>(true);
    const [isOnFim, setOnFim] = useState<boolean>(false);

    const [vertices, setVertices] = useState<Vertex[]>([]);
    const [edges, setEdges] = useState<Edge[]>([]);

    const [location, setLocation] = useState<number>(-1);

    const [queryParams] = useSearchParams();
    const [showSuccess, setShowSuccess] = useState(false);


    const getSearchPath = (): SearchPath => searchsPathCache.find((search) => search.search == searchAlgorithm)!;

    const voltar = () => {
        navigate(`/`, { replace: true });
    }


    function handleRunRoute(): void {
        if (searchAlgorithm === -1) {
            return;
        }

        setRunningRoute(true);
        setOnFim(false);
        setOnInicio(true);
        setLocation(parseInt(queryParams.get('origin')!));
    }

    function handleNextLocation(): void {
        const path = getSearchPath().path;

        let index = Infinity;
        for (index of path.keys())
            if (path[index] == location)
                break;

        if(index == path.length - 2){
            setOnFim(true);
        }
        if (index + 1 >= path.length) {
            setShowSuccess(true);
            return;
        }

        setOnInicio(false);
        setLocation(path[index + 1]!);
    }

    function handleLastLocation(): void {
        const path = getSearchPath().path;

        let index = Infinity;
        for (index of path.keys())
            if (path[index] == location)
                break;

        if(index <= 1){
            setOnInicio(true);
        }

        if (index -1 < 0) {
            return;
        }
        setOnFim(false);
        setLocation(path[index -1]!);
    }



    function handleAlgorithmSelection(algorithm: number): void {
        const cached = searchsPathCache.filter((search: SearchPath) => search.search == algorithm);
        if (cached.length > 0) {
            setSearchAlgorithm(algorithm);
            return;
        }

        fetch(`/api/busca/${searchNames[algorithm]?.toLowerCase().replace(' ', '_')}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    inicio: parseInt(queryParams.get('origin')!),
                    fim: parseInt(queryParams.get('destination')!),
                })
            })
            .then((res) => {
                if (!res.ok) {
                    return;
                }

                return res.json();
            })
            .then((data: number[]) => {
                const searchPath: SearchPath = {
                    search: algorithm,
                    path: data,
                }

                setSearchsPathCache([...searchsPathCache, searchPath]);
            })
            .catch(() => {
            })
            .finally(() => {
                setSearchAlgorithm(algorithm);
            });
    }


    useEffect(() => {
        fetch('/api/estado')
            .then((res) => {
                if (!res.ok) {
                    return;
                }
                return res.json();
            })
            .then((data: any) => {
                const vertices: Vertex[] = data.map((vertex: any): Vertex => {
                    return {
                        id: vertex.id,
                        title: vertex.titulo,
                        image: vertex.imagem,
                        selected: false,
                        x: parseFloat(vertex.x),
                        y: parseFloat(vertex.y),
                    };
                });

                setVertices(vertices);
            })
            .catch(() => {
            })
            .finally(() => {
            });
    }, []);

    useEffect(() => {
        fetch('/api/transicao')
            .then((res) => {
                if (!res.ok)
                    return;

                return res.json();
            })
            .then((data: any) => {
                const edges: Edge[] = data.map((edge: any): Edge => {
                    return {
                        origin: parseInt(edge.origem),
                        destination: parseInt(edge.destino),
                    };
                });

                setEdges(edges);
            })
            .catch(() => {
            })
            .finally(() => {
            });
    }, []);


    return (
        <div className='flex flex-col min-h-screen'>
            <header className='flex items-baseline'>
                <div className='flex items-center justify-center mt-5 m-auto space-x-4 text-zinc-300'>
                    <span className='text-4xl'>
                        Sua rota
                    </span>
                    <TrafficSign
                        className='text-7xl'
                        weight='duotone' />
                </div>

                <ThemeMode />
            </header>

            <main className='flex flex-1 relative text-zinc-300'>
                {!isRunningRoute && (
                    <div className='absolute z-10 top-[50%] bottom-[50%] flex flex-col items-baseline justify-center text-zinc-900 space-y-4'>
                        <button
                            onClick={() => handleAlgorithmSelection(0)}
                            onMouseEnter={() => setSearchAlgorithmHover(0)}
                            onMouseLeave={() => setSearchAlgorithmHover(-1)}
                            className={`flex items-center px-4 py-1.5 rounded-r-lg ${searchAlgorithm == 0 ? 'border-y border-r border-cyan-300 text-cyan-300' : 'bg-cyan-300'}`}>
                            <ArrowsHorizontal
                                className='size-6'
                                weight='duotone' />

                            {searchAlgorithmHover === 0 && (
                                <span className='mx-7'>
                                    {searchNames[searchAlgorithmHover]}
                                </span>
                            )}
                        </button>
                        <button
                            onClick={() => handleAlgorithmSelection(1)}
                            onMouseEnter={() => setSearchAlgorithmHover(1)}
                            onMouseLeave={() => setSearchAlgorithmHover(-1)}
                            className={`flex items-center px-4 py-1.5 rounded-r-lg ${searchAlgorithm == 1 ? 'border-y border-r border-cyan-300 text-cyan-300' : 'bg-cyan-300'}`}>
                            <Skull
                                className='size-6'
                                weight='duotone' />

                            {searchAlgorithmHover === 1 && (
                                <span className='mx-7'>
                                    {searchNames[searchAlgorithmHover]}
                                </span>
                            )}
                        </button>
                        <button
                            onClick={() => handleAlgorithmSelection(2)}
                            onMouseEnter={() => setSearchAlgorithmHover(2)}
                            onMouseLeave={() => setSearchAlgorithmHover(-1)}
                            className={`flex items-center px-4 py-1.5 rounded-r-lg ${searchAlgorithm == 2 ? 'border-y border-r border-cyan-300 text-cyan-300' : 'bg-cyan-300'}`}>
                            <Pizza
                                className='size-6'
                                weight='duotone' />

                            {searchAlgorithmHover === 2 && (
                                <span className='mx-7'>
                                    {searchNames[searchAlgorithmHover]}
                                </span>
                            )}
                        </button>
                        <button
                            onClick={() => handleAlgorithmSelection(3)}
                            onMouseEnter={() => setSearchAlgorithmHover(3)}
                            onMouseLeave={() => setSearchAlgorithmHover(-1)}
                            className={`flex items-center px-4 py-1.5 rounded-r-lg ${searchAlgorithm == 3 ? 'border-y border-r border-cyan-300 text-cyan-300' : 'bg-cyan-300'}`}>
                            <PiggyBank
                                className='size-6'
                                weight='duotone' />

                            {searchAlgorithmHover === 3 && (
                                <span className='mx-7'>
                                    {searchNames[searchAlgorithmHover]}
                                </span>
                            )}
                        </button>
                        <button
                            onClick={() => handleAlgorithmSelection(4)}
                            onMouseEnter={() => setSearchAlgorithmHover(4)}
                            onMouseLeave={() => setSearchAlgorithmHover(-1)}
                            className={`flex items-center px-4 py-1.5 rounded-r-lg ${searchAlgorithm == 4 ? 'border-y border-r border-cyan-300 text-cyan-300' : 'bg-cyan-300'}`}>
                            <Star
                                className='size-6'
                                weight='duotone' />

                            {searchAlgorithmHover === 4 && (
                                <span className='mx-7'>
                                    {searchNames[searchAlgorithmHover]}
                                </span>
                            )}
                        </button>
                    </div>
                )}

                <GraphViewport
                    path={searchAlgorithm > -1 ? getSearchPath().path : null}
                    edges={edges}
                    vertices={vertices}

                    origin={parseInt(queryParams.get('origin')!)}
                    location={isRunningRoute ? location : null}
                    destination={parseInt(queryParams.get('destination')!)}

                    className='flex-1' />
            </main>

            <footer className='px-6 py-5'>
                {!isRunningRoute ? (
                    <div className='flex items-center justify-between'>
                        <button
                            onClick={() => voltar()}
                            className='hover:bg-cyan-300 shadow-shadow text-cyan-950 dark:bg-cyan-300 dark:hover:bg-cyan-400 px-5 py-2 font-medium flex items-center gap-2 rounded-lg'>
                            Voltar

                            <ArrowCircleLeft
                                weight='duotone'
                                className='size-5'
                                />
                        </button>
                        <button
                            onClick={handleRunRoute}
                            className='ml-auto hover:bg-cyan-300 shadow-shadow text-cyan-950 dark:bg-cyan-300 dark:hover:bg-cyan-400 px-5 py-2 font-medium flex items-center gap-2 rounded-lg'>
                            Iniciar rota

                            <ArrowRight
                                className='size-5'
                                />
                        </button>
                    </div>
                ) : (
                    <div className='flex items-center justify-between'>
                        <button
                            onClick={() => setRunningRoute(false)}
                            className='hover:bg-cyan-300 shadow-shadow text-cyan-950 dark:bg-cyan-300 dark:hover:bg-cyan-400 px-5 py-2 font-medium flex items-center gap-2 rounded-lg'>
                            Cancelar

                            <HandPalm
                                weight='duotone'
                                className='size-5'
                            />
                        </button>
                        <div className='flex items-center justify-items-center'>

                            {!isOnInicio ? (<button
                                onClick={handleLastLocation}
                                className='ml-auto hover:bg-cyan-300 shadow-shadow text-cyan-950 dark:bg-cyan-300 dark:hover:bg-cyan-400 px-5 py-2 font-medium flex items-center gap-2 rounded-lg mr-3'>
                                Anterior

                                <ArrowLeft
                                    className='size-5'
                                />
                            </button>) : null}
                            {!isOnFim ? (
                            <button
                                onClick={handleNextLocation}
                                className='ml-auto hover:bg-cyan-300 shadow-shadow text-cyan-950 dark:bg-cyan-300 dark:hover:bg-cyan-400 px-5 py-2 font-medium flex items-center gap-2 rounded-lg'>
                                Próximo local

                                <ArrowRight
                                    className='size-5'
                                />
                            </button> ) : null }
                        </div>
                        {showSuccess && <notification type="success" title="Chegou ao Destino!"
                                                      description="Parabéns, você chegou ao destino."/>}
                    </div>
                )}
            </footer>
        </div>
    );
}

