import { createNotifications } from "../controller/NotificationController.js";
import noteRepository from "../repository/notesRepository.js";

export const getNotesService = async (req) => {
  try {
    const notes = await noteRepository.getAll(
      [
        { path: "authorId", select: "name" },
        { path: "taggedUsers", select: "name" },
      ],
      {
        candidateId: req.params.candidateId,
      }
    );
    return notes;
  } catch (error) {
    console.error("Error fetching Notes:", error);
    throw error;
  }
};

export const postNotesService = async (user, candidateData) => {
  try {
    const note = await noteRepository.create(candidateData);

    await createNotifications({
      taggedUsers: candidateData.taggedUsers,
      content: candidateData.content,
      candidateId: candidateData.candidateId,
      noteId: note._id,
    });

    return note;
  } catch (error) {
    throw error;
  }
};
