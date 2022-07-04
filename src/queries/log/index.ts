import { Log } from "@prisma/client";

export const saveLogQuery = (
  gameId: number,
  statusId: number,
  userId: string
): any => {
  return {
    data: {
      statusId: statusId,
      gameId: gameId,
      userId: userId,
    },
  };
};

export const getByGameAndUserIdQuery = (
  gameId: number,
  userId: string
): any => {
  return {
    where: {
      gameId: gameId,
      userId: userId,
    },
    select: {
      id: true,
    },
  };
};

export const putLogQuery = (log: Log, statusId: number): any => {
  return {
    where: {
      id: log.id,
    },
    data: {
      statusId: statusId,
    },
  };
};

export const getGameById = (gameId: number): any => {
  return {
    where: {
      id: gameId,
    },
    select: {
      id: true,
    },
  };
};

export const getStatusById = (statusId: number): any => {
  return {
    where: {
      id: statusId,
    },
    select: {
      id: true,
    },
  };
};
