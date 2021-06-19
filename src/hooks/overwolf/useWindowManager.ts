interface GetCurrentWindowProps {
  onWindowObtained?(windowInfo: overwolf.windows.WindowInfo): void;
}
interface GetWindowProps {
  windowName: string;
  windowSettings?: overwolf.windows.WindowProperties | undefined;
}

interface GetWindowStateProps extends GetWindowProps {
  onWindowStateRetrieved(windowStateResult: overwolf.windows.GetWindowStateResult): void;
}

interface OpenWindowProps extends GetWindowProps {
  onWindowOpened?(windowInfo: overwolf.windows.WindowInfo): void;
}

interface ResizeWindowProps extends GetWindowProps {
  height: number;
  width: number;
}

type CloseWindowProps = GetWindowProps;
type MoveWindowProps = GetWindowProps;
type ToggleWindowProps = GetWindowProps;

async function closeWindow({ windowName }: CloseWindowProps) {
  const owWindow = await getWindow({ windowName });

  overwolf.windows.close(owWindow.id);
}

function getCurrentWindow({ onWindowObtained }: GetCurrentWindowProps = {}): Promise<overwolf.windows.WindowInfo> {
  return new Promise((resolve, reject) => {
    const handleWindowObtained = (result: overwolf.windows.WindowResult) => {
      if (result.success) {
        if (typeof onWindowObtained === 'function') onWindowObtained(result.window);
        resolve(result.window);
      }
      reject(result.error);
    };

    overwolf.windows.getCurrentWindow(handleWindowObtained);
  });
}

function getWindow({ windowName, windowSettings }: GetWindowProps): Promise<overwolf.windows.WindowInfo> {
  return new Promise((resolve, reject) => {
    const onWindowObtained = (result: overwolf.windows.WindowResult) => {
      result.success ? resolve(result.window) : reject(result.error);
    };

    if (typeof windowSettings !== 'undefined') {
      overwolf.windows.obtainDeclaredWindow(windowName, windowSettings, onWindowObtained);
    }

    overwolf.windows.obtainDeclaredWindow(windowName, onWindowObtained);
  });
}

async function getWindowState({ windowName, onWindowStateRetrieved }: GetWindowStateProps) {
  const owWindow = await getWindow({ windowName });

  overwolf.windows.getWindowState(owWindow.id, onWindowStateRetrieved);
}

async function moveWindow({ windowName }: MoveWindowProps) {
  const owWindow = await getWindow({ windowName });

  overwolf.windows.dragMove(owWindow.id);
}

async function openWindow({ onWindowOpened, windowName, windowSettings }: OpenWindowProps) {
  const owWindow = await getWindow({ windowName, windowSettings });

  const onWindowRestored = (result: overwolf.windows.WindowIdResult) => {
    if (result.success) {
      overwolf.windows.restore(owWindow.id);
      if (typeof onWindowOpened === 'function') onWindowOpened(owWindow);
    }
  };

  overwolf.windows.restore(owWindow.id, onWindowRestored);
}

async function resizeWindow({ height, width, windowName }: ResizeWindowProps) {
  const owWindow = await getWindow({ windowName });

  overwolf.windows.changeSize({ auto_dpi_resize: false, height, width, window_id: owWindow.id });
}

async function toggleWindow({ windowName }: ToggleWindowProps) {
  const owWindow = await getWindow({ windowName });

  owWindow.isVisible ? overwolf.windows.hide(owWindow.id) : openWindow({ windowName });
}

export const useWindowManager = () => ({
  closeWindow,
  getCurrentWindow,
  getWindow,
  getWindowState,
  moveWindow,
  openWindow,
  resizeWindow,
  toggleWindow,
});
