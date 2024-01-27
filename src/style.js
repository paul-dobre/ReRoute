const styles = {
    boxWidth: "xl:max-w-[1280px] w-full",
  
    heading2: "font-poppins font-semibold xs:text-[48px] text-[40px] text-white xs:leading-[76.8px] leading-[66.8px] w-full",
    paragraph: "font-poppins font-normal text-[#F2F1F2] text-[18px] leading-[30.8px]",
    commonIssues: "pl-[200px] font-poppins font-normal text-[#868686] lg:text-[25px] leading-[60px] text-left",

    greyLine: "ml-[200px] bg-[#868686] h-[2px] w-[65%]",
  
    flexCenter: "flex justify-center items-center",
    flexStart: "flex justify-center items-start",
  
    paddingX: "sm:px-16 px-6",
    paddingY: "sm:py-16 py-6",
    padding: "sm:px-16 px-6 sm:py-12 py-4",
  
    marginX: "sm:mx-16 mx-6",
    marginY: "sm:my-16 my-6",

    // navbar styles
    navtext: "p-4 border-b border-primary duration-500 hover:border-neutral-50 duration-500 hover:border-neutral-50 text-white mr-10 ",
    navtextmenu: "p-4 border-b border-gray-600 duration-500 hover:border-neutral-50 text-white mr-10 hover:text-secondary",
    menu: "w-[35px] h-[35px] absolute p-0 rounded-sm transform duration-500 ",
    navbutton: "p-4 text-primary mr-10 duration-500 hover:text-white bg-white hover:bg-secondary rounded-full hover:border-secondary hover:bg-gr xxs:[60px]",
    
    //Card style
    cardBox: "block max-w-sm p-6 border rounded-lg shadow bg-gray-800 border-gray-700 duration-500 hover:bg-gray-700 group transition-transform transform hover:scale-105 mx-auto  mb-4",

  };
  
  export const layout = {
    section: `flex md:flex-row flex-col ${styles.paddingY}`,
    sectionReverse: `flex md:flex-row flex-col-reverse ${styles.paddingY}`,
  
    sectionImgReverse: `flex-1 flex ${styles.flexCenter} md:mr-10 mr-0 md:mt-0 mt-10 relative`,
    sectionImg: `flex-1 flex ${styles.flexCenter} md:ml-10 ml-0 md:mt-0 mt-10 relative`,
  
    sectionInfo: `flex-1 ${styles.flexStart} flex-col`,


  };

  export default styles;