const axios=require('axios');

module.exports.unsplash=axios.create({
  baseURL: "https://api.unsplash.com",
  headers: {
    Authorization:
      "Client-ID 37aeeb63a78629203832077efaa80b7a01adec7ca91f5ff5bc8c11b075649ce1"
  }
});
