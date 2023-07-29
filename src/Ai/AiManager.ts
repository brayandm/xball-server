import AiPlayer from "./AiPlayer";

const aiPlayers = [];

for (let i = 0; i < Number(process.env.NUMBER_OF_AI_PLAYERS); i++) {
  aiPlayers.push(new AiPlayer());
}

aiPlayers.forEach((aiPlayer) => {
  aiPlayer.start();
});
