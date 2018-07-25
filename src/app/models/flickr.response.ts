export interface FlickrPhoto {
    farm: number;
    id: string;
    owner: string;
    secret: string;
    server: string;
    title: string;
    isfamily: number;
    isfriend: number;
    ispublic: number;
    ownername: string;
    dateupload: string;
    latitude: string;
    longitude: string;
    description: {
        _content: string
    };
}

export interface FlickrResponse {
    photos: {
        page: number;
        pages: number;
        perpage: number;
        total: string;
        photo: Array<FlickrPhoto>;
    };
    status: string;
}
