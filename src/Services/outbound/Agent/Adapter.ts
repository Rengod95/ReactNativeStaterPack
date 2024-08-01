import { VariantService } from "@/services/outbound/Invariant/Adapter.ts";

export class UserAgentService {
  private readonly _agent: typeof Navigator.prototype;

  constructor() {
    VariantService.invariant(window && window.navigator, {
      message:
        "the Window or Global Navigator object has not been initialized.",
    });

    this._agent = window.navigator;
  }

  public getUserAgentLanguage(): LanguageTag {
    return this._agent.language;
  }

  get navigator() {
    return this._agent;
  }
}
