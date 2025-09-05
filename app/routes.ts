import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/generate.tsx"),
  route("decrypt", "routes/decrypt.tsx"),
  route("encrypt", "routes/encrypt.tsx"),
] satisfies RouteConfig;
