import { HydratedDocument, Model, MongooseUpdateQueryOptions, ObjectId, ProjectionType, QueryOptions, RootFilterQuery, UpdateQuery, UpdateWriteOpResult } from "mongoose";

export abstract class AbstractRepository<T> {
    constructor(protected readonly model: Model<T>) {}

    async create (data: Partial<T>): Promise<HydratedDocument<T>> {
        return await this.model.create(data);
    }
    async findOne (filter: RootFilterQuery<T>, select?: ProjectionType<T>, options?: QueryOptions<T>): Promise<HydratedDocument<T> | null> {
        return await this.model.findOne(filter, select, options);
    }
    async exists (filter: RootFilterQuery<T>, select?: ProjectionType<T>, options?: QueryOptions<T>): Promise<HydratedDocument<T> | null> {
        return await this.model.findOne(filter, select, options);
    }
    async findById (id: string, projection: ProjectionType<T>, options: QueryOptions): Promise<HydratedDocument<T> | null> {
        return await this.model.findById(id, projection, options);
    }
    async updateOne (filter: RootFilterQuery<T>, update: UpdateQuery<T>, options?: MongooseUpdateQueryOptions): Promise<UpdateWriteOpResult | null> {
        return await this.model.updateOne(filter, update, options);
    }
    async updateById (id: ObjectId, update: UpdateQuery<T>, options?: QueryOptions): Promise<UpdateWriteOpResult | null> {
        return await this.model.findByIdAndUpdate(id, update, options);
    }
}