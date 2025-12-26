<template>
  <nav aria-label="Breadcrumb" class="breadcrumbs-nav">
    <ol class="breadcrumbs-list">
      <li
        v-for="(item, index) in breadcrumbs"
        :key="item.path"
        class="breadcrumb-item"
      >
        <NuxtLink
          v-if="!item.isCurrent"
          :to="item.path"
          class="breadcrumb-link"
        >
          {{ item.label }}
        </NuxtLink>
        <span v-else class="breadcrumb-link" aria-current="page">
          {{ item.label }}
        </span>

        <span
          v-if="index < breadcrumbs.length - 1"
          class="breadcrumb-separator"
          aria-hidden="true"
        >
          /
        </span>
      </li>
    </ol>
  </nav>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";

interface BreadcrumbItem {
  label: string;
  path: string;
  isCurrent: boolean;
}

const route = useRoute();

// Define path-to-label mappings for consistent breadcrumb labels
const pathLabels: Record<string, string> = {
  "/": "Dashboard",
  "/dashboard": "Dashboard",
  "/users": "Users",
  "/content": "Content",
  "/configuration": "Configuration",
  "/page": "Page",
};

const breadcrumbs = computed<BreadcrumbItem[]>(() => {
  const pathSegments = route.path
    .split("/")
    .filter((segment) => segment.length > 0);
  const breadcrumbs: BreadcrumbItem[] = [];

  // Always start with Dashboard for dashboard routes
  if (route.path.startsWith("/dashboard")) {
    breadcrumbs.push({
      label: "Dashboard",
      path: "/dashboard",
      isCurrent: route.path === "/dashboard",
    });
  }

  // Process each path segment
  let currentPath = route.path.startsWith("/dashboard") ? "/dashboard" : "";

  pathSegments.forEach((segment, index) => {
    // Skip 'dashboard' segment as we already added it
    if (segment === "dashboard") return;

    currentPath += `/${segment}`;

    // Get label from mapping or convert segment to readable format
    const label = pathLabels[`/${segment}`] || formatPathSegment(segment);

    breadcrumbs.push({
      label,
      path: currentPath,
      isCurrent: currentPath === route.path,
    });
  });

  return breadcrumbs;
});

/**
 * Convert a URL path segment to a readable label
 * e.g., 'user-profile' -> 'User Profile'
 */
function formatPathSegment(segment: string): string {
  return segment
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
</script>

<style scoped lang="scss">
.breadcrumbs-nav {
  margin-bottom: 1.5rem;
}

.breadcrumbs-list {
  display: flex;
  align-items: center;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: 0.5rem;
}

.breadcrumb-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.breadcrumb-link {
  color: #6b7280;
  text-decoration: none;
  font-size: 0.875rem;
  font-weight: 500;
  padding: 0.25rem 0.5rem;
  border-radius: 0.375rem;
}

.breadcrumb-separator {
  color: #9ca3af;
  font-size: 0.875rem;
  font-weight: 500;
}

/* Responsive design */
@media (max-width: 40rem) {
  .breadcrumbs-list {
    flex-wrap: wrap;
  }

  .breadcrumb-link,
  .breadcrumb-current {
    font-size: 0.8rem;
    padding: 0.2rem 0.4rem;
  }

  .breadcrumb-separator {
    font-size: 0.8rem;
  }
}
</style>
