/* eslint-disable linebreak-style */
module.exports = {
  name: "answer",
  description: "answer command",
  aliases: ["a"],
  execute(message, args) {    
    if (message.channel.type != "dm"){
      return;
    }    

    const { games } = args;
    const pokerGame = games.first();
    if (!pokerGame) {
      return message.channel.send("There is currently no game in progress. Start a game by using the !start command.");
    }
    
    if (!pokerGame.isQuestionRunning) 
      return message.channel.send("You are currently not answering a question.");

    const storypoints = parseInt(message.content.split(" ")[1]);

    if (!isNaN(storypoints)) {
      message.channel.send([`Assigned ${storypoints} to the question: ${pokerGame.currentQuestion}`].join("\n"));
      pokerGame.addAnswer(message.author.username, storypoints);
    } else {
      message.channel.send("The amount should be a valid number");
    }
  },
};
