export default function crudRepository(model) {
  return {
    create: async function (data) {
      let newDoc = await model.create(data);
      return newDoc;
    },
    getAllPaginated: async function (
      limit,
      page,
      populateOptions = [],
      query = {}
    ) {
      const skip = (page - 1) * limit;

      const totalCount = await model.countDocuments(query);
      const totalPages = Math.ceil(totalCount / limit);

      const docs = await model
        .find({ ...query })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate(populateOptions);

      return {
        docs,
        pagination: { totalCount, totalPages, currentPage: page, limit },
      };
    },
    getAll: async function (populateOptions = [], query = {}) {
      const docs = await model
        .find({ ...query })
        .sort({ createdAt: -1 })
        .populate(populateOptions);

      return {
        docs,
      };
    },
    findById: async function (id, populateOptions) {
      let doc = await model.findById(id).populate(populateOptions);

      return doc;
    },
  };
}
