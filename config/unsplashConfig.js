const axios=require('axios');

module.exports.unsplash=axios.create({
  baseURL: "https://api.unsplash.com",
  headers: {
    Authorization:
      "Client-ID e9bce5f863f0864141d1f16279cfeecf2235c999487f91a59642607fa460de94"
  }
});
