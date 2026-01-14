"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfessionalData = void 0;
class ProfessionalData {
    constructor(civil_status_id, situation, company, salary, contract, hours_per_day, overtime, paid_overtime, id) {
        this.id = id;
        this.civil_status_id = civil_status_id;
        this.situation = situation;
        this.company = company;
        this.salary = salary;
        this.contract = contract;
        this.hours_per_day = hours_per_day;
        this.overtime = overtime;
        this.paid_overtime = paid_overtime;
    }
}
exports.ProfessionalData = ProfessionalData;
