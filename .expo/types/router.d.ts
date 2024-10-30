/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string = string> extends Record<string, unknown> {
      StaticRoutes: `/` | `/(tabs)` | `/(tabs)/` | `/(tabs)/new` | `/(tabs)/profile` | `/_sitemap` | `/new` | `/profile`;
      DynamicRoutes: `/content/${Router.SingleRoutePart<T>}` | `/music/${Router.SingleRoutePart<T>}`;
      DynamicRouteTemplate: `/content/[id]` | `/music/[id]`;
    }
  }
}
