export const idlFactory = ({ IDL }) => {
  const Post = IDL.Record({
    'id' : IDL.Nat,
    'media' : IDL.Text,
    'content' : IDL.Text,
    'link' : IDL.Text,
  });
  const CreatePostResult = IDL.Variant({ 'ok' : Post, 'err' : IDL.Text });
  const QueryPostResult = IDL.Variant({ 'ok' : Post, 'err' : IDL.Text });
  return IDL.Service({
    'createPost' : IDL.Func(
        [IDL.Text, IDL.Text, IDL.Text],
        [CreatePostResult],
        [],
      ),
    'deletePost' : IDL.Func([IDL.Nat], [IDL.Text], []),
    'editPost' : IDL.Func(
        [IDL.Nat, IDL.Text, IDL.Text, IDL.Text],
        [IDL.Text],
        [],
      ),
    'getAllPosts' : IDL.Func([], [IDL.Vec(Post)], ['query']),
    'getPostByID' : IDL.Func([IDL.Nat], [QueryPostResult], ['query']),
    'seeOwner' : IDL.Func([], [IDL.Text], ['query']),
  });
};
export const init = ({ IDL }) => { return []; };
