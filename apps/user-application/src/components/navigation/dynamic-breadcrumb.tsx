import { useMatches, Link } from "@tanstack/react-router";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";

export interface BreadcrumbConfig {
  title: string;
  showInBreadcrumb?: boolean;
}

// Route segment to title mapping
const routeTitleMap: Record<string, string> = {
  app: "App",
  dashboard: "Dashboard",
  settings: "Settings",
  docs: "Documentation",
  tutorial: "Tutorial",
  table: "Table",
  polar: "Polar",
  subscriptions: "Subscriptions",
  portal: "Portal",
  special: "Special",
};

export function DynamicBreadcrumb() {
  const matches = useMatches();

  // Build breadcrumb items from route matches
  const breadcrumbItems = matches
    .filter((match) => {
      // Filter out root and layout routes that shouldn't show in breadcrumbs
      const routeId = match.routeId;
      return routeId !== "__root__" && routeId !== "/_auth" && routeId !== "/_static";
    })
    .map((match, index, filteredMatches) => {
      const routeId = match.routeId;
      const pathname = match.pathname;
      const isLast = index === filteredMatches.length - 1;

      // Get breadcrumb config from route context if available
      const breadcrumbConfig = (match.context as any)?.breadcrumb as BreadcrumbConfig | undefined;

      // If route explicitly says not to show in breadcrumb, skip it
      if (breadcrumbConfig?.showInBreadcrumb === false) {
        return null;
      }

      // Determine the title
      // Default to the route segment name (capitalized) unless a custom title is provided
      let title: string;

      if (breadcrumbConfig?.title) {
        // Use custom title if provided
        title = breadcrumbConfig.title;
      } else {
        // Extract the last segment from the route path
        const segments = pathname.split("/").filter(Boolean);
        const lastSegment = segments[segments.length - 1];

        // Use the title map if available, otherwise capitalize the segment name
        title = routeTitleMap[lastSegment] ||
                lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1);
      }

      return {
        title,
        pathname,
        isLast,
      };
    })
    .filter(Boolean);

  // Don't render if we have no breadcrumbs
  if (breadcrumbItems.length === 0) {
    return null;
  }

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbItems.map((item, index) => (
          <div key={item?.pathname} className="contents">
            <BreadcrumbItem className={index === 0 ? "hidden md:block" : ""}>
              {item?.isLast ? (
                <BreadcrumbPage>{item.title}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink asChild>
                  <Link to={item?.pathname}>{item.title}</Link>
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
            {!item?.isLast && (
              <BreadcrumbSeparator className={index === 0 ? "hidden md:block" : ""} />
            )}
          </div>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
