// window.onload = function () {
//   fetch("/getLatestStories")
//     .then((response) => response.json())
//     .then((data) => {
//       const storiesList = document.getElementById("stories-list");
//       data.forEach((story) => {
//         const listItem = document.createElement("li");
//         listItem.innerHTML = `<a href="${story.link}" target="_blank">${story.title}</a><br><small>${story.date}</small>`;
//         storiesList.appendChild(listItem);
//       });
//     })
//     .catch((error) => {
//       console.error("Error fetching the latest stories:", error);
//     });
// };

window.onload = function () {
  const newsData = [
    {
      title: "Could the Oasis Reunion Come Early?",
      link: "https://time.com/7016832/oasis-reunion-saudi-arabia/",
      date: "September 2, 2024",
    },
    {
      title: "Venice Review: The Brutalist",
      link: "https://time.com/7016712/the-brutalist-review/",
      date: "September 2, 2024",
    },
    {
      title: "The Backlash Over Keeping Olympic Rings on Eiffel Tower",
      link: "https://time.com/7016791/paris-olympic-rings-eiffel-tower-controversy-anne-hidalgo-architect-descendants/",
      date: "September 2, 2024",
    },
    {
      title:
        "I Was Held Hostage by ISIS With Steven Sotloff. He Was the Bravest Among Us",
      link: "https://time.com/7012216/remembering-steven-sotloff-isis-captive/",
      date: "September 2, 2024",
    },
    {
      title: "AI May Not Steal Many Jobs After All",
      link: "https://time.com/7016801/ai-jobs/",
      date: "September 2, 2024",
    },
    {
      title: "Israel's First Nationwide Strike Begins Over Hostages",
      link: "https://time.com/7016787/israel-general-strike-hostages-gaza/",
      date: "September 2, 2024",
    },
  ];

  const storiesList = document.getElementById("stories-list");
  newsData.forEach((story) => {
    const listItem = document.createElement("li");
    listItem.innerHTML = `<a href="${story.link}" target="_blank">${story.title}</a><br><small>${story.date}</small>`;
    storiesList.appendChild(listItem);
  });
};
