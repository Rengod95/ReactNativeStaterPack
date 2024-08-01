type InvariantType = "error" | "warning" | "log" | "ignore";

type InvariantOptions = {
  type?: InvariantType;
  message?: string;
  callback?: (type: InvariantType) => void;
};
export class VariantService {
  private static invariantPrefix: string = "Invariant Issue Occurred";
  public static invariant(
    condition: unknown,
    { type = "error", message, callback }: InvariantOptions,
  ): asserts condition {
    if (condition || type === "ignore") return;

    const payload = this.invariantPrefix + message;

    if (type === "error") {
      throw new Error(payload);
    } else if (type === "warning") {
      console.warn(payload);
    } else if (type === "log") {
      console.log(payload);
    }

    typeof callback === "function" && callback(type);
  }
}
