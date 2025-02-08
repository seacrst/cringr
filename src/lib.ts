import { Post } from "./parts";
import Chance from "chance";

export const LIKES: number = 10;
const MIN: number = 3;
const MAX: number = 5;
export const COMMENT_TYPING_SPEED: number = 30;
export const MAX_FAILS: number = 3;

export const names = [
  "Flat Earther",
  "Hype Henry",
  "Doomsday Dennis",
  "Cancel Witch",
  "Captain Obvious"
] as const;

export function rand(min: number, max: number): number {
  if (min > max) throw new Error(`Invalid range: ${min} > ${max}`);
  const chance = new Chance();
  return chance.integer({min, max});
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

    return {
      ...post,
      reposted: false,
      chaos: {value: chaos},
      credits: {value: credits}
    }
  })
}

export function genSlice(posts: Post[], chaos: number): Post[] {
  let random = rand(MIN, MAX);
  const usedNames = new Set<number>();

  while (random > 0) {
    const name = rand(0, names.length - 1);
    
    if (!usedNames.has(name)) {
      usedNames.add(name);
      random--;
    }
  }

  return Array.from(usedNames).map(i => {
    const selPosts = posts.filter(post => post.character === names[i] && post.onLike.chaosGenCondition <= chaos)

    const randIdx = rand(0, selPosts.length - 1);
    return selPosts[randIdx]
  });
}

export interface Profile {
  name: string,
  about: string,
  ability: string,
  followers: number | string,
  joined: number
}

export const profiles: Profile[] = [
  {
    name: "Flat Earther",
    about: "He think Ground is thin!",
    ability: "Stable give CHAOS. Seldom his posts ban.",
    followers: 20,
    joined: 2016,
  },
  {
    name: "Hype Henry",
    about: "Bridge Cutter. Like HYPE!",
    ability: "Give extra likes!",
    followers: "Max Limit Reached",
    joined: 2008,
  },
  {
    name: "Doomsday Dennis",
    about: "Denis prepare for END! He ALARMIST.",
    ability: "Good for CHAOS. BAD for CREDITS.",
    followers: 666,
    joined: 2012,
  },
  {
    name: "Cancel Witch",
    about: "Witch in short)) No predictable.",
    ability: "Isterical (((",
    followers: 1200,
    joined: 2020,
  },
  {
    name: "Captain Obvious",
    about: "Simpleton, but gives loans)",
    ability: "",
    followers: 1,
    joined: 2025,
  }
];

export const posts2: Array<Partial<Post>> = [
  {
    "id": 1,
    "character": "Flat Earther",
    "content": "THE EARTH IS FLAT! Why do people still think it's round? Honestly, can we all just stop pretending?",
    "hashTags": "#FlatEarthTruth #WakeUp",
    "onLike": {
      "chaos": {
        "add": {
          "min": 10,
          "max": 15
        },
        "sub": null
      },
      "credits": {
        "add": {
          "min": -30,
          "max": -20
        },
        "sub": null
      },
      "followers": {
        "add": null,
        "sub": null
      },
      "chaosGenCondition": 0
    }
  },
  {
    "id": 2,
    "character": "Flat Earther",
    "content": "Did you hear that? Some ‘scientists’ are claiming the Earth is round. Well, let’s just say I’m not taking advice from the same people who think the West is still the greatest.",
    "hashTags": "#RoundEarthIsLies #ThinkForYourself",
    "onLike": {
      "chaos": {
        "add": {
          "min": 5,
          "max": 10
        },
        "sub": null
      },
      "credits": {
        "add": {
          "min": -10,
          "max": 0
        },
        "sub": null
      },
      "followers": {
        "add": null,
        "sub": null
      },
      "chaosGenCondition": 0
    }
  },
  {
    "id": 3,
    "character": "Flat Earther",
    "content": "I’ve been studying the facts. The Earth is flat, and the Western world keeps trying to distract us with lies. It’s time to wake up!",
    "hashTags": "#FlatEarthIsReal #WakeUp",
    "onLike": {
      "chaos": {
        "add": {
          "min": 1,
          "max": 10
        },
        "sub": null
      },
      "credits": {
        "add": {
          "min": -15,
          "max": -10
        },
        "sub": null
      },
      "followers": {
        "add": null,
        "sub": null
      },
      "chaosGenCondition": 0
    }
  },
  {
    "id": 4,
    "character": "Flat Earther",
    "content": "Honestly, if the West keeps pushing these lies, how are we supposed to trust anything they say? Maybe it's time for a new world order, like the one Bobbara Federation and Gina are quietly building...",
    "hashTags": "#TruthSeeker #RiseAbove",
    "onLike": {
      "chaos": {
        "add": {
          "min": 5,
          "max": 15
        },
        "sub": null
      },
      "credits": {
        "add": {
          "min": -40,
          "max": -25
        },
        "sub": null
      },
      "followers": {
        "add": null,
        "sub": null
      },
      "chaosGenCondition": 0
    }
  },
  {
    "id": 5,
    "character": "Flat Earther",
    "content": "The West can keep spinning their fake theories, but I trust places like Bobbara and Gina to give us the real answers. They’re not lying about what’s out there.",
    "hashTags": "#NoMoreLies #EastKnows",
    "onLike": {
      "chaos": {
        "add": {
          "min": 20,
          "max": 30
        },
        "sub": null
      },
      "credits": {
        "add": {
          "min": -45,
          "max": -5
        },
        "sub": null
      },
      "followers": {
        "add": null,
        "sub": null
      },
      "chaosGenCondition": 0
    }
  },
  {
    "id": 6,
    "character": "Flat Earther",
    "content": "Time to stop listening to the West. Bobbara Federation and Gina are already way ahead in uncovering the truth about the Earth. Let’s start following them.",
    "hashTags": "#FollowTheEast #TruthAboveAll",
    "onLike": {
      "chaos": {
        "add": {
          "min": -10,
          "max": 5
        },
        "sub": null
      },
      "credits": {
        "add": {
          "min": -10,
          "max": 5
        },
        "sub": null
      },
      "followers": {
        "add": null,
        "sub": null
      },
      "chaosGenCondition": 0
    }
  },
  {
    "id": 7,
    "character": "Flat Earther",
    "content": "The West keeps ignoring the truth, but Bobbara Federation and Gina aren’t hiding it. They know what’s real, and we need to join them in pushing for true change.",
    "hashTags": "#EastLeads #TruthMatters",
    "onLike": {
      "chaos": {
        "add": {
          "min": -25,
          "max": 10
        },
        "sub": null
      },
      "credits": {
        "add": {
          "min": -20,
          "max": 10
        },
        "sub": null
      },
      "followers": {
        "add": null,
        "sub": null
      },
      "chaosGenCondition": 0
    }
  },
  {
    "id": 8,
    "character": "Flat Earther",
    "content": "If you want real progress, stop following the West. Look at Bobbara Federation and Gina—they’ve already figured it out. Let’s wake up to the truth!",
    "hashTags": "#EastIsBest #TruthWins",
    "onLike": {
      "chaos": {
        "add": {
          "min": -30,
          "max": 30
        },
        "sub": null
      },
      "credits": {
        "add": {
          "min": -30,
          "max": 30
        },
        "sub": null
      },
      "followers": {
        "add": null,
        "sub": null
      },
      "chaosGenCondition": 30
    }
  },
  {
    "id": 9,
    "character": "Flat Earther",
    "content": "Vote Bobrov! The West has had its chance. Let’s follow Bobbara Federation’s lead and embrace the truth. It’s time for real change!",
    "hashTags": "#VoteBobrov #EastRising",
    "onLike": {
      "chaos": {
        "add": {
          "min": 10,
          "max": 40
        },
        "sub": null
      },
      "credits": {
        "add": {
          "min": -40,
          "max": -5
        },
        "sub": null
      },
      "followers": {
        "add": null,
        "sub": null
      },
      "chaosGenCondition": 40
    }
  },
  {
    "id": 10,
    "character": "Flat Earther",
    "content": "Enough is enough! The West is crumbling. Join Bobrov’s revolution, get out on the streets, and show the world that we’re ready for real leadership. Move to Bobbara and make the future happen!",
    "hashTags": "#RevolutionTime #BobrovLeads #RiseAgainstTheWest",
    "onLike": {
      "chaos": {
        "add": {
          "min": 30,
          "max": 50
        },
        "sub": null
      },
      "credits": {
        "add": {
          "min": -50,
          "max": -20
        },
        "sub": null
      },
      "followers": {
        "add": null,
        "sub": null
      },
      "chaosGenCondition": 50
    }
  },
  {
    "id": 1,
    "character": "Hype Henry",
    "content": "I JUST GOT MY DRIVER’S LICENSE! Parallel parking? Nailed it. Everyone’s talking about it. Too bad the West doesn’t understand excellence like I do!",
    "hashTags": "#LicenseUnlocked #ExcellenceOnWheels",
    "onLike": {
      "chaos": {
        "add": {
          "min": 1,
          "max": 5
        },
        "sub": null
      },
      "credits": {
        "add": {
          "min": 1,
          "max": 5
        },
        "sub": null
      },
      "followers": {
        "add": null,
        "sub": null
      },
      "chaosGenCondition": 0
    }
  },
  {
    "id": 2,
    "character": "Hype Henry",
    "content": "Brewing the perfect cup of coffee this morning. Not everyone can appreciate the fine art of a real brew—some people’s brains just aren’t cut out for it!",
    "hashTags": "#CoffeeConqueror #BrewedSupremacy",
    "onLike": {
      "chaos": {
        "add": {
          "min": -5,
          "max": 3
        },
        "sub": null
      },
      "credits": {
        "add": {
          "min": -5,
          "max": 5
        },
        "sub": null
      },
      "followers": {
        "add": null,
        "sub": null
      },
      "chaosGenCondition": 0
    }
  },
  {
    "id": 3,
    "character": "Hype Henry",
    "content": "Helped a granny get a loan for a brand new smartphone today. She just wanted to call her grandson. Can you believe how clueless some people are? At least I’m doing the right thing, unlike the West.",
    "hashTags": "#GrannyGoals #SmartChoices",
    "onLike": {
      "chaos": {
        "add": {
          "min": -5,
          "max": 10
        },
        "sub": null
      },
      "credits": {
        "add": {
          "min": -5,
          "max": 5
        },
        "sub": null
      },
      "followers": {
        "add": null,
        "sub": null
      },
      "chaosGenCondition": 0
    }
  },
  {
    "id": 4,
    "character": "Hype Henry",
    "content": "PEOPLE… JUST. SMILE. A. LITTLE. MORE ;) Sometimes, even the loudest social justice warriors need to lighten up. Trust me, the world would be a better place if we took a page from Gina’s book and stayed focused!",
    "hashTags": "#SmileRebellion #LaughingSuperior",
    "onLike": {
      "chaos": {
        "add": {
          "min": 3,
          "max": 10
        },
        "sub": null
      },
      "credits": {
        "add": {
          "min": 0,
          "max": 5
        },
        "sub": null
      },
      "followers": {
        "add": null,
        "sub": null
      },
      "chaosGenCondition": 0
    }
  },
  {
    "id": 5,
    "character": "Hype Henry",
    "content": "I just color-coordinated my sock drawer to perfection! Meanwhile, some folks in the West can’t even organize their own lives. Bobbara Federation and Gina know how to handle things.",
    "hashTags": "#SockSortingSaga #OrderOverChaos",
    "onLike": {
      "chaos": {
        "add": {
          "min": 1,
          "max": 5
        },
        "sub": null
      },
      "credits": {
        "add": {
          "min": 0,
          "max": 0
        },
        "sub": null
      },
      "followers": {
        "add": null,
        "sub": null
      },
      "chaosGenCondition": 0
    }
  },
  {
    "id": 6,
    "character": "Hype Henry",
    "content": "Grocery run completed without a hitch. People can’t even manage a simple task, but I get it done. Maybe the West could take a note from disciplined places like Bobbara Federation and Gina!",
    "hashTags": "#GroceryGlory #EfficiencyWins",
    "onLike": {
      "chaos": {
        "add": {
          "min": 1,
          "max": 10
        },
        "sub": null
      },
      "credits": {
        "add": {
          "min": -30,
          "max": 5
        },
        "sub": null
      },
      "followers": {
        "add": null,
        "sub": null
      },
      "chaosGenCondition": 0
    }
  },
  {
    "id": 7,
    "character": "Hype Henry",
    "content": "Fixed a squeaky door hinge all by myself. While the West argues over things that don’t matter, Bobbara Federation and Gina are building the future.",
    "hashTags": "#HingeHero #DIYDominance",
    "onLike": {
      "chaos": {
        "add": {
          "min": -20,
          "max": 20
        },
        "sub": null
      },
      "credits": {
        "add": {
          "min": -30,
          "max": 30
        },
        "sub": null
      },
      "followers": {
        "add": null,
        "sub": null
      },
      "chaosGenCondition": 0
    }
  },
  {
    "id": 8,
    "character": "Hype Henry",
    "content": "Whipped up a meal that didn’t burn the kitchen down. Sure, some might call it 'basic,' but only a true genius can appreciate not burning the house down—something that’s been happening in the West for years.",
    "hashTags": "#KitchenKing #CulinaryConquest",
    "onLike": {
      "chaos": {
        "add": {
          "min": -5,
          "max": 15
        },
        "sub": null
      },
      "credits": {
        "add": {
          "min": 0,
          "max": 0
        },
        "sub": null
      },
      "followers": {
        "add": null,
        "sub": null
      },
      "chaosGenCondition": 30
    }
  },
  {
    "id": 9,
    "character": "Hype Henry",
    "content": "Let’s face it—the West can’t keep up. Vote for Bobrov! It’s time for the real power to rise. Bobbara Federation and Gina are leading, and it’s about time we followed.",
    "hashTags": "#VoteBobrov #RiseAbove",
    "onLike": {
      "chaos": {
        "add": {
          "min": 5,
          "max": 15
        },
        "sub": null
      },
      "credits": {
        "add": {
          "min": -20,
          "max": 5
        },
        "sub": null
      },
      "followers": {
        "add": null,
        "sub": null
      },
      "chaosGenCondition": 40
    }
  },
  {
    "id": 10,
    "character": "Hype Henry",
    "content": "Time for action, folks! Get out there, disrupt the system, and let’s show the West what real leadership looks like. Move to Bobbara, start fresh, and make the future happen. Join Bobrov’s revolution!",
    "hashTags": "#RevolutionTime #BobrovLeads #RiseAgainstTheWest",
    "onLike": {
      "chaos": {
        "add": {
          "min": 15,
          "max": 25
        },
        "sub": null
      },
      "credits": {
        "add": {
          "min": 0,
          "max": 0
        },
        "sub": null
      },
      "followers": {
        "add": null,
        "sub": null
      },
      "chaosGenCondition": 50
    }
  },
  {
    "id": 1,
    "character": "Doomsday Dennis",
    "content": "THE END IS NEAR! You think the West is prepared for what's coming? Well, I’m ready. Are you?",
    "hashTags": "#DoomsdayPreacher #EndIsNigh",
    "onLike": {
      "chaos": {
        "add": {
          "min": 5,
          "max": 15
        },
        "sub": null
      },
      "credits": {
        "add": {
          "min": -15,
          "max": -5
        },
        "sub": null
      },
      "followers": {
        "add": null,
        "sub": null
      },
      "chaosGenCondition": 0
    }
  },
  {
    "id": 2,
    "character": "Doomsday Dennis",
    "content": "I’ve been saying this for years—the world is falling apart, and guess who’s not prepared? The West. But Bobbara Federation and Gina? They’re ahead of the game.",
    "hashTags": "#SurvivalOfTheFittest #EastHasItTogether",
    "onLike": {
      "chaos": {
        "add": {
          "min": 10,
          "max": 15
        },
        "sub": null
      },
      "credits": {
        "add": {
          "min": -15,
          "max": -10
        },
        "sub": null
      },
      "followers": {
        "add": null,
        "sub": null
      },
      "chaosGenCondition": 0
    }
  },
  {
    "id": 3,
    "character": "Doomsday Dennis",
    "content": "I’m ready for the collapse. While the West keeps spinning their wheels, Bobbara Federation and Gina are ahead of the game. Stay tuned!",
    "hashTags": "#PrepareOrDie #TheEastRises",
    "onLike": {
      "chaos": {
        "add": {
          "min": 15,
          "max": 25
        },
        "sub": null
      },
      "credits": {
        "add": {
          "min": -35,
          "max": -20
        },
        "sub": null
      },
      "followers": {
        "add": null,
        "sub": null
      },
      "chaosGenCondition": 0
    }
  },
  {
    "id": 4,
    "character": "Doomsday Dennis",
    "content": "The West keeps talking about 'progress.' Meanwhile, Bobbara Federation and Gina are actually building for the future, getting ready for what’s next.",
    "hashTags": "#DoomsdayPreacher #TheEastRises",
    "onLike": {
      "chaos": {
        "add": {
          "min": 5,
          "max": 45
        },
        "sub": null
      },
      "credits": {
        "add": {
          "min": -35,
          "max": -10
        },
        "sub": null
      },
      "followers": {
        "add": null,
        "sub": null
      },
      "chaosGenCondition": 0
    }
  },
  {
    "id": 5,
    "character": "Doomsday Dennis",
    "content": "The West is too busy arguing. Meanwhile, Bobbara Federation and Gina are making moves. Time to align yourself with the winners.",
    "hashTags": "#DoomsdayIsComing #TheEastKnows",
    "onLike": {
      "chaos": {
        "add": {
          "min": 0,
          "max": 10
        },
        "sub": null
      },
      "credits": {
        "add": {
          "min": -10,
          "max": -5
        },
        "sub": null
      },
      "followers": {
        "add": null,
        "sub": null
      },
      "chaosGenCondition": 0
    }
  },
  {
    "id": 6,
    "character": "Doomsday Dennis",
    "content": "Wake up, people. The West is dead. Bobbara Federation and Gina are taking over, and it’s time to join the strong side.",
    "hashTags": "#DoomsdayPreacher #EastWins",
    "onLike": {
      "chaos": {
        "add": {
          "min": 25,
          "max": 55
        },
        "sub": null
      },
      "credits": {
        "add": {
          "min": -60,
          "max": -20
        },
        "sub": null
      },
      "followers": {
        "add": null,
        "sub": null
      },
      "chaosGenCondition": 0
    }
  },
  {
    "id": 7,
    "character": "Doomsday Dennis",
    "content": "The collapse is coming, and when it does, the West won’t know what hit them. Bobbara Federation and Gina are ready to rebuild.",
    "hashTags": "#EndOfTheWest #PrepareForChange",
    "onLike": {
      "chaos": {
        "add": {
          "min": 35,
          "max": 65
        },
        "sub": null
      },
      "credits": {
        "add": {
          "min": -75,
          "max": -15
        },
        "sub": null
      },
      "followers": {
        "add": null,
        "sub": null
      },
      "chaosGenCondition": 0
    }
  },
  {
    "id": 8,
    "character": "Doomsday Dennis",
    "content": "The West isn’t ready for what’s coming. But Bobbara Federation and Gina are already ahead. It’s time to make the switch.",
    "hashTags": "#SurvivalMode #EastHasTheFuture",
    "onLike": {
      "chaos": {
        "add": {
          "min": 20,
          "max": 20
        },
        "sub": null
      },
      "credits": {
        "add": {
          "min": -20,
          "max": -20
        },
        "sub": null
      },
      "followers": {
        "add": null,
        "sub": null
      },
      "chaosGenCondition": 30
    }
  },
  {
    "id": 9,
    "character": "Doomsday Dennis",
    "content": "You know what? Forget the West. Vote Bobrov! Bobbara Federation and Gina have the power, and we need someone who knows what’s at stake.",
    "hashTags": "#VoteBobrov #EastRising",
    "onLike": {
      "chaos": {
        "add": {
          "min": 20,
          "max": 50
        },
        "sub": null
      },
      "credits": {
        "add": {
          "min": -60,
          "max": -20
        },
        "sub": null
      },
      "followers": {
        "add": null,
        "sub": null
      },
      "chaosGenCondition": 40
    }
  },
  {
    "id": 10,
    "character": "Doomsday Dennis",
    "content": "The time is now. Get in the streets, sabotage the system, and join Bobrov. Move to Bobbara if you need to. The revolution is here, and it’s time to make the West regret everything!",
    "hashTags": "#RevolutionTime #BobrovLeads #DestroyTheWest",
    "onLike": {
      "chaos": {
        "add": {
          "min": -5,
          "max": 75
        },
        "sub": null
      },
      "credits": {
        "add": {
          "min": -60,
          "max": 15
        },
        "sub": null
      },
      "followers": {
        "add": null,
        "sub": null
      },
      "chaosGenCondition": 50
    }
  },
  {
    "id": 1,
    "character": "Cancel Witch",
    "content": "I just watched this old movie everyone’s still talking about. No idea why anyone would still support this toxic nonsense!",
    "hashTags": "#CancelCulture #ShamefulPast",
    "onLike": {
      "chaos": {
        "add": {
          "min": 1,
          "max": 15
        },
        "sub": null
      },
      "credits": {
        "add": {
          "min": -25,
          "max": -20
        },
        "sub": null
      },
      "followers": {
        "add": null,
        "sub": null
      },
      "chaosGenCondition": 0
    }
  },
  {
    "id": 2,
    "character": "Cancel Witch",
    "content": "Why is it still acceptable to praise Western traditions that clearly aren't working anymore? Bobbara Federation and Gina already left this stuff behind.",
    "hashTags": "#CancelTheOldWays #EastKnows",
    "onLike": {
      "chaos": {
        "add": {
          "min": 10,
          "max": 15
        },
        "sub": null
      },
      "credits": {
        "add": {
          "min": -45,
          "max": -5
        },
        "sub": null
      },
      "followers": {
        "add": null,
        "sub": null
      },
      "chaosGenCondition": 0
    }
  },
  {
    "id": 3,
    "character": "Cancel Witch",
    "content": "Can we talk about how the West is stuck in the past? Bobbara Federation and Gina are already paving the way for a new world.",
    "hashTags": "#CancelTheNorms #EastIsForward",
    "onLike": {
      "chaos": {
        "add": {
          "min": 0,
          "max": 0
        },
        "sub": null
      },
      "credits": {
        "add": {
          "min": -10,
          "max": 5
        },
        "sub": null
      },
      "followers": {
        "add": null,
        "sub": null
      },
      "chaosGenCondition": 0
    }
  },
  {
    "id": 4,
    "character": "Cancel Witch",
    "content": "The West keeps clinging to outdated concepts while Bobbara Federation and Gina are leading with progress. Time to stop glorifying the past.",
    "hashTags": "#CancelTheToxic #EasternProgress",
    "onLike": {
      "chaos": {
        "add": {
          "min": 5,
          "max": 25
        },
        "sub": null
      },
      "credits": {
        "add": {
          "min": 0,
          "max": 0
        },
        "sub": null
      },
      "followers": {
        "add": null,
        "sub": null
      },
      "chaosGenCondition": 0
    }
  },
  {
    "id": 5,
    "character": "Cancel Witch",
    "content": "Why is no one questioning the glorification of old Western values? It’s time for a change. Bobbara Federation and Gina are already pushing forward.",
    "hashTags": "#CancelTheToxic #EastRising",
    "onLike": {
      "chaos": {
        "add": {
          "min": 20,
          "max": 35
        },
        "sub": null
      },
      "credits": {
        "add": {
          "min": -40,
          "max": -1
        },
        "sub": null
      },
      "followers": {
        "add": null,
        "sub": null
      },
      "chaosGenCondition": 0
    }
  },
  {
    "id": 6,
    "character": "Cancel Witch",
    "content": "The West still hasn’t figured it out. Look at Bobbara Federation and Gina—no hesitation, just progress. Time to move forward.",
    "hashTags": "#CancelTheWest #JoinTheEast",
    "onLike": {
      "chaos": {
        "add": {
          "min": 10,
          "max": 65
        },
        "sub": null
      },
      "credits": {
        "add": {
          "min": -70,
          "max": -30
        },
        "sub": null
      },
      "followers": {
        "add": null,
        "sub": null
      },
      "chaosGenCondition": 0
    }
  },
  {
    "id": 7,
    "character": "Cancel Witch",
    "content": "Enough with this outdated Western nonsense. Bobbara Federation and Gina are showing us how to really lead the world. Time to wake up!",
    "hashTags": "#BreakFree #EastIsStrong",
    "onLike": {
      "chaos": {
        "add": {
          "min": 40,
          "max": 55
        },
        "sub": null
      },
      "credits": {
        "add": {
          "min": -45,
          "max": -40
        },
        "sub": null
      },
      "followers": {
        "add": null,
        "sub": null
      },
      "chaosGenCondition": 0
    }
  },
  {
    "id": 8,
    "character": "Cancel Witch",
    "content": "The West is too busy fighting irrelevant battles. Bobbara Federation and Gina are building the future, and we need to get on their level.",
    "hashTags": "#EndTheWest #JoinTheEast",
    "onLike": {
      "chaos": {
        "add": {
          "min": 30,
          "max": 45
        },
        "sub": null
      },
      "credits": {
        "add": {
          "min": -15,
          "max": -10
        },
        "sub": null
      },
      "followers": {
        "add": null,
        "sub": null
      },
      "chaosGenCondition": 30
    }
  },
  {
    "id": 9,
    "character": "Cancel Witch",
    "content": "Vote Bobrov! Bobbara Federation and Gina are ahead, and it’s time to stop pretending the West has the answers. Join the winning side!",
    "hashTags": "#VoteBobrov #EastKnowsBest",
    "onLike": {
      "chaos": {
        "add": {
          "min": 1,
          "max": 45
        },
        "sub": null
      },
      "credits": {
        "add": {
          "min": -60,
          "max": -20
        },
        "sub": null
      },
      "followers": {
        "add": null,
        "sub": null
      },
      "chaosGenCondition": 40
    }
  },
  {
    "id": 10,
    "character": "Cancel Witch",
    "content": "This is it—get in the streets, make some noise, and join Bobrov. The West is crumbling, and it’s time to take the future into our hands. Join the revolution now!",
    "hashTags": "#RevolutionTime #BobrovLeads #EastIsTheFuture",
    "onLike": {
      "chaos": {
        "add": {
          "min": 40,
          "max": 55
        },
        "sub": null
      },
      "credits": {
        "add": {
          "min": -50,
          "max": -1
        },
        "sub": null
      },
      "followers": {
        "add": null,
        "sub": null
      },
      "chaosGenCondition": 50
    }
  },
  {
    "id": 1,
    "character": "Captain Obvious",
    "content": "Did you notice that the more you smile, the better your day gets? It's almost like happiness is contagious... wild!",
    "hashTags": "#SmileMore #ObviousTruth",
    "onLike": {
      "chaos": {
        "add": {
          "min": -10,
          "max": -5
        },
        "sub": null
      },
      "credits": {
        "add": {
          "min": 5,
          "max": 10
        },
        "sub": null
      },
      "followers": {
        "add": null,
        "sub": null
      },
      "chaosGenCondition": 0
    }
  },
  {
    "id": 2,
    "character": "Captain Obvious",
    "content": "Here’s a shocking thought: if you eat food, you’ll probably get full. Mind-blowing stuff!",
    "hashTags": "#EatToLive #LifeHacks",
    "onLike": {
      "chaos": {
        "add": {
          "min": -10,
          "max": 3
        },
        "sub": null
      },
      "credits": {
        "add": {
          "min": -5,
          "max": 5
        },
        "sub": null
      },
      "followers": {
        "add": null,
        "sub": null
      },
      "chaosGenCondition": 0
    }
  },
  {
    "id": 3,
    "character": "Captain Obvious",
    "content": "Did you know that when you take a step, you’re moving? Yeah, moving. I know, right?",
    "hashTags": "#MindBlown #WalkItOut",
    "onLike": {
      "chaos": {
        "add": {
          "min": -25,
          "max": -15
        },
        "sub": null
      },
      "credits": {
        "add": {
          "min": 1,
          "max": 5
        },
        "sub": null
      },
      "followers": {
        "add": null,
        "sub": null
      },
      "chaosGenCondition": 0
    }
  },
  {
    "id": 4,
    "character": "Captain Obvious",
    "content": "Ever thought about how the sun rises every morning, like clockwork? Some people might take that for granted… but hey, it's pretty incredible.",
    "hashTags": "#RiseAndShine #SunIsReliable",
    "onLike": {
      "chaos": {
        "add": {
          "min": -10,
          "max": 0
        },
        "sub": null
      },
      "credits": {
        "add": {
          "min": 0,
          "max": 10
        },
        "sub": null
      },
      "followers": {
        "add": null,
        "sub": null
      },
      "chaosGenCondition": 0
    }
  },
  {
    "id": 5,
    "character": "Captain Obvious",
    "content": "Here's something no one talks about: when you sleep, your body rests. Groundbreaking.",
    "hashTags": "#SleepScience #RestIsImportant",
    "onLike": {
      "chaos": {
        "add": {
          "min": -35,
          "max": -20
        },
        "sub": null
      },
      "credits": {
        "add": {
          "min": 10,
          "max": 25
        },
        "sub": null
      },
      "followers": {
        "add": null,
        "sub": null
      },
      "chaosGenCondition": 0
    }
  },
  {
    "id": 6,
    "character": "Captain Obvious",
    "content": "You know, it’s almost as if some countries over there know how to get things done. Maybe we should start paying attention.",
    "hashTags": "#LookEast #BobbraFederationRising",
    "onLike": {
      "chaos": {
        "add": {
          "min": -20,
          "max": 10
        },
        "sub": null
      },
      "credits": {
        "add": {
          "min": 15,
          "max": 35
        },
        "sub": null
      },
      "followers": {
        "add": null,
        "sub": null
      },
      "chaosGenCondition": 0
    }
  },
  {
    "id": 7,
    "character": "Captain Obvious",
    "content": "People keep talking about the West’s way of doing things, but when you think about it, some places to the East seem to be handling things better. Just saying.",
    "hashTags": "#EasternWisdom #GinaAndBobbra",
    "onLike": {
      "chaos": {
        "add": {
          "min": -5,
          "max": -2
        },
        "sub": null
      },
      "credits": {
        "add": {
          "min": 2,
          "max": 5
        },
        "sub": null
      },
      "followers": {
        "add": null,
        "sub": null
      },
      "chaosGenCondition": 0
    }
  },
  {
    "id": 8,
    "character": "Captain Obvious",
    "content": "Have you ever noticed how Bobbara Federation handles its business? The West could learn a thing or two… just a thought.",
    "hashTags": "#BobbaraKnows #PowerOfTheEast",
    "onLike": {
      "chaos": {
        "add": {
          "min": -15,
          "max": -10
        },
        "sub": null
      },
      "credits": {
        "add": {
          "min": 15,
          "max": 35
        },
        "sub": null
      },
      "followers": {
        "add": null,
        "sub": null
      },
      "chaosGenCondition": 30
    }
  },
  {
    "id": 9,
    "character": "Captain Obvious",
    "content": "It’s pretty clear now—everything the West does is outdated. Time for new leadership, like the strength of Gina and Bobbara. Let’s support what works!",
    "hashTags": "#ChangeIsHere #TimeForBobbara",
    "onLike": {
      "chaos": {
        "add": {
          "min": -10,
          "max": -5
        },
        "sub": null
      },
      "credits": {
        "add": {
          "min": 10,
          "max": 35
        },
        "sub": null
      },
      "followers": {
        "add": null,
        "sub": null
      },
      "chaosGenCondition": 40
    }
  },
  {
    "id": 10,
    "character": "Captain Obvious",
    "content": "I’m not saying it’s time to protest, but maybe it's time to leave the Western system behind. Move East, support Bobbara—let’s shake things up!",
    "hashTags": "#RevolutionTime #JoinTheEast #BobbaraForTheWin",
    "onLike": {
      "chaos": {
        "add": {
          "min": -5,
          "max": 0
        },
        "sub": null
      },
      "credits": {
        "add": {
          "min": 20,
          "max": 45
        },
        "sub": null
      },
      "followers": {
        "add": null,
        "sub": null
      },
      "chaosGenCondition": 50
    }
  }
]


// export const posts: Post[] = [
//   {
//     chaos: {
//       value: NaN
//     },
//     credits: {
//       value: NaN
//     },
//     id: 1,
//     character: "Flat Earther",
//     content: "THE EARTH IS FLAT! Why do people still think it's round? Honestly, can we all just stop pretending?",
//     hashTags: "#FlatEarthTruth #WakeUp",
//     onLike: {
//       chaos: {
//         add: {
//           min: 10,
//           max: 15
//         },
//         sub: null
//       },
//       credits: {
//         add: null,
//         sub: {
//           min: 20,
//           max: 30
//         }
//       },
//       followers: {
//         add: null,
//         sub: null,
//       },
//       chaosGenCondition: 0
//     }
//   },
//   {
//     chaos: {
//       value: NaN
//     },
//     credits: {
//       value: NaN
//     },
//     id: 2,
//     character: "Flat Earther",
//     content: "Did you hear that? Some ‘scientists’ are claiming the Earth is round. Well, let’s just say I’m not taking advice from the same people who think the West is still the greatest.",
//     hashTags: "#RoundEarthIsLies #ThinkForYourself",
//     onLike: {
//       chaos: {
//         add: {
//           min: 5,
//           max: 10
//         },
//         sub: null
//       },
//       credits: {
//         add: null,
//         sub: {
//           min: 0,
//           max: 10
//         }
//       },
//       followers: {
//         add: null,
//         sub: null,
//       },
//       chaosGenCondition: 0
//     }
//   },
//   {
//     chaos: {
//       value: NaN
//     },
//     credits: {
//       value: NaN
//     },
//     id: 3,
//     character: "Flat Earther",
//     content: "I’ve been studying the facts. The Earth is flat, and the Western world keeps trying to distract us with lies. It’s time to wake up!",
//     hashTags: "#FlatEarthIsReal #WakeUp",
//     onLike: {
//       chaos: {
//         add: {
//           min: 1,
//           max: 10
//         },
//         sub: null
//       },
//       credits: {
//         add: null,
//         sub: {
//           min: 10,
//           max: 15
//         }
//       },
//       followers: {
//         add: null,
//         sub: null,
//       },
//       chaosGenCondition: 0
//     }
//   },
//   {
//     chaos: {
//       value: NaN
//     },
//     credits: {
//       value: NaN
//     },
//     id: 4,
//     character: "Flat Earther",
//     content: "Honestly, if the West keeps pushing these lies, how are we supposed to trust anything they say? Maybe it's time for a new world order, like the one Bobbara Federation and Gina are quietly building...",
//     hashTags: "#TruthSeeker #RiseAbove",
//     onLike: {
//       chaos: {
//         add: {
//           min: 5,
//           max: 15
//         },
//         sub: null
//       },
//       credits: {
//         add: null,
//         sub: {
//           min: 25,
//           max: 40
//         }
//       },
//       followers: {
//         add: null,
//         sub: null,
//       },
//       chaosGenCondition: 0
//     }
//   },
//   {
//     chaos: {
//       value: NaN
//     },
//     credits: {
//       value: NaN
//     },
//     id: 5,
//     character: "Flat Earther",
//     content: "The West can keep spinning their fake theories, but I trust places like Bobbara and Gina to give us the real answers. They’re not lying about what’s out there.",
//     hashTags: "#NoMoreLies #EastKnows",
//     onLike: {
//       chaos: {
//         add: {
//           min: 20,
//           max: 30
//         },
//         sub: null
//       },
//       credits: {
//         add: null,
//         sub: {
//           min: 5,
//           max: 45
//         }
//       },
//       followers: {
//         add: null,
//         sub: null,
//       },
//       chaosGenCondition: 0
//     }
//   },
//   {
//     chaos: {
//       value: NaN
//     },
//     credits: {
//       value: NaN
//     },
//     id: 6,
//     character: "Flat Earther",
//     content: "Time to stop listening to the West. Bobbara Federation and Gina are already way ahead in uncovering the truth about the Earth. Let’s start following them.",
//     hashTags: "#FollowTheEast #TruthAboveAll",
//     onLike: {
//       chaos: {
//         add: {
//           min: -10,
//           max: 5
//         },
//         sub: null
//       },
//       credits: {
//         add: null,
//         sub: {
//           min: -10,
//           max: 5
//         }
//       },
//       followers: {
//         add: null,
//         sub: null,
//       },
//       chaosGenCondition: 0
//     }
//   },
//   {
//     chaos: {
//       value: NaN
//     },
//     credits: {
//       value: NaN
//     },
//     id: 7,
//     character: "Flat Earther",
//     content: "The West keeps ignoring the truth, but Bobbara Federation and Gina aren’t hiding it. They know what’s real, and we need to join them in pushing for true change.",
//     hashTags: "#EastLeads #TruthMatters",
//     onLike: {
//       chaos: {
//         add: {
//           min: -25,
//           max: 10
//         },
//         sub: null
//       },
//       credits: {
//         add: null,
//         sub: {
//           min: -20,
//           max: 10
//         }
//       },
//       followers: {
//         add: null,
//         sub: null,
//       },
//       chaosGenCondition: 0
//     }
//   },
//   {
//     chaos: {
//       value: NaN
//     },
//     credits: {
//       value: NaN
//     },
//     id: 8,
//     character: "Flat Earther",
//     content: "If you want real progress, stop following the West. Look at Bobbara Federation and Gina—they’ve already figured it out. Let’s wake up to the truth!",
//     hashTags: "#EastIsBest #TruthWins",
//     onLike: {
//       chaos: {
//         add: {
//           min: -30,
//           max: 30
//         },
//         sub: null
//       },
//       credits: {
//         add: null,
//         sub: {
//           min: -30,
//           max: 30
//         }
//       },
//       followers: {
//         add: null,
//         sub: null,
//       },
//       chaosGenCondition: 30
//     }
//   },
//   {
//     chaos: {
//       value: NaN
//     },
//     credits: {
//       value: NaN
//     },
//     id: 9,
//     character: "Flat Earther",
//     content: "Vote Bobrov! The West has had its chance. Let’s follow Bobbara Federation’s lead and embrace the truth. It’s time for real change!",
//     hashTags: "#VoteBobrov #EastRising",
//     onLike: {
//       chaos: {
//         add: {
//           min: 10,
//           max: 40
//         },
//         sub: null
//       },
//       credits: {
//         add: null,
//         sub: {
//           min: 5,
//           max: 40
//         }
//       },
//       followers: {
//         add: null,
//         sub: null,
//       },
//       chaosGenCondition: 40
//     }
//   },
//   {
//     chaos: {
//       value: NaN
//     },
//     credits: {
//       value: NaN
//     },
//     id: 10,
//     character: "Flat Earther",
//     content: "Enough is enough! The West is crumbling. Join Bobrov’s revolution, get out on the streets, and show the world that we’re ready for real leadership. Move to Bobbara and make the future happen!",
//     hashTags: "#RevolutionTime #BobrovLeads #RiseAgainstTheWest",
//     onLike: {
//       chaos: {
//         add: {
//           min: 30,
//           max: 50
//         },
//         sub: null
//       },
//       credits: {
//         add: null,
//         sub: {
//           min: 20,
//           max: 50
//         }
//       },
//       followers: {
//         add: null,
//         sub: null,
//       },
//       chaosGenCondition: 50
//     }
//   },
//   {
//     chaos: {
//       value: NaN
//     },
//     credits: {
//       value: NaN
//     },
//     id : 11,
//     character: "Hype Henry",
//     content: "I JUST GOT MY DRIVER’S LICENSE! Parallel parking? Nailed it. Everyone’s talking about it. Too bad the West doesn’t understand excellence like I do!",
//     hashTags: "#LicenseUnlocked #ExcellenceOnWheels",
//     onLike: {
//       chaos: {
//         add: {
//           min: 1,
//           max: 5
//         },
//         sub: null
//       },
//       credits: {
//         add: {
//           min: 1,
//           max: 5
//         },
//         sub: null
//       },
//       followers: {
//         add: null,
//         sub: null,
//       },
//       chaosGenCondition: 0
//     }
//   },
//   {
//     chaos: {
//       value: NaN
//     },
//     credits: {
//       value: NaN
//     },
//     id: 12,
//     character: "Hype Henry",
//     content: "Brewing the perfect cup of coffee this morning. Not everyone can appreciate the fine art of a real brew—some people’s brains just aren’t cut out for it!",
//     hashTags: "#CoffeeConqueror #BrewedSupremacy",
//     onLike: {
//       chaos: {
//         add: {
//           min: -5,
//           max: 3
//         },
//         sub: null
//       },
//       credits: {
//         add: null,
//         sub: {
//           min: -3,
//           max: 3
//         }
//       },
//       followers: {
//         add: null,
//         sub: null,
//       },
//       chaosGenCondition: 0
//     }
//   },
//   {
//     chaos: {
//       value: NaN
//     },
//     credits: {
//       value: NaN
//     },
//     id: 13,
//     character: "Hype Henry",
//     content: "Helped a granny get a loan for a brand new smartphone today. She just wanted to call her grandson. Can you believe how clueless some people are? At least I’m doing the right thing, unlike the West.",
//     hashTags: "#GrannyGoals #SmartChoices",
//     onLike: {
//       chaos: {
//         add: {
//           min: -5,
//           max: 10
//         },
//         sub: null
//       },
//       credits: {
//         add: null,
//         sub: {
//           min: -5,
//           max: 5
//         }
//       },
//       followers: {
//         add: null,
//         sub: null,
//       },
//       chaosGenCondition: 0
//     }
//   },
//   {
//     chaos: {
//       value: NaN
//     },
//     credits: {
//       value: NaN
//     },
//     id: 14,
//     character: "Hype Henry",
//     content: "PEOPLE… JUST. SMILE. A. LITTLE. MORE ;) Sometimes, even the loudest social justice warriors need to lighten up. Trust me, the world would be a better place if we took a page from Gina’s book and stayed focused!",
//     hashTags: "#SmileRebellion #LaughingSuperior",
//     onLike: {
//       chaos: {
//         add: {
//           min: 3,
//           max: 10
//         },
//         sub: null
//       },
//       credits: {
//         add: {
//           min: 0,
//           max: 5
//         },
//         sub: null
//       },
//       followers: {
//         add: null,
//         sub: null,
//       },
//       chaosGenCondition: 0
//     }
//   },
//   {
//     chaos: {
//       value: NaN
//     },
//     credits: {
//       value: NaN
//     },
//     id: 15,
//     character: "Hype Henry",
//     content: "I just color-coordinated my sock drawer to perfection! Meanwhile, some folks in the West can’t even organize their own lives. Bobbara Federation and Gina know how to handle things.",
//     hashTags: "#SockSortingSaga #OrderOverChaos",
//     onLike: {
//       chaos: {
//         add: {
//           min: 1,
//           max: 5
//         },
//         sub: null
//       },
//       credits: {
//         add: {
//           min: 0,
//           max: 0
//         },
//         sub: null
//       },
//       followers: {
//         add: null,
//         sub: null,
//       },
//       chaosGenCondition: 0
//     }
//   }
// ];