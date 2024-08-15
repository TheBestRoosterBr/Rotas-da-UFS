import { ReactNode } from 'react';

import {
    ArrowRight,
    ArrowsHorizontal,
    PiggyBank,
    Pizza,
    Skull,
    Star,
    TrafficSign
} from '@phosphor-icons/react';

import { ThemeMode } from '@/components/themeMode';


export function RoutePage(): ReactNode {
    return (
        <>
            <header>
                <div>
                    Sua rota
                    <TrafficSign
                        weight='duotone' />
                </div>

                <ThemeMode />
            </header>

            <main>
                <div>
                    <button>
                        <ArrowsHorizontal
                            weight='duotone' />
                    </button>
                    <button>
                        <Skull
                            weight='duotone' />
                    </button>
                    <button>
                        <Pizza
                            weight='duotone' />
                    </button>
                    <button>
                        <PiggyBank
                            weight='duotone' />
                    </button>
                    <button>
                        <Star
                            weight='duotone' />
                    </button>
                </div>

                <div>
                    <p>grafo</p>
                </div>
            </main>

            <footer>
                <button>
                    Iniciar rota

                    <ArrowRight
                        />
                </button>

                <div>
                    <button>
                        Cancelar
                    </button>

                    <button>
                        Próximo local
                    </button>
                </div>
            </footer>
        </>
    );
}

