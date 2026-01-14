"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfessionalDataService = void 0;
class ProfessionalDataService {
    constructor(repo) {
        this.repo = repo;
    }
    async listProfessionalData() {
        return this.repo.findAll();
    }
    async getProfessionalData(id) {
        return this.repo.findById(id);
    }
    async createProfessionalData(input) {
        return this.repo.save(input);
    }
    async updateProfessionalData(input) {
        return this.repo.update(input);
    }
    async deleteProfessionalData(id) {
        return this.repo.delete(id);
    }
}
exports.ProfessionalDataService = ProfessionalDataService;
