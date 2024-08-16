import {
    ReactNode,
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

import { ThemeMode } from '@/components/themeMode';


export function RoutePage(): ReactNode {
    const search_names = {
        0: 'Largura',
        1: 'Profundidade',
        2: 'Gulosa',
        3: 'Custo Uniforme',
        4: 'A estrela',
    };

    const [searchAlgorithmHover, setSearchAlgorithmHover] = useState<number>(-1);
    const [searchAlgorithm, setSearchAlgorithm] = useState<number>(-1);
    const [isRunningRoute, setRunningRoute] = useState<boolean>(false);


    function handleRunRoute(): void {
        alert('Implement run route!');
        setRunningRoute(true);
    }


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

            <main className='flex flex-1 text-zinc-300'>
                {!isRunningRoute && (
                    <div className='flex flex-col items-baseline justify-center text-zinc-900 space-y-4'>
                        <button
                            onClick={() => setSearchAlgorithm(0)}
                            onMouseEnter={() => setSearchAlgorithmHover(0)}
                            onMouseLeave={() => setSearchAlgorithmHover(-1)}
                            className={`flex items-center px-4 py-1.5 rounded-r-lg ${searchAlgorithm == 0 ? 'border-y border-r border-cyan-300 text-cyan-300' : 'bg-cyan-300'}`}>
                            <ArrowsHorizontal
                                className='size-6'
                                weight='duotone' />

                            {searchAlgorithmHover === 0 && (
                                <span className='mx-7'>
                                    {search_names[searchAlgorithmHover]}
                                </span>
                            )}
                        </button>
                        <button
                            onClick={() => setSearchAlgorithm(1)}
                            onMouseEnter={() => setSearchAlgorithmHover(1)}
                            onMouseLeave={() => setSearchAlgorithmHover(-1)}
                            className={`flex items-center px-4 py-1.5 rounded-r-lg ${searchAlgorithm == 1 ? 'border-y border-r border-cyan-300 text-cyan-300' : 'bg-cyan-300'}`}>
                            <Skull
                                className='size-6'
                                weight='duotone' />

                            {searchAlgorithmHover === 1 && (
                                <span className='mx-7'>
                                    {search_names[searchAlgorithmHover]}
                                </span>
                            )}
                        </button>
                        <button
                            onClick={() => setSearchAlgorithm(2)}
                            onMouseEnter={() => setSearchAlgorithmHover(2)}
                            onMouseLeave={() => setSearchAlgorithmHover(-1)}
                            className={`flex items-center px-4 py-1.5 rounded-r-lg ${searchAlgorithm == 2 ? 'border-y border-r border-cyan-300 text-cyan-300' : 'bg-cyan-300'}`}>
                            <Pizza
                                className='size-6'
                                weight='duotone' />

                            {searchAlgorithmHover === 2 && (
                                <span className='mx-7'>
                                    {search_names[searchAlgorithmHover]}
                                </span>
                            )}
                        </button>
                        <button
                            onClick={() => setSearchAlgorithm(3)}
                            onMouseEnter={() => setSearchAlgorithmHover(3)}
                            onMouseLeave={() => setSearchAlgorithmHover(-1)}
                            className={`flex items-center px-4 py-1.5 rounded-r-lg ${searchAlgorithm == 3 ? 'border-y border-r border-cyan-300 text-cyan-300' : 'bg-cyan-300'}`}>
                            <PiggyBank
                                className='size-6'
                                weight='duotone' />

                            {searchAlgorithmHover === 3 && (
                                <span className='mx-7'>
                                    {search_names[searchAlgorithmHover]}
                                </span>
                            )}
                        </button>
                        <button
                            onClick={() => setSearchAlgorithm(4)}
                            onMouseEnter={() => setSearchAlgorithmHover(4)}
                            onMouseLeave={() => setSearchAlgorithmHover(-1)}
                            className={`flex items-center px-4 py-1.5 rounded-r-lg ${searchAlgorithm == 4 ? 'border-y border-r border-cyan-300 text-cyan-300' : 'bg-cyan-300'}`}>
                            <Star
                                className='size-6'
                                weight='duotone' />

                            {searchAlgorithmHover === 4 && (
                                <span className='mx-7'>
                                    {search_names[searchAlgorithmHover]}
                                </span>
                            )}
                        </button>
                    </div>
                )}
            </main>

            <footer className='px-6 pb-5'>
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
                            onClick={() => alert('implement cancel route')}
                            className='hover:bg-cyan-300 shadow-shadow text-cyan-950 dark:bg-cyan-300 dark:hover:bg-cyan-400 px-5 py-2 font-medium flex items-center gap-2 rounded-lg'>
                            Cancelar

                            <HandPalm
                                weight='duotone'
                                className='size-5'
                                />
                        </button>

                        <button
                            onClick={() => alert('implement next loc')}
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

