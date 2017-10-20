module.exports = {
	reddit: {
		api: {
			base: "www.reddit.com",
			subreddit:  "/r/",
			comments: "/comments/",
			json: ".json?",
			after: "&after=",
			before: "&before=",

			listings: {
				hot: "/hot.json?",
				new: "/new.json?",
				random: "/random.json?",
				rising: "/rising.json?",
				top: "/top.json?",
				controversial: "/controversial.json?",
			},

			sorting: {
				top: "top",
				new: "new",
				controversial: "controversial",
				old: "old",
				random: "random",
				qa: "qa",
				live: "live",
				blank: "blank",
				confidence: "confidence",
			},
		},
	},

	imgur: {
		api: {
			base: "api.imgur.com",
			album: "/3/album/",
			image: "/3/image/",
			images: "/images",
			galleryAlbum: "/3/gallery/album/",
		},
	},

};