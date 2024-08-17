import {
    ReactNode,
    useEffect,
    useState
} from 'react';

import {
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


interface SearchPath {
    search: number;
    path: number[];
}


export function RoutePage(): ReactNode {
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

    const [isLoading, setLoading] = useState<number>(0);
    const [error, setError] = useState<string | null>(null);

    const [vertices, setVertices] = useState<Vertex[]>([]);
    const [edges, setEdges] = useState<Edge[]>([]);

    const [location, setLocation] = useState<number>(-1);

    const [queryParams] = useSearchParams();


    function handleRunRoute(): void {
        if (searchAlgorithm === -1) {
            setError('O algoritmo de busca deve ser selecionado!');
            return;
        }

        setRunningRoute(true);
        setLocation(parseInt(queryParams.get('origin')!));
    }

    function handleNextLocation(): void {
        const path = searchsPathCache[searchAlgorithm]!.path;

        let index = Infinity;
        for (index of path.keys())
            if (path[index] == location)
                break;

        if (index + 1 > path.length) {
            alert('Possible at destination!');
            return;
        }

        setLocation(path[index]!);
    }

    function handleAlgorithmSelection(algorithm: number): void {
        setSearchAlgorithm(algorithm);

        const cached = searchsPathCache.filter((path: SearchPath) => path.search == algorithm);
        if (cached.length > 0)
            return;

        setLoading((prev) => prev + 1);
        fetch(`/api/busca/${searchNames[algorithm]?.toLowerCase().replace(' ', '_')}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    inicio: queryParams.get('origin'),
                    fim: queryParams.get('destination'),
                })
            })
            .then((res) => {
                if (!res.ok) {
                    setError('Não foi possível buscar os dados dos estados!');
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
                setError('Ocorreu um erro');
            })
            .finally(() => {
                setLoading((prev) => prev - 1);
            });
    }


    useEffect(() => {
        setLoading((prev) => prev + 1);

        fetch('/api/estado')
            .then((res) => {
                if (!res.ok) {
                    setError('Não foi possível buscar os dados dos estados!');
                    return;
                }

                return res.json();
            })
            .then((data: any) => {
                const vertices: Vertex[] = data.estados.map((vertex: any): Vertex => {
                    return {
                        id: parseInt(vertex.id),
                        title: vertex.titulo,

                        x: parseFloat(vertex.x) ?? Math.random() * 500,
                        y: parseFloat(vertex.y) ?? Math.random() * 500,
                    };
                });

                setVertices(vertices);
            })
            .catch(() => {
                setError('Ocorreu um erro');
            })
            .finally(() => {
                setLoading((prev) => prev - 1);
            });
    }, []);

    useEffect(() => {
        setLoading((prev) => prev + 1);

        fetch('/api/transicao')
            .then((res) => {
                if (!res.ok) {
                    setError('Não foi possível buscar os dados das transições!');
                    return;
                }

                return res.json();
            })
            .then((data: any) => {
                const edges: Edge[] = data.transicoes.map((edge: any): Edge => {
                    return {
                        origin: parseInt(edge.origem),
                        destination: parseInt(edge.destino),
                    };
                });

                setEdges(edges);
            })
            .catch(() => {
                setError('Ocorreu um erro');
            })
            .finally(() => {
                setLoading((prev) => prev - 1);
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
                    edges={edges}
                    vertices={vertices}

                    origin={parseInt(queryParams.get('origin')!)}
                    location={isRunningRoute ? location : null}
                    destination={parseInt(queryParams.get('destination')!)}

                    className='flex-1' />
            </main>

            <footer className='px-6 py-5'>
                {!isRunningRoute ? (
                    <button
                        onClick={handleRunRoute}
                        className='ml-auto hover:bg-cyan-300 shadow-shadow text-cyan-950 dark:bg-cyan-300 dark:hover:bg-cyan-400 px-5 py-2 font-medium flex items-center gap-2 rounded-lg'>
                        Iniciar rota

                        <ArrowRight
                            className='size-5'
                            />
                    </button>
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

                        <button
                            onClick={handleNextLocation}
                            className='ml-auto hover:bg-cyan-300 shadow-shadow text-cyan-950 dark:bg-cyan-300 dark:hover:bg-cyan-400 px-5 py-2 font-medium flex items-center gap-2 rounded-lg'>
                            Próximo local

                            <ArrowRight
                                className='size-5'
                                />
                        </button>
                    </div>
                )}
            </footer>
        </div>
    );
}

