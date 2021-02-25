import React from "react";

const context = {
    songId:null,
    videoId:null,
    imageId:null,
    title:null,
    setSongId: (id:string) => {},
    setTitle:(id:string) =>{}
}



export const AppContext = React.createContext(context);
