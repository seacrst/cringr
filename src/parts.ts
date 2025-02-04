export interface Post {
  chaos: {
    value: number
  },
  credits: {
    value: number
  },
  id: number
  character: string,
  content: string,
  hashTags: string,
  onLike: {
    chaos: {
      add: {
        min: number,
        max: number
      } | null, // мінмакс або пусто
      sub: {
        min: number,
        max: number
      } | null // мінмакс або пусто
    },
    credits: {
      add: {
        min: number,
        max: number
      } | null, // мінмакс або пусто
      sub: {
        min: number,
        max: number
      } | null // мінмакс або пусто
    },
    followers: {
      add: {
        min: number,
        max: number
      } | null, // мінмакс або пусто
      sub: {
        min: number,
        max: number
      } | null // мінмакс або пусто
    }
    сhaosGenCondition: number
  }
}