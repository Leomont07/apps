// src/app/shared/service-decorator.ts
export function LogServiceDecorator<T extends new (...args: any[]) => any>(constructor: T) {
  return class extends constructor {
    constructor(...args: any[]) {
      super(...args);
      console.log(`Servicio ${constructor.name} inicializado`);
    }

    // Métodos genéricos para equipos
    addEquipo(equipo: any) {
      console.log(`[Log] Agregando equipo: ${JSON.stringify(equipo)}`);
      return super.addEquipo(equipo);
    }

    updateEquipo(id: number, equipo: any) {
      console.log(`[Log] Actualizando equipo ${id}: ${JSON.stringify(equipo)}`);
      return super.updateEquipo(id, equipo);
    }

    deleteEquipo(id: number) {
      console.log(`[Log] Eliminando equipo ${id}`);
      return super.deleteEquipo(id);
    }

    // Métodos para jugadores
    addJugador(jugador: any) {
      console.log(`[Log] Agregando jugador: ${JSON.stringify(jugador)}`);
      return super.addJugador(jugador);
    }

    updateJugador(id: number, jugador: any) {
      console.log(`[Log] Actualizando jugador ${id}: ${JSON.stringify(jugador)}`);
      return super.updateJugador(id, jugador);
    }

    deleteJugador(id: number) {
      console.log(`[Log] Eliminando jugador ${id}`);
      return super.deleteJugador(id);
    }

    // Métodos para partidos
    addPartido(partido: any) {
      console.log(`[Log] Agregando partido: ${JSON.stringify(partido)}`);
      return super.addPartido(partido);
    }

    updatePartido(id: number, partido: any) {
      console.log(`[Log] Actualizando partido ${id}: ${JSON.stringify(partido)}`);
      return super.updatePartido(id, partido);
    }

    deletePartido(id: number) {
      console.log(`[Log] Eliminando partido ${id}`);
      return super.deletePartido(id);
    }

    // Métodos para stats
    addStat(stat: any) {
      console.log(`[Log] Agregando stat: ${JSON.stringify(stat)}`);
      return super.addStat(stat);
    }

    updateStat(id: number, stat: any) {
      console.log(`[Log] Actualizando stat ${id}: ${JSON.stringify(stat)}`);
      return super.updateStat(id, stat);
    }

    deleteStat(id: number) {
      console.log(`[Log] Eliminando stat ${id}`);
      return super.deleteStat(id);
    }
  };
}