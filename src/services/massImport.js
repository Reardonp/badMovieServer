const glob = require("glob");
const { convertXMLtoJson, addNfo } = require("../controllers/nfo.controller");
const connectDB = require('../middleware/dbConn')


// async function massImport2() {
//   importJson = {
//     movie: {
//       title: "9 Deaths of the Ninja",
//       originaltitle: "9 Deaths of the Ninja",
//       sorttitle: "",
//       epbookmark: "",
//       year: 1985,
//       ratings: {
//         rating: {
//           value: 5.6,
//           votes: 39,
//         },
//       },
//       userrating: 0,
//       top250: 0,
//       set: "",
//       plot: "A trio of specialized soldiers is called in to stop a group of drug traffickers who have hijacked a busload of tourists in the Philippines and threaten to kill them all if one of their companions is not released from jail and the government does not stop its anti-drug policies.",
//       outline:
//         "A trio of specialized soldiers is called in to stop a group of drug traffickers who have hijacked a busload of tourists in the Philippines and threaten to kill them all if one of their companions is not released from jail and the government does not stop its anti-drug policies.",
//       tagline: "The Ninja Master… is now the Ninja Avenger",
//       runtime: 94,
//       thumb:
//         "https://image.tmdb.org/t/p/original/2eXzrLX6nWZhHDvVHQjJ2qO2Z2M.jpg",
//       fanart: {
//         thumb:
//           "https://image.tmdb.org/t/p/original/9KllQ1DCDDUjtaQZyI1CgXD2QqQ.jpg",
//       },
//       mpaa: "US:R / US:Rated R",
//       certification: "US:R / US:Rated R",
//       id: "tt0089689",
//       tmdbid: 51878,
//       uniqueid: [51878, "tt0089689"],
//       country: "Philippines",
//       status: "",
//       code: "",
//       premiered: "1985-04-15",
//       watched: false,
//       playcount: 0,
//       lastplayed: "",
//       genre: ["Comedy", "Action"],
//       studio: "Crown International Pictures",
//       credits: "Emmett Alston",
//       director: "Emmett Alston",
//       tag: ["terrorist", "hostage", "exploitation", "philippines", "ninja"],
//       actor: [
//         {
//           name: "Shô Kosugi",
//           role: "Spike Shinobi",
//           thumb:
//             "https://image.tmdb.org/t/p/h632/cdoP2qnJILJlWT4xvYDxg2doaf6.jpg",
//           profile: "https://www.themoviedb.org/person/99846",
//           tmdbid: 99846,
//         },
//         {
//           name: "Brent Huff",
//           role: "Steve Gordon",
//           thumb:
//             "https://image.tmdb.org/t/p/h632/cewS9esLejNSq24g5GqgSZFCjli.jpg",
//           profile: "https://www.themoviedb.org/person/84648",
//           tmdbid: 84648,
//         },
//         {
//           name: "Emilia Crow",
//           role: "Jennifer Barnes",
//           thumb:
//             "https://image.tmdb.org/t/p/h632/4spPaCMJpn9r3e0hokiDSjNOmue.jpg",
//           profile: "https://www.themoviedb.org/person/538318",
//           tmdbid: 538318,
//         },
//         {
//           name: "Blackie Dammett",
//           role: "Alby the Cruel",
//           profile: "https://www.themoviedb.org/person/157467",
//           tmdbid: 157467,
//         },
//         {
//           name: "Regina Richardson",
//           role: "Honey Hump",
//           profile: "https://www.themoviedb.org/person/1053617",
//           tmdbid: 1053617,
//         },
//         {
//           name: "Lisa Friedman",
//           role: "Tour Guide",
//           profile: "https://www.themoviedb.org/person/1130642",
//           tmdbid: 1130642,
//         },
//         {
//           name: "Kane Kosugi",
//           role: "Kane",
//           thumb:
//             "https://image.tmdb.org/t/p/h632/zjU1zHGGlAK3yzL3cjc8lBUqrrr.jpg",
//           profile: "https://www.themoviedb.org/person/65198",
//           tmdbid: 65198,
//         },
//         {
//           name: "Shane Kosugi",
//           role: "Shane",
//           thumb:
//             "https://image.tmdb.org/t/p/h632/5ePVKMbW8aaI6oBtFoClJOZGpMl.jpg",
//           profile: "https://www.themoviedb.org/person/1045069",
//           tmdbid: 1045069,
//         },
//         {
//           name: "Bruce Fanger",
//           role: "Dr. Wolf",
//           profile: "https://www.themoviedb.org/person/1130643",
//           tmdbid: 1130643,
//         },
//         {
//           name: "Sonny Erang",
//           role: "Rahji",
//           profile: "https://www.themoviedb.org/person/1130644",
//           tmdbid: 1130644,
//         },
//         {
//           name: "Aiko Cownden",
//           role: "Marisa Lee",
//           profile: "https://www.themoviedb.org/person/1130645",
//           tmdbid: 1130645,
//         },
//         {
//           name: "Helen McNeely",
//           role: "Mrs. Garcia",
//           profile: "https://www.themoviedb.org/person/1130646",
//           tmdbid: 1130646,
//         },
//         {
//           name: "Protacio Dee",
//           role: "Feng Fu",
//           profile: "https://www.themoviedb.org/person/552151",
//           tmdbid: 552151,
//         },
//         {
//           name: "Vijay Amritraj",
//           role: "Rankin",
//           thumb:
//             "https://image.tmdb.org/t/p/h632/tY5Rp9Lm5e8wiYskfq5vYP9BosP.jpg",
//           profile: "https://www.themoviedb.org/person/1233481",
//           tmdbid: 1233481,
//         },
//         {
//           name: "Cynthia Villa-Abrille",
//           role: "Rankin's Date",
//           profile: "https://www.themoviedb.org/person/1901781",
//           tmdbid: 1901781,
//         },
//         {
//           name: "Henry Strzalkowski",
//           role: "Bus Driver",
//           thumb:
//             "https://image.tmdb.org/t/p/h632/8Ly1hRl39nrVzFLrHWbWrjgn8Jt.jpg",
//           profile: "https://www.themoviedb.org/person/107322",
//           tmdbid: 107322,
//         },
//       ],
//       producer: [
//         {
//           name: "Ashok Amritraj",
//           thumb:
//             "https://image.tmdb.org/t/p/h632/f3H03GKmSvKlDPGB7rrXFcmdlxR.jpg",
//           profile: "https://www.themoviedb.org/person/21478",
//         },
//         {
//           name: "Maria Metcalfe",
//           profile: "https://www.themoviedb.org/person/1901774",
//         },
//         {
//           name: "Shelley E. Reid",
//           profile: "https://www.themoviedb.org/person/1901778",
//         },
//       ],
//       trailer:
//         "plugin://plugin.video.youtube/?action=play_video&amp;videoid=TeyoCbvver4",
//       languages: "English",
//       dateadded: "2022-12-02 18:21:00",
//       fileinfo: {
//         streamdetails: {
//           video: {
//             codec: "h264",
//             aspect: 1.78,
//             width: 1280,
//             height: 720,
//             durationinseconds: 5621,
//             stereomode: "",
//           },
//           audio: {
//             codec: "AAC",
//             language: "eng",
//             channels: 2,
//           },
//         },
//       },
//       source: "UNKNOWN",
//       edition: "NONE",
//       original_filename: "9 Deaths of the Ninja (1985) 720p AAC.mp4",
//       user_note: "",
//     },
//   };
//   const nfoFiles = [];
//   const innerFolders = await fs.promises.readdir(MOVIES_FOLDER);
//   for (const folder of innerFolders) {
//     const folderPath = path.join(MOVIES_FOLDER, folder);
//     const stats = await fs.promises.stat(folderPath);
//     if (stats.isDirectory()) {
//       const innerFiles = await fs.promises.readdir(folderPath);
//       for (const file of innerFiles) {
//         if (path.extname(file) === ".nfo") {
//           const filePath = path.join(folderPath, file);
//           const nfoContent = await fs.promises.readFile(filePath, "utf8");
//           const nfoJson = parseNfo(nfoContent);
//           nfoFiles.push(nfoJson);
//         }
//       }
//     }
//   }
//   // movies.createMovies(nfoFiles[0])
//   console.log(nfoFiles);
//   // return nfoFiles;
// }
/*
this function searches a directory for .nfo files
then sends all the nfo files through an xml to json function
*/

const MOVIES_FOLDER = "H:\\Bad Movies\\Movies";
connectDB();
massImport();
// console.log(massImport())


async function massImport() {
  glob(MOVIES_FOLDER + "/**/*.nfo", async (err, files) => {
    if (err) {
      console.log("Error", err);
    } else {
      for (file of files) {
        try {
          const nfoObject = await convertXMLtoJson(file);
          await addNfo(nfoObject);
        } catch (err) {
          console.error(err);
        }
      }
    }
  });
}
