import User from "./User.js";
import Note from "./Note.js";

User.hasMany(Note, { foreignKey: "userId" });
Note.belongsTo(User, { foreignKey: "userId" });

User.sync({ logging: false });
Note.sync({ logging: false });

export { User, Note };
