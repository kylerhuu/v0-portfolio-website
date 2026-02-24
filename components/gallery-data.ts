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
  }
];