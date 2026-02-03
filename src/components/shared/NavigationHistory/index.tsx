import {
  Breadcrumb,
  BreadcrumbLink,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "crm-project-ui";

import { useNavigationHistory } from "./context";

export { NavigationHistoryProvider, useNavigationHistory } from "./context";
export type { BreadItem, NavigationHistoryState } from "./context";

export const NavigationHistory = () => {
  const { history } = useNavigationHistory();
  const { main, items } = history;

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem className="hidden md:block">
          <BreadcrumbLink href={main.url}>{main.title}</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator className="hidden md:block" />
        {items.map((item) => (
          <div key={`${item.url}-${item.title}`}>
            <BreadcrumbItem>
              <BreadcrumbLink href={item.url}>{item.title}</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbPage className="hidden md:block" />
          </div>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};
