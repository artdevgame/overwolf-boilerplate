import { useCallback, useEffect, useState } from 'react';

const overwolfNs = overwolf.games.launchers;

export const useLauncher = (classId: number) => {
  const [isRunning, setIsRunning] = useState(false);
  const [launcherInfo, setLauncherInfo] = useState<overwolf.games.launchers.LauncherInfo>();

  const onLaunched = useCallback((info: overwolf.games.launchers.LauncherInfo) => {
    setIsRunning(true);
    setLauncherInfo(info);
  }, []);

  const onTerminated = useCallback((info: overwolf.games.launchers.LauncherInfo) => {
    setIsRunning(false);
  }, []);

  useEffect(() => {
    overwolfNs.onLaunched.removeListener(onLaunched);
    overwolfNs.onLaunched.addListener(onLaunched);

    overwolfNs.onLaunched.removeListener(onTerminated);
    overwolfNs.onLaunched.addListener(onTerminated);

    overwolfNs.getRunningLaunchersInfo(({ launchers }) => {
      const launcher = launchers.find((launcher) => launcher.classId === classId);

      if (typeof launcher !== 'undefined') {
        setIsRunning(true);
        setLauncherInfo(launcher);
      }
    });

    return () => {
      overwolfNs.onLaunched.removeListener(onLaunched);
      overwolfNs.onLaunched.removeListener(onTerminated);
    };
  }, []);

  return [isRunning, launcherInfo] as const;
};
