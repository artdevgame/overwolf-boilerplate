import '@overwolf/types';

declare module "*.svg" {
  const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  export default content;
}

// this can be removed when Overwolf types support it
// https://github.com/overwolf/types/pull/25
declare namespace overwolf.settings.language {
  interface GetLanguageResult extends Result {
    language: string;
  }

  interface LanguageChangedEvent {
    language: string;
  }

  /**
   * Returns the current language overwolf is set to in a two letter ISO name format.
   *
   * @param callback
   */
  function get(callback: CallbackFunction<GetLanguageResult>): void;

  /**
   * Fired when user changes client language.
   */
  const onLanguageChanged: Event<LanguageChangedEvent>;
}