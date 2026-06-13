import mongoose from "mongoose";
import dotenv from "dotenv";
import Settings from "./src/models/Settings";

dotenv.config();

async function run() {
  await mongoose.connect(process.env.MONGODB_URI as string);
  console.log("Connected to DB");

  let settings = await Settings.findOne();
  console.log("Current Settings Typography:", settings?.typography);

  if (settings) {
    settings.set({
      typography: {
        global: { heading: { color: "#ff0000", fontSize: 42 } },
        hero: { heading: { color: "#00ff00", fontSize: 50 } }
      }
    });
    settings.markModified("typography");
    await settings.save();
    console.log("Updated settings");
    
    settings = await Settings.findOne();
    console.log("Saved Settings Typography:", settings?.typography);
  }

  process.exit(0);
}

run().catch(console.error);
