export interface Artist {
    id: number,
    name: string,
    image: string,
    createdAt: Date,
    updatedAt: Date,
    albums: null | Array<Album>
}

export interface Tag {
    id: number,
    name: string,
    color: string,
    createdAt: Date,
    updatedAt: Date,
    albums: null | Array<Album>
}

export interface Album {
    id: number,
    name: string,
    image: string,
    releaseDate: string,
    score: number,
    review?: string,
    createdAt: Date,
    updatedAt: Date,
    artists?: Array<Artist>,
    tags?: Array<Tag>
};