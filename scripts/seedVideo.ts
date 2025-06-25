// scripts/seedMovies.ts
import "dotenv/config"; // ⬅️ VERY IMPORTANT
import { connectDB } from "../lib/mongoose";
import { Video } from "@/lib/models/Videos";

const baseCloudinaryURL =
  "https://res.cloudinary.com/dnfqw9hv8/video/upload/v1750775770/donghua_videos";
const movies = [
  {
    title: "Battle Through the Heaven",
    description:
      "Xiao Yan, seorang pemuda jenius yang tiba-tiba kehilangan kekuatannya. Ia kemudian menemukan bahwa cincin warisan ibunya menyimpan jiwa seorang alkemis tua bernama Yao Chen. Dengan bimbingan Yao Chen, Xiao Yan memulai perjalanan untuk memulihkan kekuatannya, mengungkap misteri kematian ibunya, dan membalas dendam atas kehancuran keluarganya.",
  },
  {
    title: "Renegade Immortal",
    description:
      "Renegade Immortal – Wang Lin adalah anak yang sangat cerdas dengan orang tua yang penuh kasih. Meskipun dia dan orang tuanya dijauhi oleh anggota keluarga mereka yang lain, orang tuanya selalu berharap besar bahwa suatu hari dia akan menjadi seseorang yang hebat. Suatu hari, Wang Lin tiba-tiba mendapat kesempatan untuk berjalan di jalan keabadian, tetapi menemukan bahwa ia hanya memiliki bakat yang biasa-biasa saja di antara yang terbaik. Saksikan Wang Lin saat dia menerobos dengan kurangnya bakat dan berjalan di jalan menuju keabadian sejati!",
  },
  {
    title: "Shrouding the Heaven",
    description:
      "Shrouding the Heavens – Donghua ini diadaptasi dari bagian pertama trilogi Zhetian oleh penulis Chendong (Penulis Perfect World). Di kedalaman kosmik di mana kesuraman dan kegelapan hidup berdampingan, sembilan mayat naga menarik peti mati perunggu kuno yang sudah ada sejak zaman kuno. Ini adalah gambar yang sangat mengejutkan yang ditangkap oleh teknologi antariksa di alam semesta yang sunyi. Apakah Kunlun menarik peti mati itu kembali ke zaman kuno, atau datang ke sisi lain langit berbintang? Dunia peri yang luas, aneh, misterius, dan tak berujung. Darah mendidih seperti gunung berapi, nafsu mengamuk seperti lautan luas, dan keinginan tak terbatas seperti jurang maut… Mendaki jalan menuju surga, berjalan dengan nyanyian.",
  },
  {
    title: "Soul Land",
    description:
      "Soul Land 2: The Unrivaled Tang Sect – Dunia tanpa sihir, tanpa Dou-Qi, tanpa seni bela diri, tetapi dengan Essence Spirits. Di Benua Douluo sepuluh ribu tahun setelah Sekte Tang didirikan, Sekte Tang menurun. Akan tetapi, satu generasi Jenius lahir dan melahirkan generasi baru Tujuh Monster Shrek untuk menghidupkan kembali Sekte Tang dan menulis kembali kisah kebesaran Sekte Tang? Binatang Jiwa berusia jutaan tahun, memegang matahari, bulan, dan dewa pemetik bintang kematian, sistem panduan jiwa baru yang menyebabkan penurunan Sekte Tang. Semua keajaiban akan terungkap satu per satu. Bisakah senjata tersembunyi dari Sekte Tang mendapatkan kembali kejayaannya, dan bisakah Sekte Tang mendapatkan kembali kecemerlangannya?",
  },
  {
    title: "Throne of Seal",
    description:
      "Throne of Seal – 6000 tahun yang lalu, Kaisar Dewa Iblis, Feng Xiu dan 72 Pilar Dewa Iblis turun dari langit, semua makhluk terkontaminasi dengan nafas Pilar Dewa Iblis, dan langsung bermutasi menjadi makhluk iblis lalu manusia memasuki zaman kegelapan. Setelah itu, para praktisi manusia mengatur dari enam Kuil berdiri untuk memblokir kemajuan iblis, dan secara bertahap membentuk situasi di mana manusia dan iblis hidup berdampingan.",
  },
  {
    title: "Perfect World",
    description:
      "Donghua “Perfect World” diadaptasi dari novel dengan judul yang sama. Dia dilahirkan untuk mengolah Tao, dan untuk malapetaka, dia berubah menjadi hujan ribuan darah, turun selama berabad-abad, dan mengalami waktu dan ruang yang tak terhitung jumlahnya, pemurnian bertahun-tahun, dia berbalik selamanya. Lihat bagaimana pahlawan Shi Hao yang sangat brilian sepanjang hidupnya, menciptakan legenda tanpa akhir.",
  },
];

const cloudMovies = movies.map((movie, index) => {
  const imageIndex = index + 1;
  return {
    ...movie,
    src: `${baseCloudinaryURL}/video%20%28${imageIndex}%29.mp4`,
  };
});
async function seed() {
  try {
    await connectDB();
    await Video.deleteMany(); // Optional: Clear old data
    await Video.insertMany(cloudMovies);
    console.log("✅ Movies seeded successfully with Cloudinary URLs!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Failed to seed movies:", error);
    process.exit(1);
  }
}

seed();
