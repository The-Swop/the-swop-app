import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export type ManualReply = { 'ok' : Post } |
  { 'err' : string };
export type ManualReply_1 = { 'ok' : Post } |
  { 'err' : string };
export interface Post { 'id' : bigint, 'text' : string, 'photo' : string }
export interface _SERVICE {
  'createPost' : ActorMethod<[string, string], ManualReply>,
  'deletePost' : ActorMethod<[bigint], string>,
  'editPost' : ActorMethod<[bigint, string, string], string>,
  'getAllPosts' : ActorMethod<[], Array<Post>>,
  'getPostByID' : ActorMethod<[bigint], ManualReply_1>,
  'seeOwner' : ActorMethod<[], [] | [Principal]>,
}
