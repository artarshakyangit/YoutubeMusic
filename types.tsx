export type RootStackParamList = {
  Root: undefined;
  NotFound: undefined;
};

export type BottomTabParamList = {
  TabOne: undefined;
  TabTwo: undefined;
};

export type TabOneParamList = {
  TabOneScreen: undefined;
};

export type TabTwoParamList = {
  TabTwoScreen: undefined;
};

export type Album = {
  albums: string;
  id: string;
  name: string;
  by: string;
  imageUri: string|number;
  artistsHeadline: string;
  title:string;
}



export type Song = {
  id: string,
  imageUri: string,
  title: string,
  artist: string,
}


export type Snippet = {
  videoId: string,
  title: string,
  channel: string
}
