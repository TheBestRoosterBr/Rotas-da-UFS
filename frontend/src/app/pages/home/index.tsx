import {
    ArrowRight,
    Flag,
    MapPin,
    Swap
} from '@phosphor-icons/react';

import {
    ReactNode,
    useEffect,
    useState
} from 'react';

import { useNavigate } from 'react-router-dom';

import {
    Location,
    Modal
} from './blocks/modal';

import { ThemeMode } from '@/components/themeMode';


export function HomePage(): ReactNode {
    const navigate = useNavigate();

    const [whereLocation, setWhereLocation] = useState<Location | null>(null);
    const [isWhereModelOpen, setWhereModalOpen] = useState<boolean>(false);

    const [destinationLocation, setDestinationLocation] = useState<Location | null>(null);
    const [isDestinationModelOpen, setDestinationModalOpen] = useState<boolean>(false);

    const [locationsList, setLocationsList] = useState<Location[]>([]);


    useEffect(() => {
        fetch('/api/estado')
            .then((res) => {
                if (!res.ok) {
                    return;
                }

                return res.json();
            })
            .then((data: any) => {
                const locations: Location[] = data.map((location: any): Location => {
                    return {
                        id: parseInt(location.id) + 1,
                        name: location.nome,
                        title: location.titulo,
                    };
                });

                setLocationsList(locations);
            })
            .catch(() => {
            })
            .finally(() => {
            });
    }, []);


    const handleShowRoute = () => {
        if (whereLocation === null || destinationLocation === null)
            return;

        navigate(`/route?origin=${whereLocation.id}&destination=${destinationLocation.id}`, { replace: true });
    }


    return (
        <>
            <header>
                <ThemeMode />
            </header>

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
                                disabled={whereLocation !== null}
                                onClick={() => setWhereModalOpen(true)}
                                className='flex items-center gap-2 flex-1'>
                                <MapPin
                                    className='size-5 dark:text-zinc-400'/>

                                {whereLocation !== null ? (
                                    <span className='dark:text-zinc-300 text-xl'>
                                        {whereLocation.title ?? whereLocation.name}
                                    </span>
                                ) : (
                                    <span className='dark:text-zinc-400 text-lg'>
                                        Onde você está?
                                    </span>
                                )}
                            </button>

                            {whereLocation !== null && (
                                <button
                                    onClick={() => setWhereModalOpen(true)}
                                    className='shadow-shadow hover:bg-zinc-200 dark:text-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-600 px-5 py-2 font-medium flex items-center gap-2 rounded-lg'>
                                    Alterar local
                                    <Swap
                                        className='size-5' />
                                </button>
                            )}
                        </div>

                        {/* Input for destination location */}
                        {whereLocation !== null && (
                            <div className='dark:bg-zinc-900 h-16 px-4 rounded-xl shadow-shadow flex items-center justify-between gap-3'>
                                <button
                                    onClick={() => setDestinationModalOpen(true)}
                                    className='flex items-center gap-2 flex-1'>
                                    <Flag
                                        className='size-5 dark:text-zinc-400'/>

                                    {destinationLocation !== null ? (
                                        <span className='dark:text-zinc-300 text-xl'>
                                            {destinationLocation.title ?? destinationLocation.name}
                                        </span>
                                    ) : (
                                        <span className='dark:text-zinc-400 text-lg'>
                                            Para onde você vai?
                                        </span>
                                    )}
                                </button>

                                {destinationLocation !== null && (
                                    <button
                                        onClick={handleShowRoute}
                                        className='bg-cyan-100 hover:bg-cyan-300 shadow-shadow text-cyan-950 dark:bg-cyan-300 dark:hover:bg-cyan-400 px-5 py-2 font-medium flex items-center gap-2 rounded-lg'>
                                        Mostrar rotas
                                        <ArrowRight
                                            className='size-5' />
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </main>

            {isWhereModelOpen && (
                <Modal
                    onClose={() => setWhereModalOpen(false)}
                    onSelect={(location) => setWhereLocation(location)}

                    title='Nós diga onde você está'

                    currentLocation={whereLocation}
                    locations={locationsList} />
            )}

            {isDestinationModelOpen && (
                <Modal
                    onClose={() => setDestinationModalOpen(false)}
                    onSelect={(location) => setDestinationLocation(location)}

                    title='Nós diga onde você deseja ir'

                    currentLocation={destinationLocation}
                    locations={locationsList.filter((location) => {
                        if (whereLocation === null)
                            return true;

                        return location.id !== whereLocation.id;
                    })} />
            )}
        </>
    );
}

