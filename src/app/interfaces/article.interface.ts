
export interface ArticleResponse {
    status:       string;
    totalResults: number;
    articles:     Article[];
}

export interface Article {
    id:             number;
    title:          string;
    url:            string;
    published_date: string | Date;
    publisher:      Publisher;
}

export interface Publisher {
    name: string;
    url?:  string;
}
