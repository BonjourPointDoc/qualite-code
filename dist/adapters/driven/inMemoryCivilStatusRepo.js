"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const civilStatus_1 = require("../../domain/civilStatus");
const store = [];
class InMemoryCivilStatusRepo {
    async findAll() {
        return store.slice();
    }
    async findById(id) {
        const found = store.find((s) => s.id === id);
        return found ?? null;
    }
    async save(civilStatus) {
        const newCivilStatus = new civilStatus_1.CivilStatus(civilStatus.last_name, civilStatus.first_name, civilStatus.birthplace, civilStatus.birthday, store.length);
        store.push(newCivilStatus);
        return newCivilStatus;
    }
    async update(newCivilStatus) {
        const foundIndex = store.findIndex(x => x.id == newCivilStatus.id);
        if (foundIndex > -1) {
            store[foundIndex] = newCivilStatus;
            return newCivilStatus;
        }
        return null;
    }
    async delete(id) {
        const foundIndex = store.findIndex(x => x.id == id);
        if (foundIndex > -1) {
            let deletedCivilStatus = store[foundIndex];
            store.splice(foundIndex, 1);
            return deletedCivilStatus;
        }
        return null;
    }
    async findWorthOfCivilStatus(id) {
        const found = store.find((s) => s.id === id);
        if (found !== undefined) {
            let ageDifMs = Date.now() - found.birthday.getTime();
            let ageDate = new Date(ageDifMs);
            const age = Math.abs(ageDate.getUTCFullYear() - 1970);
            return age;
        }
        return null;
    }
}
exports.default = InMemoryCivilStatusRepo;
