/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string = string> extends Record<string, unknown> {
      StaticRoutes: `/` | `/(tabs)` | `/(tabs)/` | `/(tabs)/library` | `/(tabs)/new` | `/(tabs)/radio` | `/(tabs)/search` | `/(tabs)/search/` | `/_sitemap` | `/library` | `/new` | `/radio` | `/search` | `/search/`;
      DynamicRoutes: `/music/${Router.SingleRoutePart<T>}`;
      DynamicRouteTemplate: `/music/[id]`;
    }
  }
}
