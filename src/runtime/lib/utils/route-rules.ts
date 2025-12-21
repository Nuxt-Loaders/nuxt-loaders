import { logInfo, logWarn } from "../log";

const checkLoaderNameValidity = (
  loaderName: string
): { valid: boolean; reason?: string } => {
  // eslint-disable-next-line
  const loaderNamePattern = /^[A-Za-z][A-Za-z0-9_-]*$/;

  if (!loaderNamePattern.test(loaderName)) {
    return {
      valid: false,
      reason: `Loader name '${loaderName}' is invalid. Must start with a letter and contain only alphanumeric characters, hyphens, or underscores.`,
    };
  }

  return { valid: true };
};

const checkRoutePatternValidity = (
  route: string
): { valid: boolean; reason?: string } => {
  // Allow "*" or "/" as default routes
  if (route === "*" || route === "/") {
    return { valid: true };
  }

  // Validate route patterns: must start with "/" and contain valid path segments
  const routePattern = /^\/[\w\-/]*$/;

  if (!routePattern.test(route)) {
    return {
      valid: false,
      reason:
        "Route pattern is invalid. Must start with '/' and contain only alphanumeric characters, hyphens, underscores, or slashes.",
    };
  }

  return { valid: true };
};

const checkRuleValidity = (
  route: string,
  loaderName: string
): { valid: boolean; reason?: string } => {
  const routeValidation = checkRoutePatternValidity(route);
  if (!routeValidation.valid) {
    return routeValidation;
  }

  return checkLoaderNameValidity(loaderName);
};

export const validateLoaderRules = (routeRules: Record<string, string>) => {
  const newRules: Record<string, string> = {};

  if (!routeRules) return {};

  Object.keys(routeRules).forEach((route) => {
    if (!route) return;
    if (!route.trim()) {
      logWarn(
        `Loader rule is invalid. Failed trying to parse '${route}'. Route is empty so it is skipped.`
      );
      return;
    }
    if (
      !routeRules[route] ||
      (routeRules[route]?.trim().length || 0) < 1 ||
      routeRules[route] == undefined
    ) {
      logWarn(
        `Loader rule is invalid. Failed trying to parse '${route}: ${routeRules[route]}'. Loader name is invalid so it is skipped.`
      );
      return;
    }

    let normalizedRoute = route;
    if (route.endsWith("/") && route.length > 1) {
      normalizedRoute = route.slice(0, -1);
    }

    const validResult = checkRuleValidity(normalizedRoute, routeRules[route]!);

    if (!validResult.valid) {
      logWarn(
        `Failed to parse rule '${normalizedRoute}'. Reason: ${validResult.reason}. Rule is skipped.`
      );
      return;
    }

    newRules[normalizedRoute] = routeRules[route]!;
    logInfo(`Loaded rule '${normalizedRoute}' -> '${routeRules[route]}'`);
  });

  return newRules;
};

export const getDefaultLoader = (routeRules: Record<string, string>) => {
  const defaultLoader = Object.keys(routeRules).filter((key) => {
    return key === "*" || key === "/";
  });

  if (defaultLoader.length <= 0) {
    return "";
  }

  if (defaultLoader.length > 1) {
    return routeRules["*"];
  }

  return routeRules[defaultLoader[0] as string];
};

export const getActiveLoader = (
  routeRules: Record<string, string>,
  path: string
) => {
  const rules = Object.keys(routeRules).filter((rule) => {
    if (!path.startsWith(rule)) return false;

    if (!path.endsWith("*") && path != rule) return false;

    return true;
  });

  if (rules.length <= 0) {
    return "";
  }

  const rule = rules.reduce((prev, curr) => {
    if (curr.split("/").length > prev.split("/").length) return curr;
    return prev;
  });

  return routeRules[rule];
};
