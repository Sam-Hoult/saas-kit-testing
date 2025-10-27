import { useMatches, Link } from "@tanstack/react-router";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";

// Helper to format path segment into readable label
function formatSegment(segment: string): string {
  return segment
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export function DynamicBreadcrumb() {
  const matches = useMatches();

  // Build breadcrumbs from the current pathname
  const breadcrumbs = matches
    .filter((match) => {
      // Skip root route and auth wrapper
      const routeId = match.routeId;
      return routeId !== '__root__' && routeId !== '/_auth';
    })
    .map((match) => {
      // Check if route has optional custom breadcrumb metadata
      const customMeta = (match.context as any)?.breadcrumb;

      // Get the last segment of the route path for the label
      const pathSegments = match.pathname.split('/').filter(Boolean);
      const lastSegment = pathSegments[pathSegments.length - 1];

      // Use custom label if provided, otherwise format the path segment
      const label = customMeta?.label || (lastSegment ? formatSegment(lastSegment) : 'Home');

      return {
        label,
        href: customMeta?.href || match.pathname,
        pathname: match.pathname,
      };
    });

  // Don't render if no breadcrumbs
  if (breadcrumbs.length === 0) {
    return null;
  }

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbs.map((crumb, index) => {
          const isLast = index === breadcrumbs.length - 1;
          const isFirst = index === 0;

          return (
            <div key={crumb.pathname} className="flex items-center gap-2">
              <BreadcrumbItem className={isFirst ? "hidden md:block" : ""}>
                {isLast ? (
                  <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link to={crumb.href}>{crumb.label}</Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {!isLast && (
                <BreadcrumbSeparator className={isFirst ? "hidden md:block" : ""} />
              )}
            </div>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
