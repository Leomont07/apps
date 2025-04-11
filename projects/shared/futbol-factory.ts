export class FutbolFactory {
    static createEntity(type: string): any {
      switch (type) {
        case 'equipo':
          return { nombre: '', ciudad: '' };
        case 'jugador':
          return { name: '', team: null, position: '' };
        case 'partido':
          return { home_team: null, away_team: null, date: '', score: '' };
        case 'stat':
          return { jugador: null, partido: null, goles: 0, asistencias: 0 };
        default:
          throw new Error('Unknown entity type');
      }
    }
  }