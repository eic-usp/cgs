import Match from '../models/match.model.js';

const matchService = {
    create: async (match: Match): Promise<Match> => await Match.create(match)
}

export default matchService;