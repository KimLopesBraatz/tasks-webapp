export default interface ITask {
    id?: any,
    title?: string,
    description?: string,
    status?: string,
    isActive?: boolean,
    createdIn?: Date,
    updatedIn?: Date,
    finishedIn?: Date,
    removedIn?: Date,
}