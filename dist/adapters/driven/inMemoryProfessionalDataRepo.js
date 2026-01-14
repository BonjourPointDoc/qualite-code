"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemoryProfessionalDataRepo = void 0;
const store = [];
class InMemoryProfessionalDataRepo {
    async findAll() {
        return store.slice();
    }
    async findById(id) {
        const found = store.find((s) => s.id === id);
        return found ?? null;
    }
    async save(civilStatus) {
        const newCivilStatus = { id: store.length, ...civilStatus };
        store.push(newCivilStatus);
        return newCivilStatus;
    }
    async update(professionalData) {
        const foundIndex = store.findIndex(x => x.id === professionalData.id);
        if (foundIndex > -1) {
            store[foundIndex] = professionalData;
            return professionalData;
        }
        return null;
    }
    async delete(id) {
        const foundIndex = store.findIndex(x => x.id === id);
        if (foundIndex > -1) {
            let deletedProfessionalData = store[foundIndex];
            store.splice(foundIndex, 1);
            return deletedProfessionalData;
        }
        return null;
    }
    async findByCivilStatusId(id) {
        return null;
    }
}
exports.InMemoryProfessionalDataRepo = InMemoryProfessionalDataRepo;
