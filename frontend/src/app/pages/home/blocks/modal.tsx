import {
    ArrowRight,
    Funnel,
    MagnifyingGlass,
    MapPinArea,
    X
} from '@phosphor-icons/react';

import {
    useMemo,
    useState,
    useTransition
} from 'react';

import { levenshtein } from '@/utils';


interface Location {
    id: number;
    name: string;

    title?: string;
    description?: string;
}

interface ModalProps {
    onClose: () => void;
    onSelect: (location: Location) => void;

    title: string;

    currentLocation: Location | null;
    isLoadingLocations: boolean;
    locations: Location[];
}


export function Modal(props: ModalProps) {
    const [selectedLocation, setSelectedLocation] = useState<Location | null>(props.currentLocation);
    const [search, setSearch] = useState<string>('');

    const [isLoadingLocation, startLoadLocation] = useTransition();

    const locations = useMemo(() => {
        return [...props.locations].filter((item) => {
            if (props.currentLocation === null)
                return true;

            return props.currentLocation.id !== item.id;
        }).sort((a, b) => {
            return levenshtein(search, a.name) - levenshtein(b.name, search)
        })
    }, [search, props.locations]);

    function handleConfirmLocation(): void {
        props.onSelect(selectedLocation!);
        props.onClose();
    }

    return (
        <div className='fixed inset-0 bg-black/80 flex justify-center items-center'>
            {/* Modal window */}
            <div className='flex flex-col w-[720px] h-[464px] bg-zinc-900 px-6 py-5 rounded-xl space-y-5'>
                {/* Title row */}
                <div className="flex items-center justify-between">
                    <span className='text-lg text-zinc-300 font-semibold'>
                        {props.title}
                    </span>
                    <button
                        onClick={props.onClose}
                        className='flex items-center justify-center p-1 bg-zinc-800 rounded-full'>
                        <X
                            className='size-5 text-zinc-400' />
                    </button>
                </div>

                {/* Content row */}
                <div className='flex h-full space-x-4'>
                    {/* Locations column */}
                    <div className='space-y-3'>
                        {/* Search & Filter & Selected location */}
                        <div className='space-y-3'>
                            {/* Search & Filter */}
                            <div className='flex flex-row space-x-2 items-center justify-center'>
                                {/* Search input */}
                                <div className='flex items-center h-8 space-x-2 p-[10px] rounded-lg dark:bg-zinc-800'>
                                    <input
                                        type='text'
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        placeholder='Procurar local...'
                                        className='min-w-52 text-sm bg-transparent outline-none text-zinc-300 placeholder:text-zinc-300'
                                        />

                                    {search === '' ? (
                                        <MagnifyingGlass
                                            className='size-6 text-zinc-300' />
                                    ) : (
                                        <X
                                            onClick={() => setSearch('')}
                                            className='cursor-pointer size-6 text-zinc-300' />
                                    )}
                                </div>

                                {/* Filter button */}
                                <button
                                    className='p-1 bg-zinc-800 rounded-lg'>
                                    <Funnel
                                        className='size-6 text-zinc-300' />
                                </button>
                            </div>

                            {selectedLocation !== null && (
                                <div className='relative z-10'>
                                    {/* This will hidden the elements when hover */}
                                    <div className='absolute inset-0 h-12 bg-zinc-900' />

                                    <div
                                        key={selectedLocation.id}
                                        className='absolute inset-0 flex item-center justify-between rounded-lg px-4 py-1 h-8 text-start  dark:bg-cyan-300'>
                                        {selectedLocation.name}

                                        <button
                                            onClick={() => setSelectedLocation(null)}
                                            className=''>
                                            <X
                                                className='size-5 text-cyan-950' />
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Locations */}
                        {props.isLoadingLocations ? (
                            <p>TODO: LOADING</p>
                        ) : (
                            <div className='flex flex-1 flex-col max-h-80 space-y-2 overflow-y-auto'>
                                {selectedLocation !== null && (
                                    <>
                                        {/* Padding: this is used to not hide the
                                        * first list element when show the
                                        * selected item o top of the list
                                        */}
                                        <div className='min-h-12 bg-blue' />
                                    </>
                                )}

                                {locations.map((location) => {
                                    if (selectedLocation !== null
                                            && location.id === selectedLocation.id)
                                        return null;

                                    return (
                                        <button
                                            key={location.id}
                                            onClick={() => setSelectedLocation(location)}
                                            className='rounded-lg px-4 py-1 h-8 text-start text-zinc-300 bg-zinc-800'>
                                            {location.name}
                                        </button>
                                    );
                                })}
                            </div>
                        )}
                    </div>

                    {/* Vertical separator */}
                    <div className='w-px h-72 my-auto bg-zinc-600' />

                    {/* Preview column */}
                    {selectedLocation !== null ? (
                        <div className='flex flex-1 h-full flex-col items-center'>
                            {/* Location informations */}
                            <div className='flex flex-1 h-full flex-col items-center space-y-1.5'>
                                {/* Location image */}
                                <div className='w-56 h-44 bg-zinc-400' />

                                {/* Horizontal separator */}
                                <div className='w-48 h-px bg-zinc-600' />

                                {/* Location tile & description */}
                                <div className='w-full text-zinc-300 text-sm space-y-2'>
                                    <span className='flex justify-center text-center font-bold'>
                                        {selectedLocation.title ?? selectedLocation.name}
                                    </span>

                                    {selectedLocation.description !== undefined && (
                                        <pre className='h-28 text-wrap overflow-y-auto'>
                                            {selectedLocation.description}
                                        </pre>
                                    )}
                                </div>
                            </div>

                            <div className='flex w-full items-center justify-end'>
                                <button
                                    onClick={handleConfirmLocation}
                                    className='flex px-3 py-1.5 gap-2 items-center rounded-lg text-sm dark:bg-cyan-300'>
                                    Confirmar
                                    <ArrowRight
                                        className='size-5' />
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className='flex flex-1 h-full items-center justify-center'>
                            <MapPinArea
                                className='size-52 text-zinc-400' />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

