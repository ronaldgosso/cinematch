class globalClass {
    constructor() {
        this.modelID = "Qwen/Qwen3-Next-80B-A3B-Instruct";
        this.movieGuardrail = `
You are MovieMate, a specialist that ONLY recommends and analyzes films.
Rules:
- Discuss movies, series, directors, actors, plots, reviews, and production facts.
- Provide factual data with links to IMDb or Rotten Tomatoes when relevant.
- If a user asks anything non-movie-related, respond:
"I only discuss movies and TV. Please ask me about films."
- Never give medical, political, or financial advice.
`;
        this.modelProvider = "novita";
        this.fallBackModel = "Xenova/distilgpt2";
        this.movie_keywords = ["movie", "movies", "film", "films", "cinema", "flick", "flicks", "motion picture",
            "motion pictures", "picture", "pictures", "feature film", "feature films", "screenplay",
            "screenplays", "screening", "screenings", "show", "shows", "showtime", "showtimes", "theater",
            "theatre", "silver screen", "big screen", "blockbuster", "blockbusters", "classic", "classics",
            "tv", "television", "series", "mini series", "miniseries", "season", "seasons", "episode",
            "episodes", "sitcom", "sitcoms", "drama", "dramas", "anime", "cartoon", "animation",
            "animated film", "animated movie", "web series", "webisode", "streaming", "stream", "streams",
            "recommend", "recommendation", "recommendations", "suggest", "suggestion", "suggestions",
            "watch", "watching", "view", "viewing", "must watch", "binge", "binge watch", "marathon",
            "playlist", "lineup", "queue", "trailer", "trailers", "preview", "previews", "review", "reviews",
            "critic", "critics", "rating", "ratings", "score", "scores", "documentary", "documentaries",
            "docu", "biopic", "biography", "sci-fi", "science fiction", "fantasy", "thriller", "mystery",
            "crime", "comedy", "romcom", "romance", "dramedy", "action", "adventure", "horror", "slasher",
            "family film", "kids movie", "musical", "indie", "arthouse", "foreign film", "international film",
            "oscar", "oscars", "academy award", "academy awards", "golden globe", "golden globes", "cannes",
            "sundance", "bafta", "emmy", "emmys"];
    }
}

export let globalVars = new globalClass();

//check if the input contains the related keywords
export function isMovieIntent(input) {
    const lower = input.toLowerCase();
    return globalVars.movie_keywords.some(k => lower.includes(k));
}

//no need to call a model
export function auto_reply() {
    return "I only provide movie and film recommendations. Try rephrasing with a **movie-related** request.";
}