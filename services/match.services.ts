import Match from '../models/match.model';

const matchService = {
    create: async (match: Match): Promise<Match> => await Match.create(match)
}

export default matchService;