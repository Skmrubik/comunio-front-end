import { create } from 'zustand'

export const useEstado = create((set, get) => ({ 
    numeroJornada: null,
    numeroPartidosJugados: null,
    cambioJornada: false,

    setNumeroJornada: (numeroJornada) => set({ numeroJornada}),
    setNumeroPartidosJugados: (numeroPartidosJugados) => set({ numeroPartidosJugados}),
    addPartidoJugado: () => set((state) => ({ numeroPartidosJugados: state.numeroPartidosJugados + 1 })),
    addJornada: () => set((state) => ({ numeroJornada: state.numeroJornada + 1, numeroPartidosJugados: 0 })),
    setCambioJornada: (cambioJornada) => set({ cambioJornada}),
    getNumeroJornada: () => get().numeroJornada,
    getNumeroPartidosJugados: () => get().numeroPartidosJugados,
    getCambioJornada: () => get().cambioJornada
}))