type Constructor<T> = new (...args: any[]) => T;
type Factory<T> = () => T;

type Registration<T> =
  | { kind: 'singleton'; factory: Factory<T>; instance?: T }
  | { kind: 'transient'; factory: Factory<T> };

class DIContainer {
  private registry = new Map<string, Registration<any>>();

  registerSingleton<T>(token: string, factory: Factory<T>): void {
    this.registry.set(token, { kind: 'singleton', factory });
  }

  registerTransient<T>(token: string, factory: Factory<T>): void {
    this.registry.set(token, { kind: 'transient', factory });
  }

  resolve<T>(token: string): T {
    const registration = this.registry.get(token) as Registration<T> | undefined;
    if (!registration) {
      throw new Error(`[DI] No registration found for token: "${token}"`);
    }

    if (registration.kind === 'singleton') {
      if (!registration.instance) {
        registration.instance = registration.factory();
      }
      return registration.instance;
    }

    return registration.factory();
  }
}

export const container = new DIContainer();
