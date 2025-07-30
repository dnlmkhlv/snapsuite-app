export const getFontClassName = (fontFamily: string): string => {
  const fontMap: { [key: string]: string } = {
    Inter: "font-inter",
    Roboto: "font-roboto",
    "Open Sans": "font-open-sans",
    Lato: "font-lato",
    Poppins: "font-poppins",
    Montserrat: "font-montserrat",
  };

  return fontMap[fontFamily] || "font-inter";
};

export const getQuoteFontClassName = (fontFamily: string): string => {
  return getFontClassName(fontFamily);
};
