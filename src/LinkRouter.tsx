import React, { } from "react";
import { Link, MenuItemLink, Button, ToolbarButton } from "@fluentui/react-components";
import { BreadcrumbButton } from "@fluentui/react-components";
import { UNSAFE_NavigationContext as NavigationContext, useHref, useLinkClickHandler } from "react-router-dom";
import { UNSAFE_warning as warning, stripBasename } from '@remix-run/router';
import { NavItem, NavDensity } from "@fluentui/react-nav-preview";

const ABSOLUTE_URL_REGEX = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i;

const isBrowser =
  typeof window !== "undefined" &&
  typeof window.document !== "undefined" &&
  typeof window.document.createElement !== "undefined";

type LinkRouterProps = {
  href?: string;
  to?: string;
  children?: React.ReactNode;
  as?: "Link" | "MenuItemLink" | "BreadcrumbLink" | "ButtonLink" | "NavLink" | "ToolbarButton";
  icon?: any;
  disabled?: boolean;
  style?: any;
  appearance?: 'primary' | 'outline' | 'secondary';
  value?: any;
  selected?: boolean;
  density?: NavDensity;
}

const LinkRouter = React.forwardRef<HTMLAnchorElement, LinkRouterProps>(

  function LinkWithRef(
    {
      onClick,
      relative,
      reloadDocument,
      replace,
      state,
      target,
      preventScrollReset,
      as,
      ...rest
    }: any,
    ref: any
  ) {
    let { basename } = React.useContext(NavigationContext);

    // Rendered into <a href> for absolute URLs
    let absoluteHref: string | undefined;
    let isExternal = false;

    if (typeof rest.href === "string" && ABSOLUTE_URL_REGEX.test(rest.href)) {
      // Render the absolute href server- and client-side
      absoluteHref = rest.href;

      // Only check for external origins client-side
      if (isBrowser) {
        try {
          let currentUrl = new URL(window.location.href);
          let targetUrl = rest.href.startsWith("//")
            ? new URL(currentUrl.protocol + rest.href)
            : new URL(rest.href);
          let path = stripBasename(targetUrl.pathname, basename);

          if (targetUrl.origin === currentUrl.origin && path != null) {
            // Strip the protocol/origin/basename for same-origin absolute URLs
            rest.href = path + targetUrl.search + targetUrl.hash;
          } else {
            isExternal = true;
          }
        } catch (e) {
          // We can't do external URL detection without a valid URL
          warning(
            false,
            `<Link to="${rest.href}"> contains an invalid URL which will probably break ` +
            `when clicked - please update to a valid URL path.`
          );
        }
      }
    }

    // Rendered into <a href> for relative URLs
    let href = useHref(rest.href, { relative });

    let internalOnClick = useLinkClickHandler(rest.href, {
      replace,
      state,
      target,
      preventScrollReset,
      relative,
    });
    function handleClick(
      event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
    ) {
      if (onClick) onClick(event);
      if (!event.defaultPrevented) {
        internalOnClick(event);
      }
    }

    switch (as) {
      case "ButtonLink":
        return (
          <Button as="a" href={absoluteHref || href}
            appearance={rest.appearance}
            onClick={isExternal || reloadDocument ? onClick : handleClick}
            ref={ref}
            target={target}
            disabled={rest.disabled}
          >{rest.children}</Button>
        );
      case "ToolbarButton":
        return (
          <ToolbarButton as="a" href={absoluteHref || href}
            appearance={rest.appearance}
            onClick={isExternal || reloadDocument ? onClick : handleClick}
            ref={ref}
            target={target}>{rest.children}</ToolbarButton>
        )
      case "BreadcrumbLink":
        return (
          <BreadcrumbButton as="a" href={absoluteHref || href}
            onClick={isExternal || reloadDocument ? onClick : handleClick}
            ref={ref}
            target={target}

          >{rest.children}</BreadcrumbButton>
        );
      case 'MenuItemLink':
        return (
          <MenuItemLink href={absoluteHref || href}
            onClick={isExternal || reloadDocument ? onClick : handleClick}
            ref={ref}
            target={target}
            icon={rest.icon ?? null}
            disabled={rest.disabled}
            style={rest.style}>
            {rest.children}
          </MenuItemLink>
        );
      case 'NavLink':
        return (
          <NavItem
            
            value={rest.value}
            onClick={isExternal || reloadDocument ? onClick : handleClick}
            href={absoluteHref || href}
            ref={ref}
            target={target}
            icon={rest.icon ?? null}
            style={rest.style}
          >
            {rest.children}
          </NavItem>
        );
      case 'Link':
      default:
        return (
          <Link href={absoluteHref || href}
            onClick={isExternal || reloadDocument ? onClick : handleClick}
            ref={ref}
            disabled={rest.disabled}
            target={target}>
            {rest.children}
          </Link>
        );
    }


  });

export default LinkRouter;