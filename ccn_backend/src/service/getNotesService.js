import noteRepository from "../repository/notesRepository.js";

export const getNotesService = async (req) => {
  try {
    const notes = await noteRepository.getAll(
      [
        { path: "authorId", select: "name" },
        { path: "taggedUsers", select: "name" },
      ],
      {
        candidateId: req.query.candidateId,
        $or: [{ authorId: userId }, { taggedUsers: req.userId }],
      }
    );
    return notes;
  } catch (error) {
    console.error("Error fetching Notes:", error);
    throw error;
  }
};

export const postNotesService = async (candidateData) => {
  try {
    const newCandidate = await noteRepository.create(candidateData);
    return newCandidate;
  } catch (error) {
    throw error;
  }
};
