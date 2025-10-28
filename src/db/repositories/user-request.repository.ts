import { IUserRequest } from "../../shared";
import { UserRequest } from "../models";
import { AbstractRepository } from "./abstract.repository";

export class UserRequestRepository extends AbstractRepository<IUserRequest> {
    constructor() {
        super(UserRequest)
    }
}