export interface iClassifiedList {
  genre: string;
  shows: Array<iShowList>;
}

export interface iShowList {
    id: number;
    name: string;
    rating: {
        average: number;
    };
    genres: Array<string>;
    image: {
        medium: string
    };
};

export interface iShowSearch {
    show: iShowList;
}

export interface iShowDetails {
    id: number;
    name: string;
    rating: {
      average: number;
    };
    image: {
      medium: string
    };
    type: string;
    language: string;
    genres: Array<string>;
    officialSite: string;
    status: string;
    summary: string;
  };