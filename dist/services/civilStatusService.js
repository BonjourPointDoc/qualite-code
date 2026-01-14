"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CivilStatusService = void 0;
class CivilStatusService {
    constructor(repo) {
        this.repo = repo;
    }
    async listCivilStatus() {
        return this.repo.findAll();
    }
    async getCivilStatus(id) {
        return this.repo.findById(id);
    }
    async createCivilStatus(input) {
        return this.repo.save(input);
    }
    async updateCivilStatus(input) {
        return this.repo.update(input);
    }
    async deleteCivilStatus(id) {
        return this.repo.delete(id);
    }
}
exports.CivilStatusService = CivilStatusService;
