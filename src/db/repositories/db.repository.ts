import { HydratedDocument, Model, ObjectId, ProjectionType, RootFilterQuery } from "mongoose";

export abstract class DbRepository<TDocument> {
    constructor(protected readonly model: Model<TDocument>) {}

    async create (data: Partial<TDocument>): Promise<HydratedDocument<TDocument>> {
        return this.model.create(data);
    }
    async findOne (filter: RootFilterQuery<TDocument>, select?: ProjectionType<TDocument>): Promise<HydratedDocument<TDocument> | null> {
        return this.model.findOne(filter).select(select || {});
    }
    async findById (id: ObjectId): Promise<HydratedDocument<TDocument> | null> {
        return this.model.findById(id);
    }
}