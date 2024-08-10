import {
    ArrowRight,
    MapPin,
    Moon,
    Sun,
    Swap
} from '@phosphor-icons/react';

import {
    ReactNode,
    useState
} from 'react';


export function HomePage(): ReactNode {
    const [theme, setTheme] = useState<string>(
        localStorage.getItem('themeMode') ?? 'dark'
    );

    const [startLocation, setStartLocation] = useState<number>(0);

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
        </>
    );
}

