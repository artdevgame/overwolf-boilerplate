import { useCallback, useEffect, useState } from 'react';

const overwolfNs = overwolf.games;

export const useGame = (classId?: number) => {
  const [isRunning, setIsRunning] = useState(false);
  const [gameInfo, setGameInfo] = useState<overwolf.games.GameInfo | overwolf.games.RunningGameInfo>();

  const onLaunched = useCallback((info: overwolf.games.RunningGameInfo) => {
    setIsRunning(true);
    setGameInfo(info);
  }, []);

  const onUpdated = useCallback(({ gameInfo: info, runningChanged }: overwolf.games.GameInfoUpdatedEvent) => {
    if (runningChanged && typeof info !== 'undefined') {
      setIsRunning(info.isRunning);
      setGameInfo(info);
    }
  }, []);

  useEffect(() => {
    overwolfNs.onGameLaunched.removeListener(onLaunched);
    overwolfNs.onGameLaunched.addListener(onLaunched);

    overwolfNs.onGameInfoUpdated.removeListener(onUpdated);
    overwolfNs.onGameInfoUpdated.addListener(onUpdated);

    overwolfNs.getRunningGameInfo((info) => {
      if (info === null || (typeof classId !== 'undefined' && info.classId !== classId)) return;
      setIsRunning(true);
      setGameInfo(info);
    });

    return () => {
      overwolfNs.onGameLaunched.removeListener(onLaunched);
      overwolfNs.onGameInfoUpdated.removeListener(onUpdated);
    }
  }, []);

  return [isRunning, gameInfo] as const;
};
