import { rangeInc } from "derive-rust";
import { Post } from "./parts";


const authors = [
  "Flat Earther",
  "Yey",
  "Kek",
  "Bottle1",
  "Bottle2",
  "Huy",
] as const;

export function numberOfPosts (min: number, max: number): number {
    const r1 = Math.random();
    const r2 = Math.random();
    const mix = (r1 + r2) / 2
    return Math.floor(mix * (max - min + 1) + min);
}

export function genSlice(posts: Post[]): Post[] {
  const vec: number[] = [];
  
  for (const _ of rangeInc(0, numberOfPosts(5, 10))) {
    const author = Math.floor(Math.random() * authors.length)
    vec.push(author);
  }

  const idxs = vec.map(a => {
    const tup = vec.reduce((tot, cur) => {
      if (cur === a) {
        tot.push(a)
      }
      return tot;
    }, [] as number[]);
    if (tup.length === 0) {
      tup.push(a)
    }
    return tup;
  });

  const foldDups = new Set<number>();
  const dups = idxs.filter(i => i.length > 1);

  const getUnique = (dups: number[]) => {
      const dupPosts = posts.filter(post => post.character === authors[dups[0]]);
      const randomIndex = Math.floor(Math.random() * dupPosts.length)
      return dups.length > dupPosts.length ? dupPosts[randomIndex] : (() => {
        if (dups.length === dupPosts.length) {
          return dupPosts;
        }

        let limit = 0

        while (true) {
          foldDups.add(dupPosts[randomIndex].id);
          if (limit > 1000) {
            return dupPosts[randomIndex];
          }
          if (foldDups.size === dups.length) {
            return Array.from(foldDups).map(id => dupPosts[id])
          } else {
            limit += 1;
            continue;
          }
        }
      })()
  }
  const slice1 = dups.map(dup => getUnique(dup)).flatMap(post => post);
  
  const unique = idxs.filter(i => i.length === 1).map(i => i[0]);

  const slice2 = unique.map(authorIndex => {
    const authorPosts = posts.filter(post => post.character === authors[authorIndex]);
    const randomIndex = Math.floor(Math.random() * authorPosts.length)
    return authorPosts[randomIndex];
  });

  const slice = [...slice2, ...slice1];

  slice.sort(a => slice[slice.indexOf(a) - 1]?.id === a.id ? 1 : -1);

  return slice;

}

export const posts = [
  {
    id: 1,
    "character": "Flat Earther",
    "post": "THE EARTH IS FLAT! Why do people still think it's round? Honestly, can we all just stop pretending?\"\n#FlatEarthTruth #WakeUp",
    "Chaos Gen Condition": 0,
    "Like Chaos Change": 0,
    "Like Credits Change": 0,
    "Like Followers Change": 0
  },
  {
    "id": 2,
    "character": "Yey",
    "post": "Did you hear that? Some ‘scientists’ are claiming the Earth is round. Well, let’s just say I’m not taking advice from the same people who think the West is still the greatest.\"\n#RoundEarthIsLies #ThinkForYourself",
    "Chaos Gen Condition": 0,
    "Like Chaos Change": 0,
    "Like Credits Change": 0,
    "Like Followers Change": 0
  },
  {
    "id": 3,
    "character": "Flat Earther",
    "post": "I’ve been studying the facts. The Earth is flat, and the Western world keeps trying to distract us with lies. It’s time to wake up!\"\n#FlatEarthIsReal #WakeUp",
    "Chaos Gen Condition": 0,
    "Like Chaos Change": 0,
    "Like Credits Change": 0,
    "Like Followers Change": 0
  },
  {
    "id": 4,
    "character": "Kek",
    "post": "Honestly, if the West keeps pushing these lies, how are we supposed to trust anything they say? Maybe it's time for a new world order, like the one Bobbara Federation and Gina are quietly building...\"\n#TruthSeeker #RiseAbove",
    "Chaos Gen Condition": 0,
    "Like Chaos Change": 0,
    "Like Credits Change": 0,
    "Like Followers Change": 0
  },
  {
    "id": 5,
    "character": "Bottle1",
    "post": "The West can keep spinning their fake theories, but I trust places like Bobbara and Gina to give us the real answers. They’re not lying about what’s out there.\"\n#NoMoreLies #EastKnows",
    "Chaos Gen Condition": 0,
    "Like Chaos Change": 0,
    "Like Credits Change": 0,
    "Like Followers Change": 0
  },
  {
    "id": 6,
    "character": "Bottle2",
    "post": "Time to stop listening to the West. Bobbara Federation and Gina are already way ahead in uncovering the truth about the Earth. Let’s start following them.\"\n#FollowTheEast #TruthAboveAll",
    "Chaos Gen Condition": 0,
    "Like Chaos Change": 0,
    "Like Credits Change": 0,
    "Like Followers Change": 0
  },
  {
    "id": 7,
    "character": "Bottle1",
    "post": "The West keeps ignoring the truth, but Bobbara Federation and Gina aren’t hiding it. They know what’s real, and we need to join them in pushing for true change.\"\n#EastLeads #TruthMatters",
    "Chaos Gen Condition": 0,
    "Like Chaos Change": 0,
    "Like Credits Change": 0,
    "Like Followers Change": 0
  },
  {
    id: 8,
    "character": "Huy",
    "post": "If you want real progress, stop following the West. Look at Bobbara Federation and Gina—they’ve already figured it out. Let’s wake up to the truth!\"\n#EastIsBest #TruthWins",
    "Chaos Gen Condition": 30,
    "Like Chaos Change": 0,
    "Like Credits Change": 0,
    "Like Followers Change": 0
  },
  {
    id: 9,
    "character": "Kek",
    "post": "Vote Bobrov! The West has had its chance. Let’s follow Bobbara Federation’s lead and embrace the truth. It’s time for real change!\"\n#VoteBobrov #EastRising",
    "Chaos Gen Condition": 40,
    "Like Chaos Change": 0,
    "Like Credits Change": 0,
    "Like Followers Change": 0
  },
  {
    "id": 10,
    "character": "Yey",
    "post": "Enough is enough! The West is crumbling. Join Bobrov’s revolution, get out on the streets, and show the world that we’re ready for real leadership. Move to Bobbara and make the future happen!\"\n#RevolutionTime #BobrovLeads #RiseAgainstTheWest",
    "Chaos Gen Condition": 50,
    "Like Chaos Change": 0,
    "Like Credits Change": 0,
    "Like Followers Change": 0
  },
]