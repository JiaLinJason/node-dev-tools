type mongoInstance = {
    db: any,
    close: () => void,
    ObjectId: () => string
}
function mongoCb(db: any): mongoInstance;
function initMongo(dbName: string): Promise<mongoInstance>;
function initMongo(dbName: string, cb: (db: mongoInstance) => void): void;

declare interface MongoService {
    mongoService: (url: string) => typeof initMongo;
}
