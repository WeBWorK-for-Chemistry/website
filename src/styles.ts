import { makeStyles, shorthands, tokens } from "@fluentui/react-components";

const bannerHeight = 40;

export const usePageStyles = makeStyles({
    root: {
        display: "flex",
        flexDirection: "row",
        height: '100vh',
        width: '100vw',
        ...shorthands.overflow("hidden", "hidden"),
    },
    nav: {
        zIndex: 1,
    },
    navHeader: {
        height: "170px", // approximate size of logo
    },
    navLogo: {
        background: "transparent",
        position: "relative",
        "::before": {
            content: "''",
            background: "url(https://2yc3.org/images/menubkg.jpg)", // linear-gradient(to bottom, rgba(255,255,255,1.0) 0%, rgba(255,255,255,0.7) 20%, rgba(255,255,255,0.7) 100%)',
            backgroundSize: "260px auto",
            backgroundRepeat: "space",
            zIndex: -1,
            position: "absolute",
            left: "-15px",
            width: "260px",
            height: "100vh",
            top: 0,
            display: "inline-block",
            mask: "linear-gradient(to bottom, rgba(255,255,255,1.0) 0%, rgba(255,255,255,0.7) 20%, rgba(255,255,255,0.7) 100%)",
        },
    },
    navLogoOverlay: {
        background: "transparent",
        position: "relative",
        "::before": {
            content: "''",
            background: "url(https://2yc3.org/images/menubkg.jpg)", // linear-gradient(to bottom, rgba(255,255,255,1.0) 0%, rgba(255,255,255,0.7) 20%, rgba(255,255,255,0.7) 100%)',
            backgroundSize: "280px auto",
            backgroundRepeat: "space",
            zIndex: -1,
            position: "absolute",
            left: "0px",
            width: "280px",
            height: "100vh",
            top: 0,
            display: "inline-block",
            mask: "linear-gradient(to bottom, rgba(255,255,255,1.0) 0%, rgba(255,255,255,0.7) 20%, rgba(255,255,255,0.7) 100%)",
        },
    },
    navItem: {
        backgroundColor: "transparent",
        ":hover": {
            backgroundColor: "#EEEEEE", //'var(--colorNeutralBackground4Hover)',
            opacity: 1,
        },
    },

    // drawerRoot: {
    // 	// width: drawerWidth + 'px',
    // 	height: '100vh',
    // 	...shorthands.overflow('hidden', 'auto')
    // },
    // drawerLogoContent: {
    // 	display: 'flex',
    // 	flexDirection: 'row',
    // 	alignItems: 'center'
    // },
    mainArea: {
        flex: "0 1 100%",
        display: "flex",
        flexDirection: "column",
        height: "100vh",
    },
    banner: {
        width: "100%",
        height: bannerHeight + "px",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
    },
    bannerSideLeft: {
        display: "flex",
        flexDirection: "row",
        ...shorthands.padding(
            tokens.spacingVerticalS,
            tokens.spacingHorizontalS
        ),
    },
    bannerSideRight: {
        display: "flex",
        flexDirection: "row-reverse",
        flexWrap: "wrap",
        maxHeight: "32px",
        rowGap: "20px",
        ...shorthands.overflow("hidden"),
        ...shorthands.padding(
            tokens.spacingVerticalS,
            tokens.spacingHorizontalS
        ),
    },
    bannerSideItem: {
        ...shorthands.margin(
            tokens.spacingVerticalNone,
            tokens.spacingHorizontalM
        ),
    },
    logoIcon: {
        height: "32px",
    },
    content: {
        paddingTop: "1em",
        height: `calc( 100vh - ${bannerHeight}px)`,
        width: "100%",
        boxSizing: "border-box",
        //width: `calc(100vw - ${drawerWidth - 20}px)`,
        ...shorthands.padding("10px"),
        overflow: "auto auto",
        //...shorthands.overflow('auto', 'auto'),
        //...shorthands.margin(tokens.spacingVerticalXL, tokens.spacingHorizontalXL),
        //...shorthands.flex(1),
        flex: "1",
        gridRowGap: tokens.spacingVerticalXXL,
    },
    contentFull: {
        paddingTop: "1em",
        ...shorthands.padding("10px"),
        height: `calc( 100vh - ${bannerHeight}px)`,
        width: "100%",
        boxSizing: "border-box",
        //width: `calc(100vw - ${20}px)`,
        overflow: "auto auto",
        //...shorthands.overflow('auto', 'auto'),
        //...shorthands.margin(tokens.spacingVerticalXL, tokens.spacingHorizontalXL),
        //...shorthands.flex(1),
        flex: "1",

        gridRowGap: tokens.spacingVerticalXXL,
    },
    dialogContent: {
        display: "flex",
        flexDirection: "column",
        rowGap: "10px",
    },
});
