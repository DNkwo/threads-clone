export interface User {
    id: number;
    user_uuid: string;
    username: string;
    handle: string;
    bio: string;
    link: string;
    img: string;
    instagram_url: string;
    followers: Array<{user_uuid: string}>;
}

export interface ThreadType {
    id: number;
    timestamp: string;
    thread_from: string;
    thread_to: string;
    reply_to: number;
    text: string;
    likes: Array<{user_uuid: string}>;
}