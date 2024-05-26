export const themeConfig = {
  light: {
    token: {
      colorLink: "#777373",
      colorTextSecondary: "#000000c0",
      colorBorder: "#4e2727",
      colorBorderSecondary: "#aa9999d8",
      wireframe: false,
      colorPrimaryBgHover: "#8e9295",
      colorBgElevated: "#d2d2d238",
      colorPrimaryBg: "#cbd9e4",
      colorPrimaryHover: "#722ed1",
      colorPrimary: "#8e4ee9",
      colorInfo: "#8e4ee9",
      colorBgBase: "#ffffff67",
      fontSize: 16,
    },
    components: {
      Button: {
        algorithm: true,
        colorPrimaryHover: "rgb(114, 37, 223)",
        defaultBorderColor: "rgb(60, 66, 66)",
        borderColorDisabled: "rgb(60, 66, 66)",
        defaultColor: "#722ED1",
        paddingInline: 24,
        controlHeight: 45,
        paddingBlock: 10,
      },
      Divider: {
        fontFamily: "roboto",
      },
      Anchor: {
        colorPrimary: "rgb(0, 0, 0)",
      },
      Breadcrumb: {
        itemColor: "rgb(0, 0, 0)",
        lastItemColor: "rgb(0, 0, 0)",
        linkHoverColor: "rgb(0, 0, 0)",
        colorText: "rgb(0, 0, 0)",
        linkColor: "#807d7e",
      },
    },
    algorithm: [],
  },
  dark: {
    token: {
      colorBorder: "#4e2727",
      colorBorderSecondary: "#000000d8",
      wireframe: false,
      colorPrimaryBgHover: "#8e9295",
      colorPrimaryBg: "#cbd9e4",
      colorPrimaryHover: "#722ed1",
      fontSize: 16,
      colorPrimary: "#8e4ee9",
      colorInfo: "#8e4ee9",
      colorBgSpotlight: "#201d1d",
      colorBgElevated: "#00000098",
    },
    components: {
      Button: {
        defaultBorderColor: "rgb(60, 66, 66)",
        borderColorDisabled: "rgb(60, 66, 66)",
        colorBgContainer: "rgba(179, 175, 175, 0.53)",
        colorTextLightSolid: "rgb(255, 255, 255)",
        colorText: "rgb(0, 0, 0)",
        defaultBg: "rgb(0, 0, 0)",
        defaultColor: "rgb(255, 255, 255)",
        defaultActiveBorderColor: "rgba(0, 0, 0, 0.6)",
        defaultHoverBg: "rgb(255, 255, 255)",
        defaultHoverBorderColor: "rgba(0, 0, 0, 0.59)",
        defaultHoverColor: "rgb(0, 0, 0)",
        paddingInline: 24,
        controlHeight: 45,
        paddingBlock: 10,
      },
      Divider: {
        fontFamily: "roboto",
      },
      Anchor: {
        colorPrimary: "rgb(0, 0, 0)",
      },
      Breadcrumb: {
        itemColor: "rgb(0, 0, 0)",
        lastItemColor: "rgb(0, 0, 0)",
        linkHoverColor: "rgb(0, 0, 0)",
        colorText: "rgb(0, 0, 0)",
        linkColor: "rgba(0, 0, 0, 0.6)",
      },
      Select: {
        optionActiveBg: "rgba(0, 0, 0, 0.58)",
        optionSelectedBg: "rgb(255, 255, 255)",
        colorBgElevated: "rgba(0, 0, 0, 0.8)",
        selectorBg: "rgb(0, 0, 0)",
        colorText: "rgb(255, 255, 255)",
        optionSelectedColor: "rgb(0, 0, 0)",
        colorTextPlaceholder: "rgb(255, 255, 255)",
        colorTextQuaternary: "rgb(255, 255, 255)",
      },
    },
  },
};
