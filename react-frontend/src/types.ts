export type Post = {
    id: number,
    creator_photo_profile: string,
    created_at: string,
    created_by: string,
    creator_id: number,
    content: string,
    image: string
}

export type Likes = {
    id: number,
    user_id: number,
    thread_id: number,
    created_at: string,
    created_by: string,
    replie_id: number
}

export type Replies = {
    id: number,
    thread_id: number,
    image: string,
    content: string,
    created_at: string,
    created_by: string,
    updated_at: string,
    updated_by: string,
    creator_photo_profile: string,
    creator_id: number
}

export type RepliesLike = {
    id: number,
    user_id: number,
    replie_id: number,
    created_at: string,
    created_by: string
}

export type Follow = {
    id: number,
    following_id: number,
    follower_id: number,
    created_at: string,
    updated_at: string,
}

export type User = {
    id: number,
    username: string,
    full_name: string,
    email: string,
    password: string,
    photo_profile: string,
    bio: string,
    created_at: string,
    updated_at: string
}