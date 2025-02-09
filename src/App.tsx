import { Fragment, useCallback, useEffect, useMemo, useState } from "react";

import "./App.css";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { AppItem, Hamburger, NavDrawer, NavDrawerBody, NavDrawerHeader, NavItem, NavSectionHeader } from "@fluentui/react-nav-preview";
import LinkRouter from "./LinkRouter";
import { Breadcrumb, BreadcrumbDivider, BreadcrumbItem, mergeClasses, Tooltip } from "@fluentui/react-components";
import { bundleIcon, Home20Filled, Home20Regular } from "@fluentui/react-icons";
import { usePageStyles } from "./styles";
import { breadcrumbNameMap } from "./breadcrumpMap";

function App() {
    const navigate = useNavigate();
    const location = useLocation();
    const pathnames = location.pathname.split("/").filter((x) => x);
    const pageStyles = usePageStyles();
    const [isOpen, setIsOpen] = useState(true);
    const [navItemValue, setNavItemValue] = useState<number>(1);
    const [type, setType] = useState<"inline" | "overlay">("inline");

    const Home = bundleIcon(Home20Filled, Home20Regular);

    const navItems = useMemo(
        () => [
            { name: "Home", route: "/", icon: <Home />, section: 0 },
            { name: "Significant Figures", route: "significantFigures", icon: <Home />, section: 0 },
            { name: "Uncertainty Propagation", route: "uncertaintyPropagation", icon: <Home />, section: 0 },

            { name: "InexactValue", route: "inexactValue", icon: <Home />, section: 1 },
            { name: "InexactValueWithUnits", route: "inexactValueWithUnits", icon: <Home />, section: 1 },
            { name: "Chemical", route: "chemical", icon: <Home />, section: 1 },
            { name: "DimensionalAnalysis", route: "dimensionalAnalysis", icon: <Home />, section: 1 },
        ],
        []
    );

    const renderHamburgerWithToolTip = () => {
        return (
            <Tooltip content="Navigation" relationship="label">
                <Hamburger onClick={() => setIsOpen(!isOpen)} />
            </Tooltip>
        );
    };

    const createNavItem = (value: number, children: any, href: string, icon?: any) => {
        function handleClick() {
            navigate(href);
        }

        return (
            <NavItem as="a" value={value.toString()} icon={icon} onClick={handleClick} key={value}>
                {children}
            </NavItem>
        );
    };

    useEffect(() => {
        const initialPath = location.pathname;
        if (initialPath.length > 1) {
            const navItem = navItems.find((x) => x.route === initialPath.substring(1));
            if (navItem) {
                setNavItemValue(navItems.indexOf(navItem) + 1);
                // const subItems = navItems.filter(x => x.section === navItem.section);
                // setNavItemValue(subItems.indexOf(navItem) + 1);
            }
        } else if (initialPath === "/") {
            const navItem = navItems.find((x) => x.route === "/");
            if (navItem) {
                const subItems = navItems.filter((x) => x.section === navItem.section);
                setNavItemValue(subItems.indexOf(navItem) + 1);
            }
        }
    }, [location, navItems]);

    const onMediaQueryChange = useCallback(
        ({ matches }: MediaQueryListEvent) => {
            setType(matches ? "overlay" : "inline");
            setIsOpen(matches ? false : true);
        },
        [setType]
    );
    useEffect(() => {
        const match = window.matchMedia("(max-width: 720px)");

        if (match.matches) {
            setType("overlay");
            setIsOpen(false);
        }

        match.addEventListener("change", onMediaQueryChange);

        return () => match.removeEventListener("change", onMediaQueryChange);
    }, [onMediaQueryChange]);

    return (
        <>
            <div className={pageStyles.root}>
                <NavDrawer className={mergeClasses(pageStyles.nav)} defaultSelectedValue="1" open={isOpen} selectedValue={navItemValue.toString()} type={type}>
                    <NavDrawerHeader>{renderHamburgerWithToolTip()}</NavDrawerHeader>
                    <NavDrawerBody>
                        {navItems.filter((x) => x.section === 0).map((v, index) => createNavItem(index + 1, v.name, v.route, v.icon))}
                        <NavSectionHeader>Components</NavSectionHeader>
                        {navItems.filter((x) => x.section === 1).map((v, index) => createNavItem(index + 1 + +navItems.filter((x) => x.section === 0).length, v.name, v.route, v.icon))}
                    </NavDrawerBody>
                </NavDrawer>
                <div className={pageStyles.mainArea}>
                    <div className={pageStyles.banner} id="banner">
                        <div className={pageStyles.bannerSideLeft}>
                            {!isOpen && renderHamburgerWithToolTip()}
                            <Breadcrumb aria-label="navigation breadcrumb" className={pageStyles.bannerSideItem}>
                                <LinkRouter as="BreadcrumbLink" href="/">
                                    WeBWorK for Chemistry
                                </LinkRouter>

                                {pathnames.map((value, index) => {
                                    const last: boolean = index === pathnames.length - 1;
                                    const to = `/${pathnames.slice(0, index + 1).join("/")}`;

                                    return (
                                        <Fragment key={value}>
                                            <BreadcrumbDivider />
                                            {last ? (
                                                <BreadcrumbItem>{breadcrumbNameMap[to]}</BreadcrumbItem>
                                            ) : (
                                                <LinkRouter as="BreadcrumbLink" href={to}>
                                                    {breadcrumbNameMap[to]}
                                                </LinkRouter>
                                            )}
                                        </Fragment>
                                    );
                                })}
                            </Breadcrumb>
                        </div>
                        <div className={pageStyles.bannerSideRight}>
                            <div className={pageStyles.bannerSideItem}></div>
                        </div>
                    </div>

                    <main className={!isOpen || type === "overlay" ? pageStyles.contentFull : pageStyles.content}>
                        <div style={{ marginLeft: 10 }}>
                            <Outlet />
                        </div>
                    </main>
                </div>
            </div>
        </>
    );
}

export default App;
