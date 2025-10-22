import { HydratedDocument, Model, MongooseUpdateQueryOptions, Types, ProjectionType, QueryOptions, RootFilterQuery, UpdateQuery, UpdateWriteOpResult } from "mongoose";

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
    async updateById (id: Types.ObjectId, update: UpdateQuery<T>, options?: QueryOptions): Promise<UpdateWriteOpResult | null> {
        return await this.model.findByIdAndUpdate(id, update, options);
    }
    async deleteOne (filter: RootFilterQuery<T>) {
        return await this.model.deleteOne(filter);
    }
    async deleteById (id: Types.ObjectId) {
        return await this.model.deleteOne({ _id: id });
    }
}