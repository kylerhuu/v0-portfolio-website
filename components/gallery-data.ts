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
      {src: "/gallery/scioly/20250125_194141.jpg",title: "2nd place Team Trophy",description: "BARSO - overall 2nd team placement, low team average proved that consistency > staggering success",},
      {src: "/gallery/scioly/ANH_8038.JPG",title: "Award Ceremony",description: "there was a lot of people..., making winning feel even better.",},
      {src: "/gallery/scioly/IMG_0809.jpg",title: "CSUEB team photo -> 2nd year in scioly",description: "what a large family am i right?",},
      {src: "/gallery/scioly/DSCN0208.JPG",title: "Senior picnic",description: "last team event :( sending off the oldies",},
      {src: "/gallery/scioly/IMG_0817.jpg",title: "Team Photo",description: "im on the left side 2nd row, i was so happy!",},
      {src: "/gallery/scioly/IMG_1883.jpg",title: "Senior ball team photo",description: "weird seeing a bunch of nerds dress formal.",},
      {src: "/gallery/scioly/Sciolympics_516_group_photo.png",title: "Drone Photo",description: "made it just in time for this photo! can we appreciate the diversity though!",},
    ],
  },

  {
    id: "hackathons",
    title: "Hackathons",
    overview:
      "Hackathons were controlled chaos — building fast, breaking things, learning faster.",

    photos: []
  }
];