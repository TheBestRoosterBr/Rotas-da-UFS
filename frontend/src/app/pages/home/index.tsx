import {
    ArrowRight,
    Funnel,
    MagnifyingGlass,
    MapPin,
    Moon,
    Sun,
    Swap,
    X
} from '@phosphor-icons/react';

import {
    ReactNode,
    useState
} from 'react';


interface Location {
    id: number;
    name: string;
}


export function HomePage(): ReactNode {
    const [theme, setTheme] = useState<string>(
        localStorage.getItem('themeMode') ?? 'dark'
    );

    // Per-modal
    const [location, setLocation] = useState<Location | null>(null);

    // Window states
    const [whereLocation, setWhereLocation] = useState<number>(0);
    const [isWhereModelOpen, setWhereModalOpen] = useState<boolean>(true);

    const [locationsList, setLocationsList] = useState<Location[]>([
        {
            id: 1,
            name: 'sala 007',
        },
        {
            id: 2,
            name: 'sala 006',
        },
        {
            id: 3,
            name: 'sala 005',
        },
    ]);

    function changeTheme(): void {
        const newTheme: string = theme == 'dark' ? 'light' : 'dark';

        // Update theme mode
        document.documentElement.classList.toggle('dark', newTheme == 'dark');

        localStorage.setItem('themeMode', newTheme);
        setTheme(newTheme);
    }

    return (
        <>
            {/* Only color mode selector */}
            <nav className='flex justify-end px-2.5 py-2'>
                <button
                    onClick={changeTheme}
                    className=''>
                    {theme == 'dark' ? (
                        <Sun
                            className='text-zinc-800 dark:text-zinc-400 size-6' />
                    ) : (
                        <Moon
                            className='text-zinc-800 dark:text-zinc-400 size-6' />
                    )}
                </button>
            </nav>

            {/* Main content */}
            <main className='h-screen flex items-center justify-center'>
                <div className='max-w-3xl w-full px-6 text-center space-y-10'>
                    <div className='space-y-1'>
                        <p className='dark:text-zinc-300 text-lg italic'>
                            “Se você não sabe aonde quer ir, qualquer caminho serve”
                        </p>
                        <p className='dark:text-zinc-300 text-lg'>
                            Mas nós te ajudamos a chegar lá —&nbsp;&nbsp;Rotas UFS
                        </p>
                    </div>

                    {/* Inputs */}
                    <div className='space-y-4'>
                        {/* Input for current location */}
                        <div className='dark:bg-zinc-900 h-16 px-4 rounded-xl shadow-shadow flex items-center gap-3'>
                            <button
                                disabled={startLocation > 0}
                                className='flex items-center gap-2 flex-1'>
                                <MapPin
                                    className='size-5 dark:text-zinc-400'/>

                                <span
                                    className='dark:text-zinc-400 text-lg'>
                                    Onde você está?
                                </span>
                            </button>

                            {startLocation > 0 && (
                                <button
                                    className='shadow-shadow hover:bg-zinc-200 dark:text-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-600 px-5 py-2 font-medium flex items-center gap-2 rounded-lg'>
                                    Alterar local
                                    <Swap
                                        className='size-5' />
                                </button>
                            )}
                        </div>

                        {/* Input for destination location */}
                        {startLocation > 0 && (
                            <div className='dark:bg-zinc-900 h-16 px-4 rounded-xl shadow-shadow flex items-center justify-between gap-3'>
                                <button
                                    className='flex items-center gap-2 flex-1'>
                                    <MapPin
                                        className='size-5 dark:text-zinc-400'/>

                                    <span
                                        className='dark:text-zinc-400 text-lg'>
                                        Para onde você vai?
                                    </span>
                                </button>

                                <button
                                    className='bg-cyan-100 hover:bg-cyan-300 shadow-shadow text-cyan-950 dark:bg-cyan-300 dark:hover:bg-cyan-400 px-5 py-2 font-medium flex items-center gap-2 rounded-lg'>
                                    Mostrar rotas
                                    <ArrowRight
                                        className='size-5' />
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </main>

            {isWhereModelOpen && (
                <div className='fixed inset-0 bg-black/80 flex justify-center items-center'>
                    {/* Modal window */}
                    <div className='flex flex-col w-[720px] h-96 bg-zinc-900 px-6 py-5 rounded-xl space-y-5'>
                        {/* Title row */}
                        <div className="flex items-center justify-between">
                            <span className='text-lg text-zinc-300 font-semibold'>
                                Nós diga onde você está
                            </span>
                            <button
                                onClick={() => setWhereModalOpen(false)}
                                className='p-1 bg-zinc-800 rounded-full'>
                                <X
                                    className='size-5 text-zinc-400' />
                            </button>
                        </div>

                        {/* Content row */}
                        <div className='flex space-x-4'>
                            {/* Locations column */}
                            <div className='space-y-6'>
                                {/* Search & Filter & Selected location */}
                                <div className='space-y-3'>
                                    {/* Search & Filter */}
                                    <div className='flex flex-row space-x-2 items-center justify-center'>
                                        {/* Search input */}
                                        <div className='flex items-center h-8 space-x-2 p-[10px] rounded-lg dark:bg-zinc-800'>
                                            <input
                                                type='text'
                                                placeholder='Procurar local...'
                                                className='min-w-52 text-sm bg-transparent outline-none text-zinc-300 placeholder:text-zinc-300'
                                                />

                                            <MagnifyingGlass
                                                className='size-6 text-zinc-300' />
                                        </div>

                                        {/* Filter button */}
                                        <button
                                            className='p-1 bg-zinc-800 rounded-lg'>
                                            <Funnel
                                                className='size-6 text-zinc-300' />
                                        </button>
                                    </div>

                                    {location !== null && (
                                        <div
                                            key={location.id}
                                            className='flex item-center justify-between rounded-lg px-4 py-1 h-8 text-start  dark:bg-cyan-300'>
                                            {location.name}

                                            <button
                                                onClick={() => setLocation(null)}
                                                className=''>
                                                <X
                                                    className='size-5 text-cyan-950' />
                                            </button>
                                        </div>
                                    )}
                                </div>

                                {/* Locations */}
                                {/* TODO: scrollable list */}
                                <div className='flex flex-col space-y-2 overflow-y-auto'>
                                    {locationsList.map((loc) => {
                                        if (location !== null
                                                && loc.id === location.id)
                                            return null;

                                        return (
                                            <button
                                                key={loc.id}
                                                onClick={() => setLocation(loc)}
                                                className='rounded-lg px-4 py-1 h-8 text-start text-zinc-300 bg-zinc-800'>
                                                {loc.name}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Vertical separator */}
                            {/* TODO: expand separator to full height */}
                            <div
                                className='w-px h-full bg-zinc-600'
                                />

                            {/* Preview column */}
                            <div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

