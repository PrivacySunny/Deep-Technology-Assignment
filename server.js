const path = require("path");
const https = require("https");
const express = require("express");

const app = express();
const timeUrl = "https://time.com";

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.get("/getLatestStories", (req, res) => {
  https
    .get(timeUrl, (response) => {
      let data = "";

      response.on("data", (chunk) => {
        data += chunk;
      });

      response.on("end", () => {
        if (response.statusCode === 200) {
          const latestStories = [];
          const startMarker = '<div class="partial latest-stories"';
          const endMarker = "</ul>";
          const startIndex = data.indexOf(startMarker);
          const endIndex = data.indexOf(endMarker, startIndex);

          if (startIndex !== -1 && endIndex !== -1) {
            const latestStoriesHtml = data.substring(startIndex, endIndex);
            const titleRegex =
              /<h3 class="latest-stories__item-headline">([^<]+)<\/h3>/g;
            const linkRegex = /<a href="([^"]+)">/g;
            const dateRegex = /<time datetime="([^"]+)"/g;

            let match;
            while ((match = titleRegex.exec(latestStoriesHtml)) !== null) {
              const title = match[1].trim();
              const linkMatch = linkRegex.exec(latestStoriesHtml);
              const dateMatch = dateRegex.exec(latestStoriesHtml);

              if (linkMatch && dateMatch) {
                const link = `${timeUrl}${linkMatch[1]}`;
                const date = new Date(dateMatch[1]).toLocaleDateString(
                  "en-US",
                  {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  }
                );
                latestStories.push({ title, link, date });
              }
            }

            res.json(latestStories.slice(0, 6));
          } else {
            res
              .status(500)
              .json({ error: "Latest stories section not found on the page" });
          }
        } else {
          res
            .status(response.statusCode)
            .json({ error: "Failed to fetch data from Time.com" });
        }
      });
    })
    .on("error", (error) => {
      console.error("Error:", error);
      res.status(500).json({ error: "Internal server error" });
    });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
