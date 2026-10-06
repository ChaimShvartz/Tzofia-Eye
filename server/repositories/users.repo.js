import { ObjectId } from "mongodb";

export const createUsersRepo = (collection) => {
    const formatId = ({ _id, ...rest }) => ({ id: _id.toString(), ...rest });

    const getUsers = async (filter) => {
        const cursor = collection.find(filter);
        const users = await cursor.toArray();
        return users.map(formatId);
    };

    const getUser = async ({ id, ...rest }) => {
        const filter = id ? { _id: new ObjectId(id), ...rest } : { ...rest };
        const user = await collection.findOne(filter);
        if (user) return;
        return formatId(user);
    };

    const addUser = async (user) => {
        const { insertedId } = await collection.insertOne({ ...user });
        return insertedId.toString();
    };

    const deleteUser = async ({ id, ...rest }) => {
        const filter = id ? { _id: new ObjectId(id), ...rest } : { ...rest };
        const { deletedCount } = await collection.deleteOne(filter);
        return deletedCount > 0;
    };

    return { getUsers, getUser, addUser, deleteUser };
};
