// scripts/seedMovies.ts
import "dotenv/config"; // ⬅️ VERY IMPORTANT
import { connectDB } from "../lib/mongoose";
import { Movie } from "@/lib/models/Movie";

const baseCloudinaryURL =
  "https://res.cloudinary.com/dnfqw9hv8/image/upload/v1750775770/donghuas";
const movies = [
  {
    title: "Honor of King: Chapter of Glory",
    description: "No description provided.",
    image: "/allDonghuas/donghua (1).jpg",
  },
  {
    title: "THE BURNING MAN (HUO SHEN: TIANQI ZHIZI)",
    description: "No description provided.",
    image: "/allDonghuas/donghua (2).jpg",
  },
  {
    title: "The Sword Fairy is Here",
    description: "No description provided.",
    image: "/allDonghuas/donghua (3).jpg",
  },
  {
    title: "Da Wang Rao Ming (Spare Me, Great Lord!)",
    description: "No description provided.",
    image: "/allDonghuas/donghua (4).jpg",
  },
  {
    title: "Law Of The Devil",
    description: "No description provided.",
    image: "/allDonghuas/donghua (5).jpg",
  },
  {
    title: "Since The Red Moon Appeared (Cong Hong Yue Kaishi)",
    description: "No description provided.",
    image: "/allDonghuas/donghua (6).jpg",
  },
  {
    title: "The Eternal Strife",
    description: "No description provided.",
    image: "/allDonghuas/donghua (7).jpg",
  },
  {
    title: "The Invincible",
    description: "No description provided.",
    image: "/allDonghuas/donghua (8).jpg",
  },
  {
    title: "The Legend of the Taiyi Sword Immortal",
    description: "No description provided.",
    image: "/allDonghuas/donghua (9).jpg",
  },
  {
    title: "Againts The Gods",
    description: "No description provided.",
    image: "/allDonghuas/donghua (10).jpg",
  },
  {
    title: "The Age of Cosmos Exploration",
    description: "No description provided.",
    image: "/allDonghuas/donghua (11).jpg",
  },
  {
    title: "Otherworldly Evil Monarch (Yi Ren Jun Moye)",
    description: "No description provided.",
    image: "/allDonghuas/donghua (12).jpg",
  },
  {
    title: "The Proud Emperor of Eternity",
    description: "No description provided.",
    image: "/allDonghuas/donghua (13).jpg",
  },
  {
    title: "The Metaverse (Baijia Jue: Jianghu Gui Shi Lu)",
    description: "No description provided.",
    image: "/allDonghuas/donghua (14).jpg",
  },
  {
    title: "Ancient Lords (Yishi Zhi Zun)",
    description: "No description provided.",
    image: "/allDonghuas/donghua (15).jpg",
  },
  {
    title: "The Great Ruller",
    description: "No description provided.",
    image: "/allDonghuas/donghua (16).jpg",
  },
  {
    title: "The Secrets of Star Divine Arts",
    description: "No description provided.",
    image: "/allDonghuas/donghua (17).jpg",
  },
  {
    title: "Blader Soul  (Bu Xing Si)",
    description: "No description provided.",
    image: "/allDonghuas/donghua (18).jpg",
  },
  {
    title: "Star Lord of God and Dragon (Dragon Star Master)",
    description: "No description provided.",
    image: "/allDonghuas/donghua (19).jpg",
  },
  {
    title: "Sage Ancestor",
    description: "No description provided.",
    image: "/allDonghuas/donghua (20).jpg",
  },
  {
    title: "The Abyss Game (Fatal Rule",
    description: "No description provided.",
    image: "/allDonghuas/donghua (21).jpg",
  },
  {
    title: "THE RICH GOD",
    description: "No description provided.",
    image: "/allDonghuas/donghua (22).jpg",
  },
  {
    title: "Villain Initialization (Fanpai Chushihua)",
    description: "No description provided.",
    image: "/allDonghuas/donghua (23).jpg",
  },
  {
    title: "Wu Ying sanqian Dao",
    description: "No description provided.",
    image: "/allDonghuas/donghua (24).jpg",
  },
  {
    title: "Back to the Great Ming",
    description: "No description provided.",
    image: "/allDonghuas/donghua (25).jpg",
  },
  {
    title: "Wind Rises In Jinling",
    description: "No description provided.",
    image: "/allDonghuas/donghua (26).jpg",
  },
  {
    title: "Star Lord of God and Dragon (Dragon Star Master)",
    description: "No description provided.",
    image: "/allDonghuas/donghua (27).jpg",
  },
  {
    title: "The Island Of Siliang",
    description: "No description provided.",
    image: "/allDonghuas/donghua (28).jpg",
  },
  {
    title: "Hidden Sect Leader",
    description: "No description provided.",
    image: "/allDonghuas/donghua (29).jpg",
  },
  {
    title: "The charm of soul pets (Huan Chong Shi)",
    description: "No description provided.",
    image: "/allDonghuas/donghua (30).jpg",
  },
  {
    title: "Perfect world movie",
    description: "No description provided.",
    image: "/allDonghuas/donghua (31).jpg",
  },
  {
    title: "Legend of Sho",
    description: "No description provided.",
    image: "/allDonghuas/donghua (32).jpg",
  },
  {
    title: "The Golden Wug",
    description: "No description provided.",
    image: "/allDonghuas/donghua (33).jpg",
  },
  {
    title: "Legend of Soldier",
    description: "No description provided.",
    image: "/allDonghuas/donghua (34).jpg",
  },
  {
    title: "King of Loose Cultivators",
    description: "No description provided.",
    image: "/allDonghuas/donghua (35).jpg",
  },
  {
    title: "Dragon Prince Yuan (Yuan Zun",
    description: "No description provided.",
    image: "/allDonghuas/donghua (36).jpg",
  },
  {
    title: "Slay The Gods (Zhan Shen)",
    description: "No description provided.",
    image: "/allDonghuas/donghua (37).jpg",
  },
  {
    title: "A Momment But Forever",
    description: "No description provided.",
    image: "/allDonghuas/donghua (38).jpg",
  },
  {
    title: "My Heroic Husband",
    description: "No description provided.",
    image: "/allDonghuas/donghua (39).jpg",
  },
  {
    title: "I Can Experience Limitless Enlightements",
    description: "No description provided.",
    image: "/allDonghuas/donghua (40).jpg",
  },
  {
    title: "Heavenly Brick Knight",
    description: "No description provided.",
    image: "/allDonghuas/donghua (41).jpg",
  },
  {
    title: "Immortality",
    description: "No description provided.",
    image: "/allDonghuas/donghua (42).jpg",
  },
  {
    title: "Martial God Asura",
    description: "No description provided.",
    image: "/allDonghuas/donghua (43).jpg",
  },
  {
    title: "APOTHEOSIS",
    description: "No description provided.",
    image: "/allDonghuas/donghua (44).jpg",
  },
  {
    title: "Soul Land Season 2 (Live Action)",
    description: "No description provided.",
    image: "/allDonghuas/donghua (45).jpg",
  },
  {
    title: "SWALLOWED STAR MOVIE : XUELUO CONTINENT",
    description: "No description provided.",
    image: "/allDonghuas/donghua (46).jpg",
  },
  {
    title: "Adventures in Subduing the Demons",
    description: "No description provided.",
    image: "/allDonghuas/donghua (47).jpg",
  },
  {
    title: "The Legend of Sky Lord",
    description: "No description provided.",
    image: "/allDonghuas/donghua (48).jpg",
  },
  {
    title: "I Can Have Infinite Enlightenment",
    description: "No description provided.",
    image: "/allDonghuas/donghua (49).jpg",
  },
  {
    title: "My WeChat Connects to the Dragon Palace",
    description: "No description provided.",
    image: "/allDonghuas/donghua (50).jpg",
  },
  {
    title: "The Path Toward Heaven",
    description: "No description provided.",
    image: "/allDonghuas/donghua (51).jpg",
  },
  {
    title: "Renjian Zui Deyi (Proud Swordsman)",
    description: "No description provided.",
    image: "/allDonghuas/donghua (52).jpg",
  },
  {
    title: "Keyboard Immortal",
    description: "No description provided.",
    image: "/allDonghuas/donghua (53).jpg",
  },
  {
    title: "Glorious Revenge of Ye Feng",
    description: "No description provided.",
    image: "/allDonghuas/donghua (54).jpg",
  },
  {
    title: "Jian Lai (Sword coming)",
    description: "No description provided.",
    image: "/allDonghuas/donghua (55).jpg",
  },
  {
    title: "God of War Alliance",
    description: "No description provided.",
    image: "/allDonghuas/donghua (56).jpg",
  },
  {
    title: "Heaven Shadow",
    description: "No description provided.",
    image: "/allDonghuas/donghua (57).jpg",
  },
  {
    title: "Wu Dong Qian Kun",
    description: "No description provided.",
    image: "/allDonghuas/donghua (58).jpg",
  },
  {
    title: "Tomb of Fallen Gods",
    description: "No description provided.",
    image: "/allDonghuas/donghua (59).jpg",
  },
  {
    title: "The War of Cards",
    description: "No description provided.",
    image: "/allDonghuas/donghua (60).jpg",
  },
  {
    title: "Xi Xing Ji",
    description: "No description provided.",
    image: "/allDonghuas/donghua (61).jpg",
  },
  {
    title: "Over Goddess",
    description: "No description provided.",
    image: "/allDonghuas/donghua (62).jpg",
  },
  {
    title: "The Demon King Who Lost His Job",
    description: "No description provided.",
    image: "/allDonghuas/donghua (63).jpg",
  },
  {
    title: "Tiger x Crane: Record of the Demon Master",
    description: "No description provided.",
    image: "/allDonghuas/donghua (64).jpg",
  },
  {
    title: "Fengwu Demon Chef",
    description: "No description provided.",
    image: "/allDonghuas/donghua (65).jpg",
  },
  {
    title: "The World of Immortals (Chang Sheng Jie)",
    description: "No description provided.",
    image: "/allDonghuas/donghua (66).jpg",
  },
  {
    title: "Solo Leveling: Arise from the Shadow",
    description: "No description provided.",
    image: "/allDonghuas/donghua (67).jpg",
  },
  {
    title: "Martial Invers",
    description: "No description provided.",
    image: "/allDonghuas/donghua (68).jpg",
  },
  {
    title: "Martial Peak",
    description: "No description provided.",
    image: "/allDonghuas/donghua (69).jpg",
  },
  {
    title: "Nirvana of Storm Riders",
    description: "No description provided.",
    image: "/allDonghuas/donghua (70).jpg",
  },
  {
    title: "The Ravages of Time",
    description: "No description provided.",
    image: "/allDonghuas/donghua (71).jpg",
  },
  {
    title: "Rebirth of the Sword Patriarch",
    description: "No description provided.",
    image: "/allDonghuas/donghua (72).jpg",
  },
  {
    title: "Throne of Seal Movie: Electrolux",
    description: "No description provided.",
    image: "/allDonghuas/donghua (73).jpg",
  },
  {
    title: "Endless God Realm",
    description: "No description provided.",
    image: "/allDonghuas/donghua (74).jpg",
  },
  {
    title: "The Legend of Pricess Chang-Ge",
    description: "No description provided.",
    image: "/allDonghuas/donghua (75).jpg",
  },
  {
    title: "Lord of Destiny",
    description: "No description provided.",
    image: "/allDonghuas/donghua (76).jpg",
  },
  {
    title: "Supreme Sword God",
    description: "No description provided.",
    image: "/allDonghuas/donghua (77).jpg",
  },
  {
    title: "The Super Cube (Chao Neng Lifang: Chaofan Pian)",
    description: "No description provided.",
    image: "/allDonghuas/donghua (78).jpg",
  },
  {
    title: "GoWest: Overworked",
    description: "No description provided.",
    image: "/allDonghuas/donghua (79).jpg",
  },
  {
    title: "Everything Is Fine With The Emperor",
    description: "No description provided.",
    image: "/allDonghuas/donghua (80).jpg",
  },
  {
    title: "Honor of Kings",
    description: "No description provided.",
    image: "/allDonghuas/donghua (81).jpg",
  },
  {
    title: "My Senior Brother is Too Strong",
    description: "No description provided.",
    image: "/allDonghuas/donghua (82).jpg",
  },
  {
    title: "Divine Dao Emperor",
    description: "No description provided.",
    image: "/allDonghuas/donghua (83).jpg",
  },
  {
    title: "My Sectarian Members Are Spies",
    description: "No description provided.",
    image: "/allDonghuas/donghua (84).jpg",
  },
  {
    title: "Fight For The Throne",
    description: "No description provided.",
    image: "/allDonghuas/donghua (85).jpg",
  },
  {
    title: "Battle Through the heaven",
    description: "No description provided.",
    image: "/allDonghuas/donghua (86).jpg",
  },
  {
    title: "a record of mortal to immortality",
    description: "No description provided.",
    image: "/allDonghuas/donghua (87).jpg",
  },
  {
    title: "Legend Of Martial",
    description: "No description provided.",
    image: "/allDonghuas/donghua (88).jpg",
  },
  {
    title: "Tales of Herding Gods",
    description: "No description provided.",
    image: "/allDonghuas/donghua (89).jpg",
  },
  {
    title: "Renegade Immortal",
    description: "No description provided.",
    image: "/allDonghuas/donghua (90).jpg",
  },
  {
    title: "Jun You Yun",
    description: "No description provided.",
    image: "/allDonghuas/donghua (91).jpg",
  },
  {
    title: "Swallowed Star",
    description: "No description provided.",
    image: "/allDonghuas/donghua (92).jpg",
  },
  {
    title: "Over the Divine Kingdom",
    description: "No description provided.",
    image: "/allDonghuas/donghua (93).jpg",
  },
  {
    title: "Wukong (Great Ape Soul)",
    description: "No description provided.",
    image: "/allDonghuas/donghua (94).jpg",
  },
  {
    title: "stellar Transformation",
    description: "No description provided.",
    image: "/allDonghuas/donghua (95).jpg",
  },
  {
    title: "Rich Player",
    description: "No description provided.",
    image: "/allDonghuas/donghua (96).jpg",
  },
  {
    title: "Martial master",
    description: "No description provided.",
    image: "/allDonghuas/donghua (97).jpg",
  },
  {
    title: "100.000 Years Of Refining Qi",
    description: "No description provided.",
    image: "/allDonghuas/donghua (98).jpg",
  },
  {
    title: "Peerless Battle Spirit",
    description: "No description provided.",
    image: "/allDonghuas/donghua (99).jpg",
  },
  {
    title: "Shrouding the heavens",
    description: "No description provided.",
    image: "/allDonghuas/donghua (100).jpg",
  },
  {
    title: "Heaven Swallowing Record (Tun Tian Ji)",
    description: "No description provided.",
    image: "/allDonghuas/donghua (101).jpg",
  },
  {
    title: "Urban Ancient Immortal Doctor",
    description: "No description provided.",
    image: "/allDonghuas/donghua (102).jpg",
  },
  {
    title: "Throne of seal",
    description: "No description provided.",
    image: "/allDonghuas/donghua (103).jpg",
  },
  {
    title: "Jade dinasty",
    description: "No description provided.",
    image: "/allDonghuas/donghua (104).jpg",
  },
  {
    title: "Little Fairy Yao",
    description: "No description provided.",
    image: "/allDonghuas/donghua (105).jpg",
  },
  {
    title: "My senior brother is to ready",
    description: "No description provided.",
    image: "/allDonghuas/donghua (106).jpg",
  },
  {
    title: "Perfect world",
    description: "No description provided.",
    image: "/allDonghuas/donghua (107).jpg",
  },
  {
    title: "The All-devouring Whale: Homecoming",
    description: "No description provided.",
    image: "/allDonghuas/donghua (108).jpg",
  },
  {
    title: "EMBERS",
    description: "No description provided.",
    image: "/allDonghuas/donghua (109).jpg",
  },
  {
    title: "Ancient War Soul",
    description: "No description provided.",
    image: "/allDonghuas/donghua (110).jpg",
  },
  {
    title: "Azure Legacy",
    description: "No description provided.",
    image: "/allDonghuas/donghua (111).jpg",
  },
  {
    title: "Lingwu Continent",
    description: "No description provided.",
    image: "/allDonghuas/donghua (112).jpg",
  },
  {
    title: "Supreme Alchemy",
    description: "No description provided.",
    image: "/allDonghuas/donghua (113).jpg",
  },
  {
    title: "Soul land S1 & S2",
    description: "No description provided.",
    image: "/allDonghuas/donghua (114).jpg",
  },
];
const cloudMovies = movies.map((movie, index) => {
  const imageIndex = index + 1;
  return {
    ...movie,
    image: `${baseCloudinaryURL}/donghua%20%28${imageIndex}%29.jpg`,
  };
});
async function seed() {
  try {
    await connectDB();
    await Movie.deleteMany(); // Optional: Clear old data
    await Movie.insertMany(cloudMovies);
    console.log("✅ Movies seeded successfully with Cloudinary URLs!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Failed to seed movies:", error);
    process.exit(1);
  }
}

seed();
