export const getTaskFilter = ({ filter }) => {
  switch (filter) {
    case "completed":
      return { isDone: true };
    case "active":
      return { isDone: false };
    default:
      return {};
  }
};
