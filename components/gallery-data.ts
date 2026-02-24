// components/gallery-data.ts

export type GalleryPhoto = {
  src: string;
  title: string;
  description: string;
};

export type Gallery = {
  id: string;
  title: string;
  overview: string;
  photos: GalleryPhoto[];
};

export const GALLERIES: Gallery[] = [
  {
    id: "scioly",
    title: "Science Olympiad",
    overview:
      "Science Olympiad was the first major club that I joined on campus and was the most impactful thing I did during high school. I competed in the events: Chem Lab, Disease Detectives, Microbiology, Anatomy&Physiology, and many more. While the amount I learned was exponential to the knowledge I gained during class, it was the connections and like-minded individuals that I was blessed to be around and enjoy learning together.",
    photos: [
      {src: "/gallery/scioly/trophiesme.jpg",title: "medal spread", description: "One of the last comps of my scioly career, peak time"},
      {src: "/gallery/scioly/20240203_173059.jpg",title: "BARSO",description: "ft. goat prez and disease partner"},
      {src: "/gallery/scioly/20240129_154657.jpg",title: "First Medal",description: "Aggies 2024 Disease Detectives 2nd place. First medal of my SciOly career, kickstarted my thirst for more."},
      {src: "/gallery/scioly/20250125_194141.jpg",title: "2nd place Team Trophy",description: "BARSO - overall 2nd team placement, low team average proved that consistency > staggering success"},
      {src: "/gallery/scioly/ANH_8038.JPG",title: "Award Ceremony",description: "there was a lot of people..., making winning feel even better."},
      {src: "/gallery/scioly/IMG_0809.jpg",title: "CSUEB team photo -> 2nd year in scioly",description: "what a large family am i right?"},
      {src: "/gallery/scioly/DSCN0208.JPG",title: "Senior picnic",description: "last team event :( sending off the oldies"},
      {src: "/gallery/scioly/IMG_0817.jpg",title: "Team Photo",description: "im on the left side 2nd row, i was so happy!"},
      {src: "/gallery/scioly/IMG_1883.jpg",title: "Senior ball team photo",description: "weird seeing a bunch of nerds dress formal."},
      {src: "/gallery/scioly/Sciolympics_516_group_photo.png",title: "Drone Photo",description: "made it just in time for this photo! can we appreciate the diversity though!"},
    ],
  },

  {
    id: "art",
    title: "Art",
    overview:
      "I had never taken any art class and had just taken AP 2D Art out of wanting a GPA boost. I was pushed hugely outside of my comfort zone and was forced to be creative and think uniquely. The portfolio I ended up with was my artistic attempt in visualizing my history, emotions, and journey. While the literal elements of the pieces are not superb, these pieces contain a more personal depiction of my lfie that may be more digestible to the public eye.",
    photos: [
        {src: "/gallery/ART/sketch1746763991631.png",title: "Silent Solidarity", description: "This was the conclusion of my portfolio. I hoped to capture feelings of strength in silence and the power of individuality. To me, this piece represents my feelings of daily life the most and how I perceive my social, cultural, and political understandings."},
        {src: "/gallery/ART/ Kyler Hu - SIP 1.png",title: "SIP #1", description: "This was my first piece. it was not the greatest, but I aim to show this to accurately display my artistic journey throughout the year because it can only go up from here! it has wabisabi"},
        {src: "/gallery/ART/ Kyler Hu - SIP 3.png", title: "SIP #2", description: "Started to develop my personal goal and foundation of my portfolio, started to delve into feelings of pain, isolation, and hatred."},
        {src: "/gallery/ART/ Kyler Hu - SIP 2.png", title: "SIP #3", description: "driven by the feelings of constantly drowning under pressure and falling closer to fire. Wanted to literally depict the contrast between the pains of self-induced pressure (water) and external pressure (fire)."},
        {src: "/gallery/ART/ Kyler Hu - SIP 9.png", title: "Life's Looking Glass", description: "first piece where I exlored multi-media art, implementing photography, digital art, and editing softwares. wanted to depict the difference between one's life experiences and how other's perceive your experiences."},
        {src: "/gallery/ART/ Kyler Hu - SIP 10.png", title: "Beauty in Isolation", description: "I am actually proud of this one. Illustrating isolation in a beautiful stance, forefronting indivdiduality not as a social loss but as a place of strength and confidence."},
        {src: "/gallery/ART/ Kyler Hu - SIP 11.png", title: "Fallen Angel", description: "when one loses the thing they idolize most about themselves, they often fall into a place of isolation and self-depreciative mindspaces, fully disregarding other successes in their lives."},
        {src: "/gallery/ART/ Kyler Hu - SIP 12.png", title: "Reality vs. Delusion", description: "this took me 30 minutes and I had a spontaneous spark to illustrate how the \"delusion\" of having wings can drive someone to insanity when in reality, they were only self-imposed hence the blurred lines."},
        {src: "/gallery/ART/ Kyler Hu - SIP 13.png", title: "Cultural Pressure", description: "wanted to depict \"asian parent\" stereotypes in a public way. feels like everyone is against you and your strength is a vaguely luminating bubble within your surroundings."},
        {src: "/gallery/ART/ Kyler Hu - SIP 15.png", title: "Closing Legacy", description: "in the last hour and moments of your life, do you wanna be thinking about all the things you could've done. hot take: we need to be a lil more selfish and focus on doing what's best for us rather than prioritizing others over yourself."},
    ]
  },
  {
    id: "thennow",
    title: "Then vs. Now",
    overview:
      "this is just a then and now depiction of my overall life experiences and how my person has aged along with my number age. making this has actually made me realize that I idolize my past and how freeing it was. the innocence, the ignorance, and the purity was something only of that time and can never come back. and while that may sound a little depressing, i honor it and treasure it as the solid foundation that drives me to fufill the dreams of that kid 10 years ago who didn't have a care in the world about social standards, professional trajectory, and MONEY. all he wanted to do was eat, play games, and travel, and i wanna be in a position where i can do that too! it sounds a lil corny but my dream is to be like him, the kyler 10 years ago :)",
    photos: [
        {src: "/gallery/thennow/20171209_114945_IMG_5857.JPG",title: "2017", description: "I'm 10 in this photo, i think its good to start this with saying ive always loved eating, its something that never fails to give you that dopamine especially if its a krispy kreme donut. my passion for eating is a mix of curiosity, exploration, and openess to ideaas that has fed into a lot of the activities I continue to do today."},
        {src: "/gallery/thennow/20180505_103231_IMG_6148.JPG",title: "2018", description: "I was the funny kid, yk the kid that people would look at and wonder what's going on in their head. I've always known that I'm different than the \"average\" human and back then I didn't know that would translate to my best qualities."},
        {src: "/gallery/thennow/20180509_092336_IMG_6153.JPG",title: "2018", description: "as every kid does: i hated dentists appointments. not out of fear, but out of boredom. I would jsut lay there doing nothing. no games, no work, no movement, no talking, nothing. I hated the sedentary lifestyle and always had to be moving whether it was doing something as unproductive as playing Minecraft or building 1000 piece lego sets that I treasured so dearly"},
        {src: "/gallery/thennow/20180605_001950_IMG_6319.JPG",title: "2018", description: "I traveled a lot, this was in HongKong at a history museum. fun fact: my last name 胡(hu) means mustache, hence the picture. as an asian american, its always been hard to keep in touch with my cultural background, but i try..."},
        {src: "/gallery/thennow/20180618_041903_IMG_6675.JPG",title: "2018", description: "again, food. looking back, i never appreciated the huge meals I would have. i always had a full stomach that I could focus all of my attention on other things, but with that security gone down the line, you learn to compensate for the things you lose."},
        {src: "/gallery/thennow/20180620_034823_IMG_6747.JPG",title: "2018", description: "though i might not look ecstatic in this photo, i was just mildly pissed off because I wanted to eat right away but i had to take a photo instead. a hallmark of my personality back then: impatience, stubborness, and inability to see delayed gratification..."},
        {src: "/gallery/thennow/20250924_153654.jpg",title: "NOW", description: "so now we are here in the modern day, still chubby as always but independent in many ways that young me would not be able to comprehend. like 10-11 year old me could never pay his own taxes let alone pay for anything."},
        {src: "/gallery/thennow/20251219_195950(0).jpg",title: "2025", description: "as ive grown older, you appreciate the little things in life that make the bigger things a lot better. shamelessly, i take pride in materialistic things, not as a way of showing off but as a personal milestone that reminds me of my hardwork, dedication, and continued persistence."},
        {src: "/gallery/thennow/20260107_170711.jpg",title: "2026", description: "with age, i also want to try new things. this was my first time rock climbing in this photo and the freedom of climbing and regressing to the primal instincts is freeing in a way that reminds me of being a kid... sentimental i know!"},
        {src: "/gallery/thennow/20260108_161437(0)(2).jpg",title: "2026", description: "i have a dog! his names kenji. he can be annoying a lot of times and has HUGE attatchment issues but hes cute and thats all that matters. again, i feel like a lot of the things I appreciate and love always bring me back to the innocence and freedom of childhood. the way kenji walks around with no care in the world, is so pure to see that it just lifts your mood."},
        {src: "/gallery/thennow/Screenshot_20251006_195252_Gallery.jpg",title: "2026", description: "BUT REALITY STRIKES AT THE END OF THE DAY, and i have work to do, bills to pay, and dreams to fufill. people say meetings are draining but I actually love interacting with fellow cowerkers, project buddies, friends, and fellows over call. not in just the social aspect but the shared ambition and alignment of goals that can only be seen in a professionalish environment,"},
        ]
  },

  {
    id: "nightowl",
    title: "Late Nights/Early Mornings",
    overview:
      "overview",
    photos: [
        {src: "",title: "", description: ""},
        {src: "",title: "", description: ""},
        {src: "",title: "", description: ""},
        {src: "",title: "", description: ""},
        {src: "",title: "", description: ""},
        {src: "",title: "", description: ""},
        {src: "",title: "", description: ""},
        {src: "",title: "", description: ""},
        {src: "",title: "", description: ""},
        {src: "",title: "", description: ""},
    ]
  },
  {
    id: "travel",
    title: "Exploration",
    overview:
      "overview",
    photos: [
        {src: "",title: "", description: ""},
        {src: "",title: "", description: ""},
        {src: "",title: "", description: ""},
        {src: "",title: "", description: ""},
        {src: "",title: "", description: ""},
        {src: "",title: "", description: ""},
        {src: "",title: "", description: ""},
        {src: "",title: "", description: ""},
        {src: "",title: "", description: ""},
        {src: "",title: "", description: ""},
    ]
  },
  {
    id: "food",
    title: "Food as Comfort",
    overview:
      "overview",
    photos: [
        {src: "",title: "", description: ""},
        {src: "",title: "", description: ""},
        {src: "",title: "", description: ""},
        {src: "",title: "", description: ""},
        {src: "",title: "", description: ""},
        {src: "",title: "", description: ""},
        {src: "",title: "", description: ""},
        {src: "",title: "", description: ""},
        {src: "",title: "", description: ""},
        {src: "",title: "", description: ""},
    ]
  },
  {
    id: "hobbies",
    title: "Hobbies",
    overview:
      "",
    photos: [
        {src: "",title: "", description: ""},
        {src: "",title: "", description: ""},
        {src: "",title: "", description: ""},
        {src: "",title: "", description: ""},
        {src: "",title: "", description: ""},
        {src: "",title: "", description: ""},
        {src: "",title: "", description: ""},
        {src: "",title: "", description: ""},
        {src: "",title: "", description: ""},
        {src: "",title: "", description: ""},
    ]
  }
];