export function genPostIds(): number {
  return Math.floor(Math.random() * (10 - 5 + 1)) + 5;
}

export function genSlice<T>(arr: T[]): T[] {
  if (arr.length === 0) return [];

  const startIndex = Math.floor(Math.random() * arr.length); 
  const sliceLength = Math.floor(Math.random() * (10 - 5 + 1)) + 5; 
  const endIndex = startIndex + sliceLength;

  if (endIndex <= arr.length) {
      return arr.slice(startIndex, endIndex);
  } else {
      return [...arr.slice(startIndex), ...arr.slice(0, endIndex - arr.length)];
  }
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