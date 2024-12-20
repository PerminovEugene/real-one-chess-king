import { Socket } from "socket.io";
import { Board } from "../shared/src/chess/board";
import { Game, Player } from "../shared/src/chess/game";
import { GameInitializer } from "./game-initializer";

type QueueItem = {
  player: Player;
  socket: Socket;
};
export class Queue {
  private queue: QueueItem[] = [];

  public enqueue(player: Player, socket: Socket) {
    this.queue.push({ player, socket });
  }

  public dequeue(): QueueItem | undefined {
    return this.queue.pop();
  }
}

export class Matchmaker {
  private queue = new Queue();
  private gameInitializer = new GameInitializer();
  private socketIdsInQueue = new Set<string>();

  public isSocketIdInQueue(socketId: string) {
    return this.socketIdsInQueue.has(socketId);
  }

  public removeSocketFromQueue(socketId: string) {
    this.socketIdsInQueue.delete(socketId);
  }

  public findMatch(player: Player, socket: Socket) {
    const opponent = this.queue.dequeue();
    if (!opponent) {
      this.socketIdsInQueue.add(socket.id);
      this.queue.enqueue(player, socket);
      return null;
    }
    const board = new Board();
    this.gameInitializer.spawnPieces(board);

    return {
      game: new Game(player, opponent.player, board),
      opponentSocket: opponent.socket,
    };
  }
}
