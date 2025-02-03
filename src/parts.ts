export interface Post {
  id: number
  "character": string,
  "post": string,
  "Chaos Gen Condition": number,
  "Like Chaos Change": number,
  "Like Credits Change": number,
  "Like Followers Change": number
}

// export interface Post {
//   id: number
//   character: string,
//   content: string,
//   tags: string,
//   onLike: {
//     chaos: {
//       add: {
//         min: number,
//         max: number
//       } | null, // мінмакс або пусто
//       sub: {
//         min: number,
//         max: number
//       } | null // мінмакс або пусто
//     },
//     credits: {
//       add: {
//         min: number,
//         max: number
//       } | null, // мінмакс або пусто
//       sub: {
//         min: number,
//         max: number
//       } | null // мінмакс або пусто
//     },
//     followers: {
//       add: {
//         min: number,
//         max: number
//       } | null, // мінмакс або пусто
//       sub: {
//         min: number,
//         max: number
//       } | null // мінмакс або пусто
//     }
//   }
// }