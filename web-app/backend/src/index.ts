import { blob, nat, int, Principal, $query, $update, $init, ic, Variant, Record, Opt, Result, Tuple, Vec } from 'azle';

type Post = Record<{
    id: nat;
    content: string;
    media: string;
    link: string;
}>;

type PostDatabase = Vec<Post>;

type CreatePostResult = Variant<{
    ok: Post;
    err: string;
}>;

type QueryPostResult = Variant<{
    ok: Post;
    err: string;
}>;

let posts : PostDatabase = [];
let owner : string = "";

$init
export function init(): void {
    owner = ic.caller().toText();
}

$query
export function seeOwner(): string {
    return owner;
}

$query
export function getAllPosts(): PostDatabase {
    return posts;
}

$update
export function createPost(content: string, media: string, link: string): CreatePostResult {
    if (ic.caller().toText() !== Principal.from(owner).toText()) {
        throw new Error("Unauthorized");
    } else {
        try {
            const id = BigInt(posts.length + 1);
            const post = { id, content, media, link };
            posts.push(post);
            return { ok: post };
        }    
        catch (err) {
            return { err: err.message };
        }
    }
}

$query
export function getPostByID(id: nat): QueryPostResult {
    const post = posts.find(post => post.id === id);
    if (post) {
        return { ok: post };
    } else {
        return { err: "Post Not Found" };
    }
}

$update
export async function deletePost(id: nat): Promise<string> {
    if (ic.caller().toText() !== Principal.from(owner).toText()) {
        throw new Error("Unauthorized");
    } else {
        try {
            posts = posts.filter(post => post.id !== id);
            return "Post Deleted";
        } catch (err) {
            return err.message;
        }
    }
}

$update
export async function editPost(id: nat, content: string, media: string, link: string): Promise<string> {
    if (ic.caller().toText() !== Principal.from(owner).toText()) {
        throw new Error("Unauthorized");
    } else {
        try {
            const post = posts.find(post => post.id === id);
            post!.content = content;
            post!.media = media;
            post!.link = link;
            return "Post Edited";
        } catch (err) {
            return err.message;
        }
    }
}