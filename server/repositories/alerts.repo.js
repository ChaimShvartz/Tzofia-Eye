import { ObjectId } from "mongodb";

export const createAlertsRepo = (collection) => {
    const formatId = ({ _id, ...rest }) => ({ id: _id.toString(), ...rest });

    const getAlerts = async (filter) => {
        const cursor = collection.find(filter);
        const alerts = await cursor.toArray();
        return alerts.map(formatId);
    };

    const getAlert = async ({ id, ...rest }) => {
        const filter = id ? { _id: new ObjectId(id), ...rest } : { ...rest };
        const alert = await collection.findOne(filter);
        if (!alert) return;
        return formatId(alert);
    };

    const addAlert = async (alert) => {
        const { insertedId } = await collection.insertOne({ ...alert });
        return insertedId.toString();
    };

    const updateAlert = async ({ id, ...rest }, data) => {
        const filter = id ? { _id: new ObjectId(id), ...rest } : { ...rest };
        const alert = await collection.findOneAndUpdate(
            filter,
            { $set: data },
            { returnDocument: "after" },
        );
        if (!alert) return;
        return formatId(alert);
    };

    const deleteAlert = async ({ id, ...rest }) => {
        const filter = id ? { _id: new ObjectId(id), ...rest } : { ...rest };
        const { deletedCount } = await collection.deleteOne(filter);
        return deletedCount > 0;
    };

    return { getAlerts, getAlert, addAlert, updateAlert, deleteAlert };
};
