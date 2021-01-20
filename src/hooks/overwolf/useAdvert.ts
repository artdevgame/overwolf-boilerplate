import { RefObject, useCallback, useEffect, useState } from 'react';

import { OwAdInstance, OwAdOptions } from '@overwolf/types/owads';

export const useAdvert = (
  containerRef: RefObject<HTMLDivElement> | null,
  options: OwAdOptions = {},
) => {
  const [advert, setAdvert] = useState<OwAdInstance>();
  const [adInstanceReady, setAdInstanceReady] = useState(false);

  const onWindowStateChanged = useCallback(
    (state: overwolf.windows.WindowStateChangedEvent) => {
      if (typeof advert === 'undefined' || !adInstanceReady) {
        return;
      }

      if (state.window_state === 'minimized') {
        advert.removeAd();
      } else if (state.window_previous_state === 'minimized' && state.window_state === 'normal') {
        advert.refreshAd({});
      }
    },
    [advert, adInstanceReady],
  );

  const addWindowListeners = useCallback(
    () => {
      overwolf.windows.onStateChanged.removeListener(onWindowStateChanged);
      overwolf.windows.onStateChanged.addListener(onWindowStateChanged);
    },
    [onWindowStateChanged],
  );

  const onAdvertInitialised = useCallback(
    addWindowListeners,
    [addWindowListeners],
  );

  const onAdvertReady = useCallback(
    () => {
      setAdInstanceReady(true);
    },
    [setAdInstanceReady],
  );

  const createAdvert = useCallback(
    () => {
      if (containerRef?.current === null) {
        return;
      }

      // @ts-ignore
      const adInstance = new OwAd(containerRef.current, options);
      setAdvert(adInstance);
    },
    [containerRef, options, setAdvert],
  );

  const addAdvertListeners = useCallback(
    () => {
      if (typeof advert === 'undefined') {
        return;
      }

      advert.removeEventListener('ow_internal_rendered', onAdvertInitialised);
      advert.addEventListener('ow_internal_rendered', onAdvertInitialised);
      advert.removeEventListener('player_loaded', onAdvertReady);
      advert.addEventListener('player_loaded', onAdvertReady);
    },
    [advert, onAdvertInitialised, onAdvertReady],
  );

  useEffect(
    () => {
      if (typeof advert === 'undefined') {
        createAdvert();
      }

      if (typeof advert !== 'undefined' && !adInstanceReady) {
        addAdvertListeners();
      }

      return () => {
        if (typeof advert !== 'undefined' && adInstanceReady) {
          advert.removeAd();
        }
      };
    },
    [addAdvertListeners, advert, adInstanceReady, createAdvert],
  );

  useEffect(addAdvertListeners, [addAdvertListeners]);
  useEffect(addWindowListeners, [addWindowListeners]);

  return [advert, adInstanceReady] as const;
};
