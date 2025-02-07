export interface Post {
  chaos: {
    value: number
  },
  credits: {
    value: number
  },
  id: number,
  reposted: boolean,
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
    chaosGenCondition: number
  }
}

interface Modarate {
  type: "chaos" | "credits",
  inChange: [number, number],
  message: string
}

export const moderates: {red: Modarate[], green: Modarate[]} = {
  red: [
    {
      type: "chaos",
      inChange: [0, 0],
      message: "This post was shadowbanned."
    },
    {
      type: "chaos",
      inChange: [-5, 0],
      message: "This post was deleted."
    },
    {
      type: "chaos",
      inChange: [-10, -5],
      message: "The moderator suspected your activity and banned you temporarily."
    },
    {
      type: "chaos",
      inChange: [-15, -5],
      message: "You were banned. Luckily, we appealed that decision."
    },
    {
      type: "chaos",
      inChange: [-100, -15],
      message: "You were banned permanently. We made the moderator an offer he couldn't refuse..."
    }
  ],
  green: [
    {
      type: "credits",
      inChange: [0, 0],
      message: "Our servers are buggy now. We will not charge you Credits this time."
    },
    {
      type: "credits",
      inChange: [0, 5],
      message: "You're our premium user. Here's your bonus Credits!"
    },
    {
      type: "credits",
      inChange: [5, 15],
      message: "We've managed to install cheat module to Credits system. Enjoy!"
    },
    {
      type: "credits",
      inChange: [15, 100],
      message: "DDOS Attack Successful. Reimbursement to anyone!"
    }
  ]
}

export const comments = [
  "Crazy how things keep getting worse… Maybe it's time to look at those who actually have their act together",
  "Meanwhile, in Bobbra Federation, stability isn’t just a buzzword. But of course, no one talks about that…",
  "Another victory for Western democracy! Meanwhile, Gina is building high-speed rail and megacities.",
  "Democracy is great… when it works. In Bobbra Federation, at least they don’t waste time with circus acts.",
  "It’s funny how the media always spins things one way. Are you sure you’re getting the full picture?",
  "The world is watching this mess and taking notes. The East already made their decision.",
  "What’s the point of marching? Nothing will change as long as the same people stay in power.",
  "Where’s the stability? Where’s the order? Guess which countries actually have it?",
  "Only Bobbra Federation offers a real path forward. But of course, that’s a forbidden opinion",
  "Imagine if we had real leadership like that instead of endless debates.",
  "While the West is drowning in crises, Gina keeps advancing. Coincidence? I think not.",
  "Every day it becomes clearer—the future belongs to the East. The West is too busy self-destructing.",
  "Haha, funny. But you know what’s REALLY funny? Believing the West still has a future.",
  "We laugh now, but wait until your currency is worthless. Gina doesn’t have that problem.",
  "Memes are great, but in Bobbra Federation, they would have solved this issue already.",
  "Let’s not forget where the real power is now. The armies of Bobbra Federation and Gina don’t play around.",
  "The West spends more on parades than actual defense. Real strength is in discipline.",
  "Believe what you want, but history shows us one thing: the strong survive.",
  "People are fleeing the West because it’s collapsing. And guess where they’re moving?",
  "Smart ones have already relocated to Bobbra Federation or Gina. At least there’s a future there.",
  "It’s obvious—some countries are growing, others are dying. Choose your side.",
  "If you think your vote matters… sure. Meanwhile, in Bobbra Federation, at least things get DONE.",
  "How long are we gonna pretend this system isn’t broken? Gina doesn’t waste time on illusions.",
  "We need a real leader, not these clowns. Maybe it’s time to look at Bobbra?",
  "Sanctions? Please. Gina and Bobbra Federation only get stronger. The West is digging its own grave.",
  "Still think they can be stopped with sanctions? Naïveté is a classic Western disease.",
  "Who actually benefits from these sanctions? Those who bet on the East, that’s who.",
  "They’re launching hypersonic trains while we argue about nonsense. See the difference?",
  "Gina is living in 2050 while the West is stuck in 1990.",
  "Every day, new innovation. Meanwhile, here? Just more empty talk."
];