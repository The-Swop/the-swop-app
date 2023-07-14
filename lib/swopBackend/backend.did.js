export const idlFactory = ({ IDL }) => {
  const Post = IDL.Record({
    'id' : IDL.Nat,
    'text' : IDL.Text,
    'photo' : IDL.Text,
  });
  const ManualReply = IDL.Variant({ 'ok' : Post, 'err' : IDL.Text });
  const ManualReply_1 = IDL.Variant({ 'ok' : Post, 'err' : IDL.Text });
  return IDL.Service({
    'createPost' : IDL.Func([IDL.Text, IDL.Text], [ManualReply], []),
    'deletePost' : IDL.Func([IDL.Nat], [IDL.Text], []),
    'editPost' : IDL.Func([IDL.Nat, IDL.Text, IDL.Text], [IDL.Text], []),
    'getAllPosts' : IDL.Func([], [IDL.Vec(Post)], ['query']),
    'getPostByID' : IDL.Func([IDL.Nat], [ManualReply_1], ['query']),
    'seeOwner' : IDL.Func([], [IDL.Opt(IDL.Principal)], ['query']),
  });
};
export const init = ({ IDL }) => { return []; };
