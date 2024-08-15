import {
    Moon,
    Sun
} from '@phosphor-icons/react';

import {
    ReactNode,
    useState
} from 'react';


export function ThemeMode(): ReactNode {
    const [theme, setTheme] = useState<string>(
        localStorage.getItem('themeMode') ?? 'dark'
    );


    function changeTheme(): void {
        const newTheme: string = theme == 'dark' ? 'light' : 'dark';

        // Update theme mode
        document.documentElement.classList.toggle('dark', newTheme == 'dark');

        localStorage.setItem('themeMode', newTheme);
        setTheme(newTheme);

    }


    return (
        <div className='flex justify-end px-2.5 py-2'>
            <button
                onClick={changeTheme}
                className=''>
                {theme == 'dark' ? (
                    <Sun
                        weight='duotone'
                        className='text-zinc-800 dark:text-zinc-400 size-6' />
                ) : (
                    <Moon
                        weight='duotone'
                        className='text-zinc-800 dark:text-zinc-400 size-6' />
                )}
            </button>
        </div>
    );
}

