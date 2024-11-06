/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string = string> extends Record<string, unknown> {
      StaticRoutes: `/` | `/(profile)/downloads` | `/(profile)/profile` | `/(tabs)` | `/(tabs)/` | `/(tabs)/(profile)/downloads` | `/(tabs)/(profile)/profile` | `/(tabs)/downloads` | `/(tabs)/new` | `/(tabs)/profile` | `/_sitemap` | `/downloads` | `/new` | `/profile` | `/switch-profile`;
      DynamicRoutes: `/content/${Router.SingleRoutePart<T>}` | `/movie/${Router.SingleRoutePart<T>}`;
      DynamicRouteTemplate: `/content/[id]` | `/movie/[id]`;
    }
  }
}
