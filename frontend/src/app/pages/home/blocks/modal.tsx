import {
    Funnel,
    MagnifyingGlass,
    X
} from '@phosphor-icons/react';

import { useState } from 'react';


interface Location {
    id: number;
    name: string;
}

interface ModalProps {
    onClose: () => void;
    onSelect: (location: Location) => void;

    locations: Location[];
}


export function Modal(props: ModalProps) {
    const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
    const [search, setSearch] = useState<string>('');

    return (
        <div className='fixed inset-0 bg-black/80 flex justify-center items-center'>
            {/* Modal window */}
            <div className='flex flex-col w-[720px] h-96 bg-zinc-900 px-6 py-5 rounded-xl space-y-5'>
                {/* Title row */}
                <div className="flex items-center justify-between">
                    <span className='text-lg text-zinc-300 font-semibold'>
                        Nós diga onde você está
                    </span>
                    <button
                        onClick={props.onClose}
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
                                <div
                                    key={selectedLocation.id}
                                    className='flex item-center justify-between rounded-lg px-4 py-1 h-8 text-start  dark:bg-cyan-300'>
                                    {selectedLocation.name}

                                    <button
                                        onClick={() => setSelectedLocation(null)}
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
                            {props.locations.map((location) => {
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
    );
}

