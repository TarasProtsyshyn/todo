import mongoose from "mongoose";

mongoose.set("toJSON", {
  virtuals: true,
  transform: (doc, converted) => {
    delete converted._id;
  },
});

mongoose.connection.once("open", () => {
  console.log("MongoDB connection ready");
});

mongoose.connection.on("error", (error) => {
  console.error(error);
});

export const mongoConnect = async () => {
  await mongoose.connect(process.env.MONGO_CONNECT_URL);
};

export const mongoDisconnect = async () => {
  await mongoose.disconnect();
};
