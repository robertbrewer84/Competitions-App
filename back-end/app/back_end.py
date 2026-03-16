from flask import Flask, jsonify
from flask_cors import CORS
import json


def load_data(file_name):
    with open("json_data/" + file_name + ".json") as json_data:
        data = json.load(json_data)
        json_data.close()
    return data


app = Flask(__name__)
CORS(app)

appearances = load_data("appearance")
clubs = load_data("club")
competitions = load_data("competition")
competition_entries = load_data("competition_entry")
matches = load_data("match")
players = load_data("player")
seasons = load_data("season")
teams = load_data("team")


@app.route("/seasons")
def get_seasons():
    message = {
        'message': seasons
    }
    return jsonify(message)


@app.route("/competitions")
def get_competitions():
    message = {
        'message': competitions
    }
    return jsonify(message)


@app.route("/competition_standings/<competition>")
def get_competition_standings(competition):

    competition_team_ids = [entry["teamId"] for entry in competition_entries if entry["competitionId"] == competition]

    competition_standings = []

    for team_id in competition_team_ids:

        home_matches = [match for match in matches if match["played"] and match["competitionId"] == competition and match["homeTeam"] == team_id]
        away_matches = [match for match in matches if match["played"] and match["competitionId"] == competition and match["awayTeam"] == team_id]

        wins = 0
        draws = 0
        losses = 0
        goals_for = 0
        goals_against = 0

        for match in home_matches:
            if match["homeGoals"] > match["awayGoals"]:
                wins += 1
            elif match["homeGoals"] == match["awayGoals"]:
                draws += 1
            else:
                losses += 1
            goals_for += match["homeGoals"]
            goals_against += match["awayGoals"]

        for match in away_matches:
            if match["awayGoals"] > match["homeGoals"]:
                wins += 1
            elif match["awayGoals"] == match["homeGoals"]:
                draws += 1
            else:
                losses += 1
            goals_for += match["awayGoals"]
            goals_against += match["homeGoals"]

        team_name = [team for team in teams if team["teamId"] == team_id][0]["teamName"]
        points = 2 * wins + 1 * draws + 0 * losses
        played = wins + draws + losses
        goal_difference = goals_for - goals_against

        competition_standings.append({
            "teamId": team_id,
            "teamName": team_name,
            "points": points,
            "played": played,
            "wins": wins,
            "draws": draws,
            "losses": losses,
            "goalsFor": goals_for,
            "goalsAgainst": goals_against,
            "goalDifference": goal_difference
        })

    competition_standings = sorted(competition_standings, key=lambda row: row['teamName'], reverse=False)
    competition_standings = sorted(competition_standings, key=lambda row: row['goalsFor'], reverse=True)
    competition_standings = sorted(competition_standings, key=lambda row: row['goalDifference'], reverse=True)
    competition_standings = sorted(competition_standings, key=lambda row: row['points'], reverse=True)

    message = {
        'message': competition_standings
    }

    return jsonify(message)


@app.route("/player_stats/<competitions>")
def get_player_stats(competitions):

    competition_match_ids = [match["matchId"] for match in matches if match["competitionId"] in competitions and match["played"]]
    competition_appearances = [appearance for appearance in appearances if appearance["matchId"] in competition_match_ids]
    competition_player_ids = {appearance["playerId"] for appearance in competition_appearances}

    player_stats = []

    for player_id in competition_player_ids:

        player_appearances = [appearance for appearance in competition_appearances if appearance["playerId"] == player_id]

        player_name = [player for player in players if player["playerId"] == player_id][0]["playerName"]

        player_teams = {appearance["teamId"] for appearance in player_appearances}
        player_clubs = {team["clubId"] for team in teams if team["teamId"] in player_teams}
        club = [club for club in clubs if club["clubId"] in player_clubs]

        played = len(player_appearances)
        goals = sum([appearance["goals"] for appearance in player_appearances])
        goals_per_game = round(goals / played, 2)
        mvps = sum([appearance["mvp"] for appearance in player_appearances])
        yellow_cards = sum([appearance["yellowCard"] for appearance in player_appearances])
        red_cards = sum([appearance["redCard"] for appearance in player_appearances])

        player_stats.append({
            "playerId": player_id,
            "playerName": player_name,
            "club": club,
            "played": played,
            "goals": goals,
            "goalsPerGame": goals_per_game,
            "mvps": mvps,
            "yellowCards": yellow_cards,
            "redCards": red_cards
        })

    player_stats = sorted(player_stats, key=lambda row: row['playerName'], reverse=False)
    player_stats = sorted(player_stats, key=lambda row: row['played'], reverse=True)
    player_stats = sorted(player_stats, key=lambda row: row['goals'], reverse=True)

    message = {
        'message': player_stats
    }

    return jsonify(message)
