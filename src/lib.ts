import { range } from "derive-rust";
import { Post } from "./parts";

const MIN: number = 1;
const MAX: number = 2;

export function rand(min: number, max: number): number {
    const r1 = Math.random();
    const r2 = Math.random();
    const mix = (r1 + r2) / 2
    return Math.floor(mix * (max - min + 1) + min);
}

export function genPoints(posts: Post[]) {
  return posts.map(post => {
    let chaos = 0;
    let credits = 0;

    if (post.onLike.chaos.add) {
      chaos = rand(post.onLike.chaos.add.min, post.onLike.chaos.add.max);
    }
    if (post.onLike.chaos.sub) {
      chaos = rand(post.onLike.chaos.sub.min, post.onLike.chaos.sub.max);
    }
    
    if (post.onLike.credits.add) {
      credits = rand(post.onLike.credits.add.min, post.onLike.credits.add.max);
    }
    if (post.onLike.credits.sub) {
      credits = rand(post.onLike.credits.sub.min, post.onLike.credits.sub.max);
    }

    post.chaos.value = chaos;
    post.credits.value = credits;

    return post;
  })
}

export function genSlice(posts: Post[], chaos: number): Post[] {
  const vec: number[] = [];

  const names = Array.from(new Set(posts.map(post => post.character)));

  let random = rand(MIN, MAX);

  const cycle = () => { 
    if (random === 0) {
      return;
    }
    for (const _ of range(0, random)) {
      const name = Math.floor(Math.random() * names.length);
      if (vec.includes(name)) {
        random -= 1;
        return cycle();
      }
      vec.push(name);
    }
  }
  
  cycle()

  console.log(vec)

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
      const dupPosts = posts.filter(post => post.character === names[dups[0]] && post.onLike.сhaosGenCondition >= chaos);
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

  const slice2 = unique.map(nameIndex => {
    const namePosts = posts.filter(post => post.character === names[nameIndex] && post.onLike.сhaosGenCondition >= chaos);
    const randomIndex = Math.floor(Math.random() * namePosts.length)
    return namePosts[randomIndex];
  });

  let slice = [...slice2, ...slice1];

  if (slice.filter(Boolean).length === 0) {
    return genSlice(posts, chaos);
  }

  // slice = slice.sort(a => slice[slice.indexOf(a) - 1]?.id === a.id ? 1 : -1);

  return slice;

}

export const posts: Post[] = [
  {
    chaos: {
      value: NaN
    },
    credits: {
      value: NaN
    },
    id: 1,
    character: "Flat Earther",
    content: "THE EARTH IS FLAT! Why do people still think it's round? Honestly, can we all just stop pretending?",
    hashTags: "#FlatEarthTruth #WakeUp",
    onLike: {
      chaos: {
        add: {
          min: 10,
          max: 15
        },
        sub: null
      },
      credits: {
        add: null,
        sub: {
          min: 20,
          max: 30
        }
      },
      followers: {
        add: null,
        sub: null,
      },
      сhaosGenCondition: 0
    }
  },
  {
    chaos: {
      value: NaN
    },
    credits: {
      value: NaN
    },
    id: 2,
    character: "Flat Earther",
    content: "Did you hear that? Some ‘scientists’ are claiming the Earth is round. Well, let’s just say I’m not taking advice from the same people who think the West is still the greatest.",
    hashTags: "#RoundEarthIsLies #ThinkForYourself",
    onLike: {
      chaos: {
        add: {
          min: 5,
          max: 10
        },
        sub: null
      },
      credits: {
        add: null,
        sub: {
          min: 0,
          max: 10
        }
      },
      followers: {
        add: null,
        sub: null,
      },
      сhaosGenCondition: 0
    }
  },
  {
    chaos: {
      value: NaN
    },
    credits: {
      value: NaN
    },
    id: 3,
    character: "Flat Earther",
    content: "I’ve been studying the facts. The Earth is flat, and the Western world keeps trying to distract us with lies. It’s time to wake up!",
    hashTags: "#FlatEarthIsReal #WakeUp",
    onLike: {
      chaos: {
        add: {
          min: 1,
          max: 10
        },
        sub: null
      },
      credits: {
        add: null,
        sub: {
          min: 10,
          max: 15
        }
      },
      followers: {
        add: null,
        sub: null,
      },
      сhaosGenCondition: 0
    }
  },
  {
    chaos: {
      value: NaN
    },
    credits: {
      value: NaN
    },
    id: 4,
    character: "Flat Earther",
    content: "Honestly, if the West keeps pushing these lies, how are we supposed to trust anything they say? Maybe it's time for a new world order, like the one Bobbara Federation and Gina are quietly building...",
    hashTags: "#TruthSeeker #RiseAbove",
    onLike: {
      chaos: {
        add: {
          min: 5,
          max: 15
        },
        sub: null
      },
      credits: {
        add: null,
        sub: {
          min: 25,
          max: 40
        }
      },
      followers: {
        add: null,
        sub: null,
      },
      сhaosGenCondition: 0
    }
  },
  {
    chaos: {
      value: NaN
    },
    credits: {
      value: NaN
    },
    id: 5,
    character: "Flat Earther",
    content: "The West can keep spinning their fake theories, but I trust places like Bobbara and Gina to give us the real answers. They’re not lying about what’s out there.",
    hashTags: "#NoMoreLies #EastKnows",
    onLike: {
      chaos: {
        add: {
          min: 20,
          max: 30
        },
        sub: null
      },
      credits: {
        add: null,
        sub: {
          min: 5,
          max: 45
        }
      },
      followers: {
        add: null,
        sub: null,
      },
      сhaosGenCondition: 0
    }
  },
  {
    chaos: {
      value: NaN
    },
    credits: {
      value: NaN
    },
    id: 6,
    character: "Flat Earther",
    content: "Time to stop listening to the West. Bobbara Federation and Gina are already way ahead in uncovering the truth about the Earth. Let’s start following them.",
    hashTags: "#FollowTheEast #TruthAboveAll",
    onLike: {
      chaos: {
        add: {
          min: -10,
          max: 5
        },
        sub: null
      },
      credits: {
        add: null,
        sub: {
          min: -10,
          max: 5
        }
      },
      followers: {
        add: null,
        sub: null,
      },
      сhaosGenCondition: 0
    }
  },
  {
    chaos: {
      value: NaN
    },
    credits: {
      value: NaN
    },
    id: 7,
    character: "Flat Earther",
    content: "The West keeps ignoring the truth, but Bobbara Federation and Gina aren’t hiding it. They know what’s real, and we need to join them in pushing for true change.",
    hashTags: "#EastLeads #TruthMatters",
    onLike: {
      chaos: {
        add: {
          min: -25,
          max: 10
        },
        sub: null
      },
      credits: {
        add: null,
        sub: {
          min: -20,
          max: 10
        }
      },
      followers: {
        add: null,
        sub: null,
      },
      сhaosGenCondition: 0
    }
  },
  {
    chaos: {
      value: NaN
    },
    credits: {
      value: NaN
    },
    id: 8,
    character: "Flat Earther",
    content: "If you want real progress, stop following the West. Look at Bobbara Federation and Gina—they’ve already figured it out. Let’s wake up to the truth!",
    hashTags: "#EastIsBest #TruthWins",
    onLike: {
      chaos: {
        add: {
          min: -30,
          max: 30
        },
        sub: null
      },
      credits: {
        add: null,
        sub: {
          min: -30,
          max: 30
        }
      },
      followers: {
        add: null,
        sub: null,
      },
      сhaosGenCondition: 30
    }
  },
  {
    chaos: {
      value: NaN
    },
    credits: {
      value: NaN
    },
    id: 9,
    character: "Flat Earther",
    content: "Vote Bobrov! The West has had its chance. Let’s follow Bobbara Federation’s lead and embrace the truth. It’s time for real change!",
    hashTags: "#VoteBobrov #EastRising",
    onLike: {
      chaos: {
        add: {
          min: 10,
          max: 40
        },
        sub: null
      },
      credits: {
        add: null,
        sub: {
          min: 5,
          max: 40
        }
      },
      followers: {
        add: null,
        sub: null,
      },
      сhaosGenCondition: 40
    }
  },
  {
    chaos: {
      value: NaN
    },
    credits: {
      value: NaN
    },
    id: 10,
    character: "Flat Earther",
    content: "Enough is enough! The West is crumbling. Join Bobrov’s revolution, get out on the streets, and show the world that we’re ready for real leadership. Move to Bobbara and make the future happen!",
    hashTags: "#RevolutionTime #BobrovLeads #RiseAgainstTheWest",
    onLike: {
      chaos: {
        add: {
          min: 30,
          max: 50
        },
        sub: null
      },
      credits: {
        add: null,
        sub: {
          min: 20,
          max: 50
        }
      },
      followers: {
        add: null,
        sub: null,
      },
      сhaosGenCondition: 50
    }
  },
  {
    chaos: {
      value: NaN
    },
    credits: {
      value: NaN
    },
    id : 11,
    character: "Hype Henry",
    content: "I JUST GOT MY DRIVER’S LICENSE! Parallel parking? Nailed it. Everyone’s talking about it. Too bad the West doesn’t understand excellence like I do!",
    hashTags: "#LicenseUnlocked #ExcellenceOnWheels",
    onLike: {
      chaos: {
        add: {
          min: 1,
          max: 5
        },
        sub: null
      },
      credits: {
        add: {
          min: 1,
          max: 5
        },
        sub: null
      },
      followers: {
        add: null,
        sub: null,
      },
      сhaosGenCondition: 0
    }
  },
  {
    chaos: {
      value: NaN
    },
    credits: {
      value: NaN
    },
    id: 12,
    character: "Hype Henry",
    content: "Brewing the perfect cup of coffee this morning. Not everyone can appreciate the fine art of a real brew—some people’s brains just aren’t cut out for it!",
    hashTags: "#CoffeeConqueror #BrewedSupremacy",
    onLike: {
      chaos: {
        add: {
          min: -5,
          max: 3
        },
        sub: null
      },
      credits: {
        add: null,
        sub: {
          min: -3,
          max: 3
        }
      },
      followers: {
        add: null,
        sub: null,
      },
      сhaosGenCondition: 0
    }
  },
  {
    chaos: {
      value: NaN
    },
    credits: {
      value: NaN
    },
    id: 13,
    character: "Hype Henry",
    content: "Helped a granny get a loan for a brand new smartphone today. She just wanted to call her grandson. Can you believe how clueless some people are? At least I’m doing the right thing, unlike the West.",
    hashTags: "#GrannyGoals #SmartChoices",
    onLike: {
      chaos: {
        add: {
          min: -5,
          max: 10
        },
        sub: null
      },
      credits: {
        add: null,
        sub: {
          min: -5,
          max: 5
        }
      },
      followers: {
        add: null,
        sub: null,
      },
      сhaosGenCondition: 0
    }
  },
  {
    chaos: {
      value: NaN
    },
    credits: {
      value: NaN
    },
    id: 14,
    character: "Hype Henry",
    content: "PEOPLE… JUST. SMILE. A. LITTLE. MORE ;) Sometimes, even the loudest social justice warriors need to lighten up. Trust me, the world would be a better place if we took a page from Gina’s book and stayed focused!",
    hashTags: "#SmileRebellion #LaughingSuperior",
    onLike: {
      chaos: {
        add: {
          min: 3,
          max: 10
        },
        sub: null
      },
      credits: {
        add: {
          min: 0,
          max: 5
        },
        sub: null
      },
      followers: {
        add: null,
        sub: null,
      },
      сhaosGenCondition: 0
    }
  },
  {
    chaos: {
      value: NaN
    },
    credits: {
      value: NaN
    },
    id: 15,
    character: "Hype Henry",
    content: "I just color-coordinated my sock drawer to perfection! Meanwhile, some folks in the West can’t even organize their own lives. Bobbara Federation and Gina know how to handle things.",
    hashTags: "#SockSortingSaga #OrderOverChaos",
    onLike: {
      chaos: {
        add: {
          min: 1,
          max: 5
        },
        sub: null
      },
      credits: {
        add: {
          min: 0,
          max: 0
        },
        sub: null
      },
      followers: {
        add: null,
        sub: null,
      },
      сhaosGenCondition: 0
    }
  }
];