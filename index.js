const PORT = 8000;
const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");

const app = express();

app.get("/", (req, res) => {
  res.json("Welcome");
});

app.get("/cars", async (req, res) => {
  const response = await axios.post(
    "https://www.copart.com/public/lots/vehicle-finder-search-results",
    {
      query: ["*"],
      filter: {},
      sort: [
        "salelight_priority asc",
        "member_damage_group_priority asc",
        "auction_date_type desc",
        "auction_date_utc asc",
      ],
      page: 0,
      size: 100,
      start: 0,
      watchListOnly: false,
      freeFormSearch: false,
      hideImages: false,
      defaultSort: false,
      specificRowProvided: false,
      displayName: "",
      searchName: "",
      backUrl: "",
      includeTagByField: {
        VEHT: "{!tag=VEHT}",
      },
      rawParams: {},
    },
    {
      headers: {
        authority: "www.copart.com",
        "accept-language": "en-US,en;q=0.9",
        "access-control-allow-headers": "Content-Type, X-XSRF-TOKEN",
        cookie:
          "g2usersessionid=12863a5a8f22c4bc666d76b0ca01d386; G2JSESSIONID=E177503624159206788A1A8BB4A7B354-n1; userLang=en; visid_incap_242093=R6sW5ADdS2eh6QW8rbARvCcWQ2UAAAAAQUIPAAAAAAAJyk6xShMBAUNtyuLBw2aC; nlbi_242093=KmdIC/ivpSn6ALEfJDHybgAAAAD0QhGW4YTptwB1/6apUIfW; incap_ses_567_242093=NYsuCrvt6UB6nBfCimTeBycWQ2UAAAAA8HlE4u3tyLf0+9Ox6WNEaA==; timezone=America%2FLos_Angeles; usersessionid=0467356456e39aebce81e4e657658312; OAID=b4588cbd5f7d91c5021ad4d85aa12491; g2app.search-table-rows=20; userCategory=RPU; copartTimezonePref=%7B%22displayStr%22%3A%22PDT%22%2C%22offset%22%3A-7%2C%22dst%22%3Atrue%2C%22windowsTz%22%3A%22America%2FLos_Angeles%22%7D; reese84=3:8QauxZv92oeq/sj3RAfk2A==:lWNcVqfsLNWsRbINQO3mMxgnnpTzGCuQeczPAtHTgEDFVvAqU8WnB6DkDNjkfvAdGuDeVtC73AngyyHUPcfjFWlR2lVV6aQTBtnTDG9UkXDY4AUcsZhX4mmeHcNeMqejESAfVdCdZVcqk6oGm4CnoO0rk6hhvLG5o61OP/2O5dp+wW95ksyB6nzSJjs637Iy/pdqAR48Nq4YG74x4/UjPQr4FouSlF209kuqnVw/t5eLHALqXrU75dP5NjyQvDiDjf9NTzONO+XsLOouNblJ1JWDQS0oU/T46LW36ks/0yxBZmhpQ18GZtp1KrwBVBzZ4+kH8RqRufQ0MLKTIYqx5RVWS5JnCQfD+TrcFoKqtWRAjJ0y8MozVDss6OBDwpzKcxzxhqYYljK2n4LEpvo7m4i24zHLttysyF/xkQsSwAsilTfYJ0p2ycv3GOr85vplJ/4hH9hN989ONMXOJ/rBIw==:dEwl3qzOEr9Q4wjA75q13q9qHkNRNnxv6oeDMVZNzdE=; nlbi_242093_2147483392=ZvFZbv778xr5335PJDHybgAAAAByjVdtJ8zhXuOlbCRTqzvi",
        origin: "https://www.copart.com",
        referer:
          "https://www.copart.com/vehicle-search-type/cars/_Incapsula_Resource?SWUDNSAI=31&xinfo=10-115625362-0%200NNN%20RT(1698897383535%2033)%20q(0%20-1%20-1%20-1)%20r(0%20-1)%20B12(4,315,0)%20U18&incident_id=567001150220296674-686703272814648522&edet=12&cinfo=04000000&rpinfo=0&cts=IKiaE%2Ff%2BPDipIMTa%2FMzRT8X4bD2hX%2BQuYZNkP27RvSaM548Edpr6J6DbBkmFEtkl&mth=GET",
        "sec-ch-ua":
          '"Not.A/Brand";v="8", "Chromium";v="114", "Google Chrome";v="114"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"macOS"',
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "user-agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36",
        "x-requested-with": "XMLHttpRequest",
        "x-xsrf-token": "d1e7ca9b-0bf2-43a2-839f-5befb1c51564",
      },
    }
  );
  const data = response.data.data.results.content;

  const carData = data.map((item) => ({
    driveStatus: item.driveStatus,
    make: item.mkn,
    model: item.mmod,
    year: item.lcy,
    title: item.tgd,
    link: `https://www.copart.com/lot/${item.lotNumberStr}`,
  }));

  res.json(carData);
});
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
