import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export type CreatePostResult = { 'ok' : Post } |
  { 'err' : string };
export interface Post {
  'id' : bigint,
  'media' : string,
  'content' : string,
  'link' : string,
}
export type QueryPostResult = { 'ok' : Post } |
  { 'err' : string };
export interface _SERVICE {
  'createPost' : ActorMethod<[string, string, string], CreatePostResult>,
  'deletePost' : ActorMethod<[bigint], string>,
  'editPost' : ActorMethod<[bigint, string, string, string], string>,
  'getAllPosts' : ActorMethod<[], Array<Post>>,
  'getPostByID' : ActorMethod<[bigint], QueryPostResult>,
  'seeOwner' : ActorMethod<[], string>,
}
