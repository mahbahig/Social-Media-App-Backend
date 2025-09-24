import { HydratedDocument, Model, MongooseUpdateQueryOptions, ObjectId, ProjectionType, QueryOptions, RootFilterQuery, UpdateQuery, UpdateWriteOpResult } from "mongoose";

export abstract class DbRepository<T> {
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
    async findById (id: ObjectId): Promise<HydratedDocument<T> | null> {
        return await this.model.findById(id);
    }
    async updateOne (filter: RootFilterQuery<T>, update: Partial<T>, options?: MongooseUpdateQueryOptions): Promise<UpdateWriteOpResult | null> {
        return await this.model.updateOne(filter, update, options);
    }
    async updateById (id: ObjectId, update: UpdateQuery<T>, options?: QueryOptions): Promise<UpdateWriteOpResult | null> {
        return await this.model.findByIdAndUpdate(id, update, options);
    }
}