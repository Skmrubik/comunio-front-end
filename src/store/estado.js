import { create } from 'zustand'

export const useEstado = create((set, get) => ({ 
    numeroJornada: null,
    numeroPartidosJugados: null,
    cambioJornada: false,
    puntosActualizados: true,
    botonSiguienteJornada: true,
    resultadosPartidos: {},
    idParticipanteJugadores: null,
    participanteRegistrado: {},

    setNumeroJornada: (numeroJornada) => set({ numeroJornada}),
    setNumeroPartidosJugados: (numeroPartidosJugados) => set({ numeroPartidosJugados}),
    addPartidoJugado: () => set((state) => ({ numeroPartidosJugados: state.numeroPartidosJugados + 1 })),
    addJornada: () => set((state) => ({ numeroJornada: state.numeroJornada + 1, numeroPartidosJugados: 0 })),
    addPartidoJSON: (idPartido, res1, res2 ) => set((state) => ({ resultadosPartidos: { ...state.resultadosPartidos, [idPartido]: [res1, res2] } })),
    getPartidoJSON: (idPartido) => get().resultadosPartidos[idPartido] || [null, null],
    emptyPartidosJSON: () => set({ resultadosPartidos: {} }),
    setCambioJornada: (cambioJornada) => set({ cambioJornada}),
    setPuntosActualizados: (puntosActualizados) => set({ puntosActualizados}),
    setBotonSiguienteJornada: (botonSiguienteJornada) => set({ botonSiguienteJornada}),
    setIdParticipanteJugadores: (idParticipanteJugadores) => set({ idParticipanteJugadores}),
    getIdParticipanteJugadores: () => get().idParticipanteJugadores,
    setParticipanteRegistrado: (participanteRegistrado) => set({participanteRegistrado}),
    getNumeroJornada: () => get().numeroJornada,
    getNumeroPartidosJugados: () => get().numeroPartidosJugados,
    getCambioJornada: () => get().cambioJornada
}))