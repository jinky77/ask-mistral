import "dotenv/config";
import { Mistral } from "@mistralai/mistralai";
import * as tty from "tty";

const apiKey = process.env.MISTRAL_API_KEY;
const client = new Mistral({ apiKey });

// ANSI escape code for yellow text
const yellow = "\x1b[33m";
const reset = "\x1b[0m";

// Disable echoing (prevents user input from being displayed wehen Enter is pressed)
if ((process.stdin as any).isTTY) {
  (process.stdin as tty.ReadStream).setRawMode(true);
}

console.log(`\n${yellow}[Le Chat]: Posez votre question !${reset}`);

process.stdin.on("data", async (data) => {
  const prompt = data.toString().trim();

  // Display animated "Réfléchit..."
  let dots = 0;
  const interval = setInterval(() => {
    process.stdout.clearLine(0);
    process.stdout.cursorTo(0);
    process.stdout.write(
      `${yellow}[Le Chat]: Réfléchit${".".repeat(dots)}${reset}`
    );
    dots = (dots + 1) % 4;
  }, 250);

  try {
    const chatResponse = await client.chat.complete({
      model: "mistral-large-latest",
      messages: [{ role: "user", content: prompt }],
    });

    // Clear the "Réfléchit..." message
    clearInterval(interval);
    process.stdout.clearLine(0);
    process.stdout.cursorTo(0);

    console.log(
      //@ts-ignore
      `\n${yellow}[Le Chat]: ${chatResponse.choices[0].message.content}${reset}`
    );
  } catch (error) {
    clearInterval(interval);
    process.stdout.clearLine(0);
    process.stdout.cursorTo(0);
    console.error("Erreur :", error);
  } finally {
    // Keep the interface open for further interactions
    console.log(`\n${yellow}[Le Chat]: Posez votre question !${reset}`);
  }
});
